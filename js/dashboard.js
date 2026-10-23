import {
    auth,
    onAuthStateChanged,
    signOut
} from "./firebase-config.js";


const userName =
    document.getElementById("userName");

const userInitial =
    document.getElementById("userInitial");

const logoutButton =
    document.getElementById("logoutButton");


onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;
    }


    const name =
        user.displayName ||
        user.email.split("@")[0];


    userName.textContent = name;


    userInitial.textContent =
        name.charAt(0).toUpperCase();

});



logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await signOut(auth);

            window.location.href = "login.html";

        }

        catch (error) {

            console.error(error);

            alert(
                "Logout failed. Please try again."
            );

        }

    }
);