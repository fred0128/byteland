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
            username = "Guest"; // İstifadəçi heç bir ad daxil etmədikdə default ad
        }
    }
    return username;
};

const playNotificationSound = () => {
    const sound = document.getElementById("notification-sound");
    sound.play().catch((error) => {
        console.error("Səsi çalmaqda xəta:", error);
    });
};

const displayMessages = async () => {
    const messagesRef = ref(database, 'messages');

    onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        const chatBox = document.getElementById("chat-messages");

        // Yeni mesaj üçün `div` elementləri yaradılır
        const messageDiv = document.createElement("div");
        const messageHeader = document.createElement("div");
        const messageContentDiv = document.createElement("div");
        const messageDate = document.createElement("div");

        // İstifadəçi öz mesajıdırsa fərqli sinif
        if (message.username === getUsername()) {
            messageDiv.classList.add("own-message");
        } else {
            messageDiv.classList.add("other-message");

            // Qarşı tərəfin istifadəçi adını göstəririk
            messageHeader.classList.add("username");
            messageHeader.innerText = message.username;
            messageDiv.appendChild(messageHeader);
        }

        // Mesaj məzmunu və vaxt
        messageContentDiv.classList.add("message-content");
        messageContentDiv.innerText = message.text;

        messageDate.classList.add("message-date");
        const currentTime = new Date();
        messageDate.innerText = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

        // Sol tərəfdə vaxt göstərilməsi
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("content-wrapper");
        contentWrapper.appendChild(messageContentDiv);
        contentWrapper.appendChild(messageDate);

        // Tam strukturu tamamlayırıq
        messageDiv.appendChild(contentWrapper);
        chatBox.appendChild(messageDiv);

        // Yeni mesajlar gəldikcə scroll edirik
        chatBox.scrollTop = chatBox.scrollHeight;

        if (!isPageActive) {
            playNotificationSound();
        }
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

let isPageActive = true;

document.addEventListener("visibilitychange", () => {
    isPageActive = !document.hidden;
});
