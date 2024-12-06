import React, { useEffect } from 'react';
import WordCloud from 'wordcloud';

export const WordCloudComponent = ({ wordFrequency, id }) => {
    useEffect(() => {
        if (Object.keys(wordFrequency).length === 0) {
            console.log('No hay datos para generar la nube de palabras.');
            return;
        }

        console.log('Generando la nube de palabras con:', wordFrequency);

        const words = Object.keys(wordFrequency).map((word) => ({
            text: word,
            weight: wordFrequency[word],
        }));

        // Generar la nube de palabras
        WordCloud(document.getElementById(id), {
            list: words.map((item) => [item.text, item.weight]),
            gridSize: 10,
            weightFactor: 30,
            fontFamily: 'Times, serif',
            color: 'random-dark',
            rotateRatio: 0.5,
            backgroundColor: 'white',
        });
    }, [wordFrequency, id]); // Dependencias: cuando cambie wordFrequency o id, ejecutar de nuevo

    return <div id={id} style={{ width: '500px', height: '500px' }}></div>;
};