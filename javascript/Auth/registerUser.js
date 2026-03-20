import { usersRef, db } from "../firebase.js";
import { push, set, get, update } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { setCurrentUser } from "./auth.js";

const formBody = document.querySelector(".form-body")

formBody.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formBody)

    const username = formData.get("username");
    const password = formData.get("password");
    const pfpurl = formData.get("pfp-url");

    console.log(formData.get("username"))

    console.log("Hello")
    registerUser(username, password, pfpurl)
})

const registerUser = (username, password, pfpUrl) => {
    const newUser = push(usersRef);

    const userData = {
        user_id: newUser.key,
        username: username,
        password: password,
        role: "visitor",
        isLoggedIn: true,
        img: pfpUrl,
    }

    set(newUser, userData);
    setCurrentUser(newUser)
}