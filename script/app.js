// Firebase modullarını import edirik
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import { getAuth, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";

// Firebase konfiqurasiyasını buraya əlavə edin (öz məlumatlarınızı daxil edin)
const firebaseConfig = {
    apiKey: "AIzaSyDiV_XVPGlaDLFJFLSgiN2-4W5VSbZmsmo",
    authDomain: "byteland-thefeerid.firebaseapp.com",
    databaseURL: "https://byteland-thefeerid-default-rtdb.firebaseio.com/",
    projectId: "byteland-thefeerid",
    storageBucket: "byteland-thefeerid.appspot.com",
    messagingSenderId: "493568186753",
    appId: "1:493568186753:web:0ad7203cda456e3d357080",
    measurementId: "G-F7RGT5XVQ8"
};

// Firebase tətbiqini başlatmaq
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // auth obyektini əldə et

// Formun işləməsi
const startForm = document.getElementById("startForm");
startForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value;

    if (!email) {
        alert("Emailinizi daxil edin!");
        return;
    }

    try {
        // Emaili login etməyə cəhd edirik
        await auth.signInWithEmailAndPassword(email, "dummyPassword");

        // Hesab varsa login səhifəsinə yönləndir
        localStorage.setItem("userEmail", email);
        window.location.href = "pages/login.html";
    } catch (error) {
        // Əgər hesab tapılmırsa, signup səhifəsinə yönləndiririk
        if (error.code === 'auth/user-not-found') {
            localStorage.setItem("userEmail", email);
            window.location.href = "pages/signup.html";
        } else {
            console.error("Xəta:", error.message);
            alert("Bir xəta baş verdi!");
        }
    }
});