import { ref, runTransaction, set, remove, getDatabase } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { auth } from "../firebase.js";

const db = getDatabase();

export const toggleLike = async (messageKey, isLiked) => {
    const user = auth.currentUser;
    if (!user) {
        alert("Du behöver logga in först!")
        return;
    }

    const likeRef = ref(db, `messages/${messageKey}/likes`);
    const userLikeRef = ref(db, `users/${user.uid}/likedPosts/${messageKey}`);

    await runTransaction(likeRef, (currentLikes) => {
        if (isLiked) {
                return Math.max(0, (currentLikes || 0) - 1);
            } else {
                return (currentLikes || 0) + 1;
            }
        });
    
try {
    if (isLiked) {
        await remove(userLikeRef);
    } else {
        await set(userLikeRef, true);
    }
    } catch (error) {
        console.error("Det gick inte att likea", error);
    }
}
    