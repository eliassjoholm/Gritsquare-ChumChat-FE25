export const RenderMessageBox = (sender, message) => {
    const ChatContainer = document.querySelector(".chat-container");

    const ChatBox = document.createElement("div");
    ChatBox.className = "chat-box"

    const ChatBoxSender = document.createElement("h1");
    ChatBoxSender.textContent = sender;

    const ChatBoxMessage = document.createElement("p");
    ChatBoxMessage.textContent = message;

    const TimeStamp = document.createElement("p");
    TimeStamp.textContent = new Date();

    ChatBox.append(ChatBoxSender, ChatBoxMessage, TimeStamp);
    ChatContainer.appendChild(ChatBox);
}