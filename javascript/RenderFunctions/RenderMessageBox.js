import {deleteMessage} from "../MessageFunctions/deleteMessage.js";
import {auth} from "../firebase.js";

export const RenderMessageBox = async (sender, message, messageKey) => {
    const user = auth.currentUser;

    const ChatContainer = document.querySelector(".chat-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box";

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

    console.log(user.uid);
    console.log(message.user_id);

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
    ChatBoxMessage.textContent = message.message;
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

    const ChatReply = document.createElement("p");
    ChatReply.innerHTML = "Reply";

    const comments = document.createElement("input");
    comments.placeholder = "Reply...";
    comments.classList = "actions";

    ChatBox.append(ChatBoxMessage, TimeStamp, ChatReply, comments);
    ChatContainer.appendChild(ChatBox);
};
