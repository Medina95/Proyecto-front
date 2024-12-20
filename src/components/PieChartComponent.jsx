import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registramos los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ positiveReviews, negativeReviews, neutralReviews }) => {
    // Calculamos los valores para el gráfico
    const data = {
        labels: ['Positivas', 'Negativas', 'Neutras'], // Etiquetas de cada sección
        datasets: [
            {
                data: [positiveReviews, negativeReviews, neutralReviews], // Los valores de las emociones
                backgroundColor: ['#A8E6CF', '#FF6384', 'rgba(169, 169, 169, 0.5)'], // Colores para cada sección
                hoverBackgroundColor: ['rgba(75, 192, 192, 0.5)', '#FF6384', 'rgba(169, 169, 169, 0.5)'], // Colores al pasar el ratón
            },
        ],
    };

    const options = {
        responsive: true, // Hacer que el gráfico sea responsive
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`, // Mostrar el porcentaje en el tooltip
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h1>Distribución de Emociones</h1>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChartComponent;
