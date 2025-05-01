
const ctx = document.getElementById('electricityDemandChart').getContext('2d');

const labels = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];

const fullData = {
    low: [300, 330, 360, 460, 500, 540, 580, 610],
    base: [300, 330, 360, 460, 520, 600, 700, 800],
    high: [300, 330, 360, 460, 550, 680, 850, 1050]
};

const solidIndex = 4; // Up to 2022 (index 3 is last solid point)

const colorPalette = {
    low: '#ff9966',    // Warm peach
    base: '#ff7f50',   // Coral
    high: '#f4b400'    // Strong yellow
};

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Low case',
                data: Array(labels.length).fill(null),
                borderColor: colorPalette.low,
                borderDash: [],
                borderWidth: 3,
                tension: 0.4,
                fill: false
            },
            {
                label: 'Base case',
                data: Array(labels.length).fill(null),
                borderColor: colorPalette.base,
                borderDash: [],
                borderWidth: 3,
                tension: 0.4,
                fill: false
            },
            {
                label: 'High case',
                data: Array(labels.length).fill(null),
                borderColor: colorPalette.high,
                borderDash: [],
                borderWidth: 3,
                tension: 0.4,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        plugins: {
            legend: { position: 'bottom', labels: { color: '#333' } }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'TWh',
                    color: '#8b4513'
                },
                min: 0,
                max: 1200,
                ticks: {
                    stepSize: 200,
                    color: '#333'
                }
            },
            x: {
                ticks: { color: '#333' }
            }
        }
    }
});

function animateSnake() {
    let frame = 0;
    const totalFrames = labels.length;
    const frameDelay = 3000 / totalFrames;

    chart.data.datasets.forEach(ds => ds.data.fill(null));
    chart.update();

    const interval = setInterval(() => {
        if (frame >= totalFrames) {
            clearInterval(interval);
            return;
        }

        chart.data.datasets[0].data[frame] = fullData.low[frame];
        chart.data.datasets[1].data[frame] = fullData.base[frame];
        chart.data.datasets[2].data[frame] = fullData.high[frame];

        chart.data.datasets.forEach(ds => {
            ds.borderDash = frame < solidIndex ? [] : [6, 6];
        });

        chart.update();
        frame++;
    }, frameDelay);
}

animateSnake();
setInterval(animateSnake, 9000);

