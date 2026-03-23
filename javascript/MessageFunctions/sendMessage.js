import { reference, db, messagesRef, repliesRef } from "./firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export const sendMessage = (text) => {
    if (!currentUser) return alert("Log in first!");
    const newMsg = push(messagesRef);

    const messageData = {
        message: text,
        message_id: newMsg.key,
        user_id: currentUser.user_id,
        timestamp: Date.now()
    }

    set(newMsg, messageData);
}