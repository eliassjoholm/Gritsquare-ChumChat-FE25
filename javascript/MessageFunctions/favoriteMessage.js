import { ref, set, remove, getDatabase } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { auth } from "../firebase.js";

const db = getDatabase();

export const toggleFavorite = async (messageKey, isFavorited) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const favRef = ref(db, `users/${user.uid}/favorites/${messageKey}`);

        if (isFavorited) {
            await remove(favRef);
        } else {
            await set(favRef, true);
        }
    } catch (error) {
        console.error("Det gick inte att favorita", error);
    }
};