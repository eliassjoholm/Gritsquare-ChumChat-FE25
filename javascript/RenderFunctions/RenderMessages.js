import {RenderMessageBox} from "./RenderMessageBox.js";
import {auth} from "../firebase.js";

export const RenderMessages = async (usersObject, messagesObject) => {
    const reverseObject = (obj) => {
        const reversed = {};
        Object.keys(obj)
            .sort()
            .reverse()
            .forEach((key) => {
                reversed[key] = obj[key];
            });
        return reversed;
    };

    const reversedMessages = reverseObject(messagesObject);

    for (const messageKey in reversedMessages) {
        if (!Object.hasOwn(reversedMessages, messageKey)) continue;

        const messageElement = reversedMessages[messageKey];
        for (const userKey in usersObject) {
            const userElement = usersObject[userKey];
            console.log(userElement);

            if (userElement.user_id === messageElement.user_id) {
                console.log(
                    `${userKey} wrote the message with ID ${messageKey}`,
                );
                console.log(messageElement);
                RenderMessageBox(userElement, messageElement, messageKey);
                console.log(messageKey);
            }
        }
    }
};
