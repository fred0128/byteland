// Funksiya: HTML faylını yükləyir və göstərir
function loadContent(filePath) {
    const dashboardMain = document.querySelector('.dashboard-main');
    fetch(filePath)
        .then((response) => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then((html) => {
            dashboardMain.innerHTML = html;
        })
        .catch((error) => {
            console.error(error);
            dashboardMain.innerHTML = `<h2>Error</h2><p>Content could not be loaded.</p>`;
        });
}

// Bütün `dashboard-icon-item` elementlərini seçirik
const dashboardItems = document.querySelectorAll('.dashboard-icon-item');

// Klik hadisəsi təyin edirik
dashboardItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Bütün elementlərdən `d-i-i-active` sinifini silirik
        dashboardItems.forEach((el) => el.classList.remove('d-i-i-active'));

        // Klik edilən elementə `d-i-i-active` sinifini əlavə edirik
        item.classList.add('d-i-i-active');

        // HTML faylını yükləyirik
        switch (index) {
            case 0:
                loadContent('main.html');
                break;
            case 1:
                loadContent('pages.html');
                break;
            case 2:
                loadContent('lessons.html');
                break;
            case 3:
                loadContent('forum.html');
                break;
            case 4:
                loadContent('calendar.html');
                break;
            case 5:
                loadContent('notification.html');
                break;
            case 6:
                loadContent('settings.html');
                break;
            case 7:
                loadContent('profile.html');
                break;
            case 8:
                loadContent('logout.html');
                break;
            case 9:
                loadContent('faq.html');
                break;
            case 10:
                loadContent('profile.html');
                break;
            case 11:
                loadContent('dark-mode.html');
                break;
            default:
                loadContent('main.html');
                break;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadContent('main.html'); // İlk açılışda main.html yüklənir
});