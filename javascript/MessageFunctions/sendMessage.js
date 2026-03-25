import { auth, reference, db, messagesRef, repliesRef } from "../firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { censorBadWords } from "../function/censor.js";


const messageForm = document.querySelector(".send-message");

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(messageForm);
    const message = formData.get("message");

    sendMessage(message)
})

const sendMessage = async (text = "") => {
    const user = auth.currentUser;
    if (!user) return alert("Login first!");

    if (typeof text !== "string") return;

  
    const cleanText = text.trim();

    if (!cleanText) {
        return alert("Write a message first");
    }

   
    if (cleanText.length > 100) {
        return alert("Message is too long.");
    }

   
    let safeMessage;
    try {
        safeMessage = censorBadWords(cleanText);
    } catch (error) {
        console.error("Censur-fel:", error);
        safeMessage = cleanText;
    }

  
    const newMsg = push(messagesRef);

    try {
        await set(newMsg, {
            message: safeMessage,
            message_id: newMsg.key,
            user_id: user.uid,
            timestamp: Date.now(),
        });

        messageForm.reset();

    } catch (error) {
        console.error("Kunde inte skicka:", error);
        alert("Something went wrong.");
    }
};