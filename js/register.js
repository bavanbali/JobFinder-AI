import {
    auth
} from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const button = document.getElementById("registerButton");

    button.disabled = true;
    button.textContent = "Creating Account...";

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await updateProfile(user, {
            displayName: fullName
        });

        alert("Account created successfully!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        if (error.code === "auth/email-already-in-use") {
            alert("This email is already registered. Please login.");
        }

        else if (error.code === "auth/invalid-email") {
            alert("Please enter a valid email address.");
        }

        else if (error.code === "auth/weak-password") {
            alert("Password is too weak. Use at least 6 characters.");
        }

        else {
            alert(error.message);
        }

    } finally {

        button.disabled = false;
        button.textContent = "Create Account";

    }

});