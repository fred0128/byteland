import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child, onChildAdded } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

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
const database = getDatabase(app);

const getUsername = () => {
    let username = localStorage.getItem("username");
    if (!username) {
        username = prompt("Adınızı daxil edin:");
        if (username) {
            localStorage.setItem("username", username);
        } else {
            username = "Guest";
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

        const messageDiv = document.createElement("div");
        const messageHeader = document.createElement("div");
        const messageContentDiv = document.createElement("div");
        const messageDate = document.createElement("div");

        if (message.username === getUsername()) {
            messageDiv.classList.add("own-message");
        } else {
            messageDiv.classList.add("other-message");

            messageHeader.classList.add("username");
            messageHeader.innerText = message.username;
            messageDiv.appendChild(messageHeader);
        }

        messageContentDiv.classList.add("message-content");
        messageContentDiv.innerText = message.text;

        messageDate.classList.add("message-date");
        const currentTime = new Date();
        messageDate.innerText = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("content-wrapper");
        contentWrapper.appendChild(messageContentDiv);
        contentWrapper.appendChild(messageDate);

        messageDiv.appendChild(contentWrapper);
        chatBox.appendChild(messageDiv);

        chatBox.scrollTop = chatBox.scrollHeight;

        if (!isPageActive) {
            playNotificationSound();
        }
    });
};

const sendMessage = async (username, messageText) => {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
        username: username,
        text: messageText
    });
};

const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText) {
        const username = getUsername();
        sendMessage(username, messageText);
        messageInput.value = '';
    }
});

window.onload = displayMessages;

let isPageActive = true;

document.addEventListener("visibilitychange", () => {
    isPageActive = !document.hidden;
});
