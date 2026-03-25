import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js';
import { getDatabase, ref } from 'https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDXN7CEJvKcFJvicAZVe1H4kFbzzWQFOes",
  authDomain: "chumchat-e9797.firebaseapp.com",
  databaseURL: "https://chumchat-e9797-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chumchat-e9797",
  storageBucket: "chumchat-e9797.firebasestorage.app",
  messagingSenderId: "114856196425",
  appId: "1:114856196425:web:7690143c6e3f3b167cc298",
  measurementId: "G-8BQ6HWEXVC"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app)

export const reference = ref(db, "/")
export const usersRef = ref(db, "/users");
export const messagesRef = ref(db, "/messages");
export const repliesRef = ref(db, "/replies");
export const imagesRef = ref(db, "/images");