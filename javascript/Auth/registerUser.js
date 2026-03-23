import { usersRef } from "../firebase.js";
import { push, set } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { setCurrentUser } from "./auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { auth } from "../firebase.js";


const formBody = document.querySelector(".form-body");

formBody.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = new FormData(formBody);

    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const pfpurl = formData.get("pfp-url");

    console.log(email);

    const userId = await createUserWithEmailAndPassword(auth, email, password)

    registerUser(await userId.user.uid, username, pfpurl)
});

const registerUser = (userId, username, pfpUrl) => {
    const newUser = push(usersRef);

    const userData = {
        user_id: userId,
        username: username,
        role: "visitor",
        img: pfpUrl,
    }

    set(newUser, userData);
    setCurrentUser(newUser)
}