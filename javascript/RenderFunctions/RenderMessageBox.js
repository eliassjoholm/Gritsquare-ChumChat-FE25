import {deleteMessage} from "../MessageFunctions/deleteMessage.js";
import {auth} from "../firebase.js";
import { sendReply } from "../MessageFunctions/sendReply.js";
import { censorBadWords } from "../function/censor.js";
import { toggleLike } from "../MessageFunctions/likeMessage.js";
import { toggleFavorite } from "../MessageFunctions/favoriteMessage.js";

export const RenderMessageBox = async (sender, message, messageKey, nestAmount = 0, isLiked, isFav, type) => {
    const user = auth.currentUser;

    const ChatContainer = document.querySelector(".chat-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box";
    ChatBox.classList.add(nestAmount);

    console.log(nestAmount)

    if (window.innerWidth > 768) {
    ChatBox.style.marginLeft = `${nestAmount * 20}px`;
    } else {

    ChatBox.style.marginLeft = `0px`;
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
likeBtn.innerHTML = `<svg class="icon thumb" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
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
    toggleLike(messageKey, isLiked, type);
});

favBtn.addEventListener("click", () => {
    if (!user) {
        alert("Du behöver logga in för att spara favoriter!");
        return;
    }
    toggleFavorite(messageKey, isFav, type);
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

    // const ChatReply = document.createElement("p");
    // ChatReply.innerHTML = "Reply";

    const comments = document.createElement("input");
    comments.placeholder = "Reply...";
    comments.classList = "message-area";
    comments.name = "replyText";

    const submitReply = document.createElement("button");
    submitReply.type = "submit";
    submitReply.classList = 'reply-button'
    submitReply.textContent = "Submit Reply";

    replyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(replyForm);
        const replyText = formData.get("replyText");

        sendReply(messageKey, replyText);
    });

    replyForm.append(comments, submitReply);
    ChatBox.append(replyForm);
}


ChatContainer.appendChild(ChatBox);
}
