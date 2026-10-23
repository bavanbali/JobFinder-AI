// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7nupE6fd_tAHi13sV4KtXcolUHNVi5eo",
    authDomain: "jobfinder-ai-2b508.firebaseapp.com",
    projectId: "jobfinder-ai-2b508",
    storageBucket: "jobfinder-ai-2b508.firebasestorage.app",
    messagingSenderId: "323513066242",
    appId: "1:323513066242:web:56def82ce56341e6fdd81b",
    measurementId: "G-SQBDGX2XWP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
    app,
    auth,
    onAuthStateChanged,
    signOut
};