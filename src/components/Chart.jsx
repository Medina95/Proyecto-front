import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const Chart = ({ labels, dataset1Data, dataset2Data, dataset3Data }) => {
    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Positivo',
                data: dataset1Data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Negativo',
                data: dataset2Data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Neutral',
                data: dataset3Data,
                backgroundColor: 'rgba(169, 169, 169, 0.5)',
                borderColor: 'rgb(169, 169, 169)',
            },
        ],
    });

    useEffect(() => {
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Positivo',
                    data: dataset1Data,
                    backgroundColor: '#A8E6CF',
                    borderColor: 'rgb(75, 192, 192)',
                },
                {
                    label: 'Negativo',
                    data: dataset2Data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                },
                {
                    label: 'Neutral',
                    data: dataset3Data,
                    backgroundColor: 'rgba(169, 169, 169, 0.5)',
                    borderColor: 'rgb(169, 169, 169)',
                },
            ],
        });
    }, [labels, dataset1Data, dataset2Data, dataset3Data]);

    return (
        <div style={{ width: '600px', height: '450px' }} className="chart">
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false, // El título ya no se muestra
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Rating', // Etiqueta del eje X
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Emociones', // Etiqueta del eje Y
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
};


