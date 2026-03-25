import { auth, reference, db, messagesRef, repliesRef } from "./firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { RenderNav } from "./RenderFunctions/RenderNav.js";
import { RenderMessages } from "./RenderFunctions/RenderMessages.js"
import { renderWeatherData } from "./function/RenderWeatherData.js";

RenderNav();

renderWeatherData();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in user:", user.uid, user.email);
    } else {
        console.log("No user logged in");
    }
});

onValue(reference, snapshot => {
    const data = snapshot.val();
    const user = auth.currentUser

    document.querySelector(".chat-container").innerHTML = "";

    const messages = data.messages;
    const users = data.users;
    const replies = data.replies;
    const currentUser = user ? users[user.uid] : null;

    RenderMessages(users, messages, replies, currentUser);
})
