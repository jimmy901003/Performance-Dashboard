Chart.register(ChartDataLabels);

// 獎金分佈圖表
const ctx = document.getElementById('contractChart').getContext('2d');
const data = [3600.0, 201750.0, 1162980.0, 1345000.0];
const labels = ['幸雅芳', '彭子芸', '潘姿菁', '王羿淨'];
const maxIndex = data.indexOf(Math.max(...data));

new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [
                '#34495e',
                '#3498db',
                '#1abc9c',
                '#9b59b6'
            ],
            borderColor: 'white',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#2c3e50',
                textAlign: 'center',
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: (value, ctx) => {
                    let sum = data.reduce((a, b) => a + b, 0);
                    let percentage = (value * 100 / sum).toFixed(1) + "%";
                    return `${ctx.chart.data.labels[ctx.dataIndex]}\n${percentage}`;
                },
                anchor: 'end',
                align: 'end',
                offset: 10,
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowBlur: 3
            }
        },
        layout: {
            padding: {
                top: 50,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        radius: '100%',
        rotation: 20
    }
});

// 獎金與成本對比圖表
const hueCtx = document.getElementById('hueChart').getContext('2d');
const hueLabels = ['張宛晴', '潘姿菁', '王羿淨'];
const contractBonus = [48000.0, 1152850.0, 423600.0];
const totalCost = [47350, 741860, 344750];

new Chart(hueCtx, {
    type: 'bar',
    data: {
        labels: hueLabels,
        datasets: [
            {
                label: '簽約金額',
                data: contractBonus,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: '實際吃餐金額',
                data: totalCost,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: false
            },
            y: {
                stacked: false,
                beginAtZero: true,
                ticks: {
                    display: false // 隱藏 Y 軸的刻度標籤
                },
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    boxWidth: 12,
                    padding: 8,
                    font: {
                        size: 12
                    }
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: (value, context) => {
                    const datasetIndex = context.datasetIndex;
                    const index = context.dataIndex;
                    if (datasetIndex === 1) { // 總成本
                        const bonus = contractBonus[index];
                        const cost = value;
                        const decrease = ((bonus - cost) / bonus * 100).toFixed(1);
                        if (decrease > 0) {
                            return `${value.toLocaleString()}\n↓ ${decrease}%`;
                        }
                    }
                    return value.toLocaleString();
                },
                font: {
                    weight: 'bold',
                    size: 12
                },
                color: (context) => {
                    return context.datasetIndex === 1 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)';
                }
            }
        }
    }
});