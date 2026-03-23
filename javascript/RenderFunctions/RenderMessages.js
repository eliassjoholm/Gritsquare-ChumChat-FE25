import { RenderMessageBox } from "./RenderMessageBox.js";
import { auth } from "../firebase.js";

export const RenderMessages = async(usersObject, messagesObject) => {
    for (const userKey in usersObject) {
        const userElement = usersObject[userKey];
        console.log(userElement)
        
        for (const messageKey in messagesObject) {
            if (!Object.hasOwn(messagesObject, messageKey)) continue;
            
            const messageElement = messagesObject[messageKey];

            if(userElement.user_id === messageElement.user_id){
                console.log(`${userKey} wrote the message with ID ${messageKey}`)
                console.log(messageElement)
                RenderMessageBox(userElement, messageElement, messageKey)
                console.log(messageKey)
            }
        }
    }
}