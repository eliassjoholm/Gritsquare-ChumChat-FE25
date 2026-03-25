import {auth, imagesRef} from "../firebase.js";
import {push, set} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = document.getElementById("image-url").value.trim();

  if (url === "") {
    alert("Vänligen skriv in en URL.");
    return;
  }

  sendPicture(url);
});

async function sendPicture(url) {
    const user = auth.currentUser;
    if (!user) return alert("Login first!");
    const newMsg = push(imagesRef);

    try {
        await set(newMsg, {
            img_url: url,
            image_id: newMsg.key,
            user_id: user.uid,
            timestamp: Date.now(),
        });

        form.reset();
    } catch (error) {
        console.error("Kunde inte skicka bilden:", error);
        alert("Something went wrong.");
    }
}