import { usersRef } from "../firebase.js";
import { push, set } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { setCurrentUser } from "./auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { auth } from "../firebase.js";
import { renderWeatherData } from "../function/RenderWeatherData.js";

const formBody = document.querySelector(".form-body");

formBody.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formBody);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const pfpurl = formData.get("pfp-url");

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;


        await registerUser(userId, username, pfpurl);


        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error creating user:", error);
        alert(error.message);
    }
});

const registerUser = async (userId, username, pfpUrl) => {
    const newUser = push(usersRef);

    const userData = {
        user_id: userId,
        username: username,
        role: "visitor",
        img: pfpUrl,
    };

    await set(newUser, userData);
    setCurrentUser(newUser);
};

renderWeatherData();