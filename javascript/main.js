import { reference, db, messagesRef, repliesRef } from "./firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { RenderMessageBox } from "./RenderFunctions/RenderMessageBox.js";
import { RenderMessages } from "./RenderFunctions/RenderMessages.js"

const hello = onValue(reference, snapshot => {
    const data = snapshot.val();

    document.querySelector(".chat-container").innerHTML = "";  

    const messages = data.messages;
    const users = data.users;

    RenderMessages(users, messages)
    console.log(messages)
})

onValue(messagesRef, snapshot => {
    hello();
})

// onValue(messagesRef, snapshot => {
//     const messages = snapshot.val();
//     console.log(messages);

//     document.querySelector(".chat-container").innerHTML = "";  
//     for (let id in messages) {
//         const msg = messages[id];
//         RenderMessageBox(currentUser, msg);  
//     }

// }, error => {
//     console.error("Firebase read failed:", error);
//     alert("Couldn't get messages from database.")
// });

