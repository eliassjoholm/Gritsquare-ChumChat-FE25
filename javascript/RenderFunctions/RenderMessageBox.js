import {deleteMessage} from "../MessageFunctions/deleteMessage.js";
import {auth} from "../firebase.js";
import { sendReply } from "../MessageFunctions/sendReply.js";
import { censorBadWords } from "../function/censor.js";

export const RenderMessageBox = async (sender, message, messageKey, nestAmount = 0) => {
    const user = auth.currentUser;

    const ChatContainer = document.querySelector(".chat-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box";
    ChatBox.classList.add(nestAmount);

    console.log(nestAmount)

    ChatBox.style.marginLeft = `${nestAmount * 50}px`;


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

    const replyForm = document.createElement("form");
    replyForm.className = "reply-form"
    const ChatReply = document.createElement("p");
    ChatReply.innerHTML = "Reply";

    const comments = document.createElement("input");
    comments.placeholder = "Reply...";
    comments.classList = "actions";
    comments.name = "replyText"

    const submitReply = document.createElement("button")
    submitReply.type = "submit"
    submitReply.textContent = "Submit Reply"

    replyForm.addEventListener("submit", (e) => {
        e.preventDefault();
            const formData = new FormData(replyForm);

            const replyText = formData.get("replyText");

        // console.log(message)
        sendReply(messageKey, replyText);
    })

    replyForm.append(ChatReply, comments, submitReply)

    ChatBox.append(ChatBoxMessage, TimeStamp, replyForm);
    ChatContainer.appendChild(ChatBox);
};
