import { reference, db } from "./firebase.js"
import { RenderMessages } from "./RenderMessages.js"
import { push, onValue, remove, ref } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { RenderMessageBox } from "./RenderMessageBox.js";

onValue(reference, snapshot => {
    const data = snapshot.val();

    const usersObject = data.users;
    const messagesObject = data.messages;

    RenderMessages(usersObject, messagesObject)


    // console.log(data);
}, error => {
    console.error("Firebase read failed:", error);
    alert("Kunde inte hämta data från databasen.")
});


RenderMessageBox("Eddie", "I hate my life");
