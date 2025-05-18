import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Enregistrer les composants ChartJS nécessaires
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const RevenueChart = () => {
    const labels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'Revenu',
                data: [300, 450, 550, 650, 400, 570, 280],
                backgroundColor: '#7C3AED', // Violet
                borderRadius: 4,
                barThickness: 20,
            },
            {
                type: 'line',
                label: 'Tendance',
                data: [320, 420, 510, 600, 380, 520, 300],
                borderColor: '#EF4444', // Rouge
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#EF4444',
                pointHoverBackgroundColor: '#EF4444',
                pointBorderWidth: 2,
                pointHoverBorderWidth: 2,
                pointBorderColor: 'white',
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
                    gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
                    return gradient;
                },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
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
                    title: (context) => {
                        return `${context[0].label}`;
                    },
                    label: (context) => {
                        return `Revenu Total: ${context.raw} €`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#F3F4F6',
                },
                ticks: {
                    callback: (value) => `${value}`,
                    stepSize: 200,
                },
            },
        },
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>
                    Croissance des Revenus
                </h2>
                <div className='flex space-x-2'>
                    <button className='px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-800 font-medium'>
                        Jour
                    </button>
                    <button className='px-4 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-800 font-medium'>
                        Hebdomadaire
                    </button>
                    <button className='px-4 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-800 font-medium'>
                        Mensuel
                    </button>
                </div>
            </div>

            <div className='h-64'>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default RevenueChart;
