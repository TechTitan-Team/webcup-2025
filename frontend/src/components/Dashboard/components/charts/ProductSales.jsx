import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductSales = () => {
    const data = {
        labels: ['iPhone', 'iPad', 'iMac'],
        datasets: [
            {
                data: [40, 17, 13],
                backgroundColor: [
                    '#4F46E5', // Indigo
                    '#60A5FA', // Bleu
                    '#EF4444', // Rouge
                ],
                borderColor: ['#ffffff', '#ffffff', '#ffffff'],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: '#1F2937',
                bodyColor: '#1F2937',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        return `${context.label}: ${context.raw}%`;
                    },
                },
            },
        },
    };

    const percentageLabels = {
        id: 'percentageLabels',
        afterDatasetsDraw(chart) {
            const { ctx, data } = chart;

            chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
                const { x, y } = dataPoint.tooltipPosition();

                const offsets = [
                    { x: 30, y: -30 }, 
                    { x: 60, y: 10 },
                    { x: 20, y: 50 },
                ];

                ctx.beginPath();
                ctx.arc(
                    x + offsets[index].x,
                    y + offsets[index].y,
                    20,
                    0,
                    2 * Math.PI
                );
                ctx.fillStyle = 'white';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 2;
                ctx.fill();
                ctx.shadowColor = 'transparent';

                ctx.font = 'bold 12px Arial';
                ctx.fillStyle = '#1F2937';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    `${data.datasets[0].data[index]}%`,
                    x + offsets[index].x,
                    y + offsets[index].y
                );
            });
        },
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>
                    Ventes des Meilleurs Produits
                </h2>
                <button className='text-sm text-blue-500'>Voir Détails</button>
            </div>

            <div className='h-48 relative'>
                <Doughnut
                    data={data}
                    options={options}
                    plugins={[percentageLabels]}
                />
            </div>

            <div className='flex justify-around mt-6'>
                <div className='flex items-center'>
                    <span className='w-3 h-3 bg-indigo-700 rounded-full mr-2'></span>
                    <span className='text-sm'>iPhone</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-3 h-3 bg-blue-400 rounded-full mr-2'></span>
                    <span className='text-sm'>iPad</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-3 h-3 bg-red-500 rounded-full mr-2'></span>
                    <span className='text-sm'>iMac</span>
                </div>
            </div>
        </div>
    );
};

export default ProductSales;
