document.addEventListener("DOMContentLoaded", () => {
    const allowedPages = ["index.html", "pages/login.html", "pages/signup.html"];
    const currentPage = window.location.pathname.split("/").pop();
    const isLoggedIn = localStorage.getItem("userEmail") !== null;

    // Yalnız icazəli səhifələrdə yoxsa və istifadəçi daxil olmayıbsa yönləndir
    if (!allowedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = "../index.html";
    }
});