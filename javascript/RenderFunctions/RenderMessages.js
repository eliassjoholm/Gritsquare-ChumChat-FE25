import {RenderMessageBox} from "./RenderMessageBox.js";
import {auth} from "../firebase.js";

export const RenderMessages = async (usersObject, messagesObject, replyObject) => {

    const checkForReply = (messageId, nestAmount) => {
        console.log("checking for reply")
        for (const replyKey in replyObject) {
            if (!Object.hasOwn(replyObject, replyKey)) continue;

            const reply = replyObject[replyKey]
            // console.log(reply.parent_id)
            // console.log(messageId)
            if (reply.parent_id === messageId) {
                console.log("WE HAVE A HIT")

                const replySender = Object.values(usersObject).find(
                    (u) => u.user_id === reply.user_id,
                );

                const nextNest = nestAmount + 1;

                if (replySender) {
                    RenderMessageBox(replySender, reply, reply.message_id, nextNest);
                } else {
                    RenderMessageBox({ username: "Unknown", img: "" }, reply, reply.message_id, nextNest);
                }

                checkForReply(reply.message_id, nestAmount + 1);
            }
            // console.log(messageId)
        }
    }

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

        const messageSender = Object.values(usersObject).find(
            (u) => u.user_id === messageElement.user_id,
        );

        if (messageSender) {
            console.log(`Render-message: ${messageKey} från ${messageSender.username}`);
            RenderMessageBox(messageSender, messageElement, messageKey, 0);
        } else {
            RenderMessageBox({ username: "Unknown", img: "" }, messageElement, messageKey, nestAmount);
        }

        checkForReply(messageElement.message_id, 0);
    }
};
