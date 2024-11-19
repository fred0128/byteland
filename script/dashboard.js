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


// Kontent yükləmə funksiyası
function loadContent(page) {
    const mainContainer = document.querySelector(".dashboard-main");
    fetch(page) // HTML faylını yükləyir
        .then(response => response.text())
        .then(html => {
            mainContainer.innerHTML = html; // Kontenti yerləşdirir
            if (page === "main.html") initializeChart(); // Chart varsa qur
        })
        .catch(err => console.error("Error loading content: ", err));
}

// Chart qurmaq funksiyası
function initializeChart() {
    const ctx = document.getElementById('activityChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['B.E', 'Ç.A', 'Ç', 'C.A', 'C', 'Ş', 'B'],
                datasets: [{
                    label: 'Ümumi saat',
                    data: [3.1, 4.2, 2.5, 4.5, 6.9, 3.8, 5.1],
                    backgroundColor: [
                        '#93e03f',
                        '#93e03f',
                        '#93e03f',
                        '#93e03f',
                        '#93e03f',
                        '#93e03f',
                        '#93e03f'
                    ],
                    borderRadius: 10
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw} Saatlar`
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: { beginAtZero: true },
                        grid: { drawBorder: false }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#777' }
                    }
                }
            }
        });
    }
}



// calendar.html faylını yüklə və göstər
fetch('calendar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('calendar-container').innerHTML = html;
    })
    .catch(error => {
        console.error('Calendar faylı yüklənmədi:', error);
    });
document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ['Bazar', 'Bazar ertəsi', 'Çərşənbə', 'Çərşənbə axşamı', 'Cümə axşamı', 'Cümə', 'Şənbə'];
    const calendarDays = document.getElementById('days');
    const monthYearDisplay = document.getElementById('month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentDate = new Date();

    function renderCalendar(date) {
        calendarDays.innerHTML = ''; // Boşaltmaq

        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        monthYearDisplay.textContent = `${currentYear} - ${currentMonth + 1}`;

        // Günləri başlıqlarla göstərmək
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            calendarDays.appendChild(dayElement);
        });

        // Ayın ilk günü
        const firstDay = new Date(currentYear, currentMonth, 1);
        const firstDayIndex = firstDay.getDay();

        // Ayın son günü
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const lastDate = lastDay.getDate();

        // Ayın əvvəlindən boşluqlar
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            calendarDays.appendChild(emptyDay);
        }

        // Günləri əlavə et
        for (let day = 1; day <= lastDate; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('active');
            calendarDays.appendChild(dayElement);
        }
    }

    // Növbəti ay
    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Əvvəlki ay
    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // İlk render
    renderCalendar(currentDate);
});