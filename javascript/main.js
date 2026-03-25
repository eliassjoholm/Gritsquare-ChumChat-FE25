import { auth, reference, db, messagesRef, repliesRef } from "./firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { RenderNav } from "./RenderFunctions/RenderNav.js";
import { RenderMessages } from "./RenderFunctions/RenderMessages.js"
import { renderWeatherData } from "./function/RenderWeatherData.js";
import { RenderImages } from "./RenderFunctions/renderimages.js";

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

    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) chatContainer.innerHTML = "";

    const imageContainer = document.querySelector(".image-container");
    if (imageContainer) imageContainer.innerHTML = "";

    const messages = data.messages;
    const users = data.users;
    const replies = data.replies;
    const images = data.images;
    const currentUser = user ? users[user.uid] : null;

    if (chatContainer) RenderMessages(users, messages, replies, currentUser);
    if (imageContainer) RenderImages(users, images, currentUser);
})
