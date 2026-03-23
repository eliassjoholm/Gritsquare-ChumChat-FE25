import { auth } from "../firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const link = document.createElement("a");
const userArea = document.querySelector("#user-area")

const logoutBtn = document.createElement("button");
logoutBtn.textContent = "Logga ut";
logoutBtn.className = "logout-btn";

logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("Utloggad!");
        })
        .catch((error) => {
            console.error("Fel vid utloggning:", error);
        });
});

export const RenderNav = () => {
    onAuthStateChanged(auth, (user) => {
        userArea.innerHTML = "";

        if (user) {
            link.textContent = `${user.email}`;
            link.href = "#";

            userArea.appendChild(link);
            userArea.appendChild(logoutBtn); 
        } else {
            link.href = "/Gritsquare-ChumChat-FE25/html/login.html";
            link.textContent = "Register/Logga in";
            link.className = "register-link";

            userArea.appendChild(link);
        }
    });
};
