document.addEventListener("DOMContentLoaded", () => {
    const allowedPages = ["index.html", "pages/login.html", "pages/signup.html"];
    const currentPage = window.location.pathname.split("/").pop();
    const isLoggedIn = localStorage.getItem("userEmail") !== null;

    if (!allowedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = "../index.html";
    }
});