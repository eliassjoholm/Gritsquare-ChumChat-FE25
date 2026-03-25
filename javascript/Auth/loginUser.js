import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { renderWeatherData } from "../function/RenderWeatherData.js";

const formBody = document.querySelector(".form-body");

formBody.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formBody);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        console.log("Inloggad:", userCredential.user);

        window.location.href = "/index.html";

    } catch (error) {
        console.error("Fel vid inloggning:", error.message);
    }
});

renderWeatherData();