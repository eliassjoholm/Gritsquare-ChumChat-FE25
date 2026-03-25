import { auth, reference, db, messagesRef, repliesRef } from "../firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { censorBadWords } from "../function/censor.js";

export const sendReply = async (messageKey, text = "") => {
    const user = auth.currentUser;
    if (!user) return alert("Logga in först!");

    if (!text || !text.trim()) {
         return alert("Write an answer first");
    }

    let safeMessage = text;
    try {
        safeMessage = censorBadWords(text);
    } catch (error) {
        console.error("Censur-fel vid svar:, skickar obehandlat svar:", error);
        safeMessage = text;
    }

    const newReply = push(repliesRef);
    const replyData = {
        message: safeMessage,
        message_id: newReply.key,
        parent_id: messageKey,
        user_id: user.uid,
        timestamp: Date.now(),
    };

    console.log(replyData);

    try {
        await set(newReply, replyData);
    } catch (error) {
        console.error("Kunde inte skicka svaret:", error);
        alert("Fel vid skickning av svaret. Försök igen.");
    }
};
