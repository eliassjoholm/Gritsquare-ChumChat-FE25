import { deleteMessage } from "../MessageFunctions/deleteMessage.js";
import { currentUser } from "../Auth/auth.js";

export const RenderMessageBox = (sender, message, messageKey) => {
    const ChatContainer = document.querySelector(".chat-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box"

    const ChatBoxSender = document.createElement("h2");
    ChatBoxSender.textContent = sender.username;
    ChatBoxSender.className = 'chat-box-username'

    const ChatboxImg = document.createElement('img')
    ChatboxImg.className = 'chat-box-pfp'
    ChatboxImg.src = sender.img;

    ChatBox.append(ChatBoxSender, ChatboxImg)

    if(currentUser){
        if(currentUser.id === message.user_id){
            const ChatButtonDelete = document.createElement('button')
            ChatButtonDelete.innerText = 'X'
            ChatButtonDelete.classList = 'close-button'

            ChatButtonDelete.addEventListener("click", () => {
                console.log(`${message.message_id} getting clicked` )
                deleteMessage(messageKey)
            })
            ChatBox.appendChild(ChatButtonDelete)
        }
    }



    const ChatBoxMessage = document.createElement("p");
    console.log(message)
    ChatBoxMessage.textContent = message.message;
    ChatBoxMessage.className = 'comments-chat'

    const TimeStamp = document.createElement("p");
    TimeStamp.classList = 'timestamp'
    TimeStamp.textContent = new Date();

    const ChatReply = document.createElement('p')
    ChatReply.innerHTML = 'Reply'


    const comments = document.createElement('input')
    comments.placeholder = 'Reply...'
    comments.classList = 'actions'

    ChatBox.append(ChatBoxMessage, TimeStamp, ChatReply, comments);
    ChatContainer.appendChild(ChatBox);
}