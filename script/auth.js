import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signup = async (email, username, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Hesab yaradıldı:", user);
        window.location.href = "../pages/dashboard.html";
    } catch (error) {
        console.error("Qeydiyyat zamanı xəta:", error);
        showError("Hesab yaratmaqda xətalar baş verdi!");
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Giriş uğurludur:", user);
        window.location.href = "../pages/dashboard.html";
    } catch (error) {
        console.error("Giriş zamanı xəta:", error);
        showError("Giriş zamanı xəta baş verdi!");
    }
};

export const checkUser = (email) => {
    const user = auth.currentUser;
    if (user) {
        window.location.href = "pages/login.html";
    } else {
        window.location.href = "pages/signup.html";
    }
};