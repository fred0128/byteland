const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['green', 'Blue', 'Yellow', 'red', 'Purple'],
        datasets: [{
            data: [12, 16, 3, 5, 8],
            backgroundColor: ['#93e03f', '#36a2eb', '#ffce56', '#ff3333', '#9c27b0'],
            borderColor: ['#000000'],
            hoverOffset: 30
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        }
    }
});

const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56],
            backgroundColor: '#93e03f',
            borderColor: '#93e03f',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true
    }
});