import {deleteMessage} from "../MessageFunctions/deleteMessage.js";
import {auth} from "../firebase.js";
import { sendReply } from "../MessageFunctions/sendReply.js";
import { censorBadWords } from "../function/censor.js";
import { toggleLike } from "../MessageFunctions/likeMessage.js";
import { toggleFavorite } from "../MessageFunctions/favoriteMessage.js";

export const RenderMessageBox = async (sender, message, messageKey, nestAmount = 0, isLiked, isFav) => {
    const user = auth.currentUser;

    const ChatContainer = document.querySelector(".chat-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box";
    ChatBox.classList.add(nestAmount);

    console.log(nestAmount)

    if (window.innerWidth > 768) {
    ChatBox.style.marginLeft = `${nestAmount * 20}px`;
    } else {

    ChatBox.style.marginLeft = `5px`;
}

    const ChatBoxSender = document.createElement("h2");
    ChatBoxSender.textContent = sender.username;
    ChatBoxSender.className = "chat-box-username";

    const ChatboxImg = document.createElement("img");
    ChatboxImg.className = "profile-picture";
    ChatboxImg.src = sender.img;

    const UserInfo = document.createElement("section");
    UserInfo.className = "chat-user-info";

    UserInfo.append(ChatBoxSender, ChatboxImg);

    ChatBox.append(UserInfo);

    // console.log(message.user_id);

    if (user) {
        if (user.uid === message.user_id) {
            console.log("WE HAVE A MATCH!!");
            const ChatButtonDelete = document.createElement("button");
            ChatButtonDelete.innerText = "X";
            ChatButtonDelete.classList = "close-button";

            ChatButtonDelete.addEventListener("click", () => {
                // console.log(`${message.message_id} getting clicked` )
                deleteMessage(messageKey);
            });
            ChatBox.appendChild(ChatButtonDelete);
        }
    }

    const ChatBoxMessage = document.createElement("p");
    // console.log(message)
    ChatBoxMessage.textContent = censorBadWords(message.message);
    ChatBoxMessage.className = "comments-chat";

    const TimeStamp = document.createElement("p");
    TimeStamp.classList = "timestamp";
    console.log(message.timestamp);
    TimeStamp.textContent = new Date(message.timestamp).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        },
    );

ChatBox.append(ChatBoxMessage, TimeStamp);

// Like & favorite features
const actionBar = document.createElement('div');
actionBar.className = 'action-bar';

const likeBtn = document.createElement('button');
likeBtn.className = `like-btn ${isLiked ? "active" : ""}`;
likeBtn.innerHTML = `<svg class="icon heart" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <span class="like-count">${message.likes || 0}</span>`;

const favBtn = document.createElement('button');
favBtn.className = `fav-btn ${isFav ? "active" : ""}`;
favBtn.innerHTML = `<svg class="icon star" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
`;

likeBtn.addEventListener("click", () => {
    if (!user) {
        alert("Du behöver logga in för att gilla inlägg!");
        return;
    }
    toggleLike(messageKey, isLiked);
});

favBtn.addEventListener("click", () => {
    if (!user) {
        alert("Du behöver logga in för att spara favoriter!");
        return;
    }
    toggleFavorite(messageKey, isFav);
});

actionBar.append(likeBtn, favBtn);
ChatBox.append(actionBar);


if (nestAmount >= 5) {
    const limitText = document.createElement("p");
    limitText.textContent = "Max reply depth reached";
    limitText.style.opacity = "0.6";
    limitText.style.fontSize = "12px";

    ChatBox.append(limitText);

} else {
    const replyForm = document.createElement("form");
    replyForm.className = "reply-form";

    const ChatReply = document.createElement("p");
    ChatReply.innerHTML = "Reply";

    const comments = document.createElement("input");
    comments.placeholder = "Reply...";
    comments.classList = "actions";
    comments.name = "replyText";

    const submitReply = document.createElement("button");
    submitReply.type = "submit";
    submitReply.textContent = "Submit Reply";

    replyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(replyForm);
        const replyText = formData.get("replyText");

        sendReply(messageKey, replyText);
    });

    replyForm.append(ChatReply, comments, submitReply);
    ChatBox.append(replyForm);
}


ChatContainer.appendChild(ChatBox);
}
