import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child, onChildAdded } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Firebase konfiqurasiyası
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

// Firebase tətbiqini başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// İstifadəçi adını localStorage-dən əldə etmək və ya soruşmaq
const getUsername = () => {
    let username = localStorage.getItem("username");
    if (!username) {
        username = prompt("Adınızı daxil edin:");
        if (username) {
            localStorage.setItem("username", username);
        } else {
            username = "Qonaq"; // İstifadəçi heç bir ad daxil etmədikdə default ad
        }
    }
    return username;
};

// Forum mesajlarını əldə etmək və göstərmək (real-time)
const displayMessages = async () => {
    const messagesRef = ref(database, 'messages');

    // Firebase Realtime Database-də mesajları dinləmək
    onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        const chatBox = document.getElementById("chat-messages");

        // Hər yeni mesaj gəldikdə onun görünüşünü təmin edirik
        const messageDiv = document.createElement("div");
        messageDiv.style.padding = "8px";
        messageDiv.style.marginBottom = "8px";
        messageDiv.style.backgroundColor = "#3a3a3a";
        messageDiv.style.color = "#fff";
        messageDiv.style.borderRadius = "4px";

        messageDiv.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
        chatBox.appendChild(messageDiv);

        // Yeni mesajlar gəldikcə scroll yapın
        chatBox.scrollTop = chatBox.scrollHeight;
    });
};

// Mesaj göndərmə funksiyası
const sendMessage = async (username, messageText) => {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
        username: username,
        text: messageText
    });
};

// Mesaj göndərmə formu ilə işləmək
const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText) {
        const username = getUsername(); // İstifadəçi adını əldə et
        sendMessage(username, messageText);
        messageInput.value = ''; // Mesaj yazıldısa inputu təmizlə
    }
});

// Forum səhifəsi yükləndikdə əvvəlki mesajları göstər (real-time olaraq dinləməyə başlayır)
window.onload = displayMessages;
