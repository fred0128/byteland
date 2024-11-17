import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

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

// Forum mesajlarını əldə etmək və göstərmək
const displayMessages = async () => {
    const messagesRef = ref(database, 'messages');
    const snapshot = await get(messagesRef);

    if (snapshot.exists()) {
        const messages = snapshot.val();
        const chatBox = document.getElementById("chat-messages");
        chatBox.innerHTML = ''; // Mövcud mesajları təmizləyirik

        // Mesajları göstər
        for (let id in messages) {
            const message = messages[id];
            const messageDiv = document.createElement("div");
            messageDiv.style.padding = "8px";
            messageDiv.style.marginBottom = "8px";
            messageDiv.style.backgroundColor = "#3a3a3a";
            messageDiv.style.color = "#fff";
            messageDiv.style.borderRadius = "4px";

            messageDiv.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
            chatBox.appendChild(messageDiv);
        }

        // Yeni mesajlar gəldikcə scroll yapın
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

// Mesaj göndərmə funksiyası
const sendMessage = async (username, messageText) => {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
        username: username,
        text: messageText
    });

    // Göndərildikdən sonra mesajları yenidən göstər
    displayMessages();
};

// Mesaj göndərmə formu ilə işləmək
const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText) {
        const username = "Guest";  // Bunu login olmuş istifadəçi adı ilə dəyişə bilərsiniz
        sendMessage(username, messageText);
        messageInput.value = ''; // Mesaj yazıldısa inputu təmizlə
    }
});

// Forum səhifəsi yükləndikdə əvvəlki mesajları göstər
window.onload = displayMessages;
