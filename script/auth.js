import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

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
const database = getDatabase(app);

// Emaili yoxlayan funksiyanı yenilə
export const checkUser = async (email) => {
    try {
        const formattedEmail = email.replaceAll(".", ","); // Nöqtələri vergüllə əvəz et
        const emailRef = ref(database, `userInfo/${formattedEmail}`);
        const snapshot = await get(emailRef);

        if (snapshot.exists()) {
            console.log("Email mövcuddur:", snapshot.val());
            window.location.href = "pages/login.html"; // Email varsa login səhifəsinə yönləndir
        } else {
            console.log("Email mövcud deyil, signup-a yönləndirilir.");
            window.location.href = "pages/signup.html"; // Email yoxdursa signup səhifəsinə yönləndir
        }
    } catch (error) {
        console.error("Realtime Database xəta:", error);
        alert("Məlumat yoxlanılarkən xəta baş verdi!");
    }
};

// Yeni istifadəçinin qeydiyyatı
export const signup = async (email, username, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // İstifadəçinin məlumatlarını Realtime Database-də saxla
        const formattedEmail = email.replaceAll(".", ",");
        const userRef = ref(database, `userInfo/${formattedEmail}`);
        await set(userRef, { username, email });

        console.log("Hesab yaradıldı:", user);
        window.location.href = "../pages/dashboard.html";
    } catch (error) {
        console.error("Qeydiyyat zamanı xəta:", error);
        alert("Hesab yaratmaqda xətalar baş verdi!");
    }
};

// Login funksiyasını yenilə
export const login = async (email, password) => {
    try {
        const auth = getAuth();
        const database = getDatabase();
        const formattedEmail = email.replaceAll(".", ","); // Nöqtələri vergüllə əvəz et

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Giriş uğurludur:", user);

        // Realtime Database-də istifadəçi adını al
        const userRef = ref(database, `userInfo/${formattedEmail}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const username = userData.username;

            // İstifadəçi adını localStorage-ə yaz
            localStorage.setItem("username", username);
            console.log("İstifadəçi adı localStorage-ə yazıldı:", username);
        } else {
            console.warn("İstifadəçi məlumatları tapılmadı!");
        }

        // Dashboard-a yönləndir
        window.location.href = "../pages/dashboard.html";
    } catch (error) {
        console.error("Giriş zamanı xəta:", error);
        alert("Giriş zamanı xəta baş verdi!");
    }
};