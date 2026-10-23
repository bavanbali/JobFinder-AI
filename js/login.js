import {
    auth
} from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (!email || !password) {

        alert("Please enter email and password.");

        return;
    }


    const button =
        document.getElementById("loginButton");


    button.disabled = true;

    button.textContent = "Logging in...";


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert("Login successful!");

        window.location.href = "dashboard.html";


    } catch (error) {

        console.error(error);


        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {

            alert(
                "Invalid email or password."
            );

        }

        else if (
            error.code === "auth/invalid-email"
        ) {

            alert(
                "Please enter a valid email address."
            );

        }

        else {

            alert(error.message);

        }

    } finally {

        button.disabled = false;

        button.textContent = "Login";

    }

});