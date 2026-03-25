import { auth } from "../firebase.js";
import { toggleLike } from "../MessageFunctions/likeMessage.js";
import { toggleFavorite } from "../MessageFunctions/favoriteMessage.js";

// Renderar en enskild bild
export const RenderImageBox = (uploader, imageData, imageKey, isLiked, isFav) => {
    const user = auth.currentUser;

    const container = document.querySelector(".image-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box";

    const ChatBoxSender = document.createElement("h2");
    ChatBoxSender.textContent = uploader ? uploader.username : "Unknown";
    ChatBoxSender.className = "chat-box-username";

    const ChatboxImg = document.createElement("img");
    ChatboxImg.className = "profile-picture";
    ChatboxImg.src = uploader ? uploader.img : "";

    const UserInfo = document.createElement("section");
    UserInfo.className = "chat-user-info";

    UserInfo.append(ChatBoxSender, ChatboxImg);

    ChatBox.append(UserInfo);

    // Bild istället för textmeddelande
    const img = document.createElement("img");
    img.src = imageData.img_url;
    img.alt = `Bild från ${uploader ? uploader.username : "Unknown"}`;
    img.className = "rendered-image";

    img.onerror = () => {
        console.warn("Kunde inte ladda bilden:", imageData.img_url);
        img.remove();
    };

    const TimeStamp = document.createElement("p");
    TimeStamp.classList = "timestamp";
    TimeStamp.textContent = new Date(imageData.timestamp).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        },
    );

    ChatBox.append(img, TimeStamp);

    // Like & Favorite knappar
    const actionBar = document.createElement("div");
    actionBar.className = "action-bar";

    const likeBtn = document.createElement("button");
    likeBtn.className = `like-btn ${isLiked ? "active" : ""}`;
    likeBtn.innerHTML = `<svg class="icon thumb" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
        <span class="like-count">${imageData.likes || 0}</span>`;

    const favBtn = document.createElement("button");
    favBtn.className = `fav-btn ${isFav ? "active" : ""}`;
    favBtn.innerHTML = `<svg class="icon star" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
`;

    likeBtn.addEventListener("click", () => {
        if (!user) return alert("Du behöver logga in för att gilla bilder!");
        toggleLike(imageKey, isLiked, "images");
    });

    favBtn.addEventListener("click", () => {
        if (!user) return alert("Du behöver logga in för att spara favoriter!");
        toggleFavorite(imageKey, isFav, "images");
    });

    actionBar.append(likeBtn, favBtn);
    ChatBox.append(actionBar);

    container.appendChild(ChatBox);
};

// Renderar alla bilder
export const RenderImages = (usersObject, imagesObject, currentUser) => {
    const container = document.querySelector(".image-container");
    container.innerHTML = ""; // rensa gamla bilder

    // Vänd objektet så senaste bilder visas först
    const reversedImages = Object.keys(imagesObject)
        .sort()
        .reverse()
        .reduce((acc, key) => {
            acc[key] = imagesObject[key];
            return acc;
        }, {});

    for (const imageKey in reversedImages) {
        if (!Object.hasOwn(reversedImages, imageKey)) continue;

        const imageData = reversedImages[imageKey];
        const uploader = Object.values(usersObject).find(
            (u) => u.user_id === imageData.user_id
        );

        const isLiked = currentUser?.likedPosts?.[imageKey] || false;
        const isFav = currentUser?.favorites?.[imageKey] || false;

        RenderImageBox(uploader || { username: "Unknown", img: "" }, imageData, imageKey, isLiked, isFav);
    }
};