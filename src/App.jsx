import React, { useEffect, useState } from 'react';
import './App.css';
import D3Visualization from './components/D3Visualization';
import { Face } from "./components/Face";
import { Chart } from "./components/Chart";
import { DataImport } from "./components/DataImport";

export function App() {
  const [file, setFile] = useState(null);
  const [porcentages, setPorcentages] = useState([]);
  const [shouldShowContent, setShouldContent] = useState(false);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/api/v1/reviews/uploadDataFrame";

    const uploadFileAndFetchPercentages = async () => {
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("ERROR AL INTENTAR SUBIR Y TRAER LOS DATOS");
        }

        const data = await response.json();

        // Procesamiento de la data recibida
        const predictedClasses = data.map(row => row['Predicted Class']);
        const ratings = data.map(row => row['Rating']);
        const probabilities = data.map(row => row['Probability']);

        // Calcular los porcentajes de cada clase de sentimiento
        const totalReviews = data.length;
        const positiveReviews = predictedClasses.filter(c => c === 'Positivo').length;
        const negativeReviews = predictedClasses.filter(c => c === 'Negativo').length;
        const neutralReviews = predictedClasses.filter(c => c === 'Neutro').length;

        const positivePercentage = (positiveReviews / totalReviews) * 100;
        const negativePercentage = (negativeReviews / totalReviews) * 100;
        const neutralPercentage = (neutralReviews / totalReviews) * 100;

        // Promedio de calificaciones y probabilidades
        const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
        const averageProbability = probabilities.reduce((acc, curr) => acc + curr, 0) / probabilities.length;

        setPorcentages({
          totalReviews,
          positivePercentage,
          negativePercentage,
          neutralPercentage,
          averageRating,
          averageProbability
        });

      } catch (error) {
        console.log(error);
      }
    };

    uploadFileAndFetchPercentages();
  }, [file]); // Ejecutar solo cuando `file` cambia

  return (
      <div className="App">
        {!shouldShowContent && (
            <DataImport
                file={file}
                setFile={setFile}
                shouldShowContent={shouldShowContent}
                setShouldShowContent={setShouldContent}
            />
        )}

        {shouldShowContent ? (
            <>
              <h1 className="page-title">
                <span>📊 Reseñas Con Inteligencia Artificial</span>
                <br/>
                <span className="highlight">y Análisis de Sentimientos</span>
              </h1>

              <div className="caritas-container">
                <Face
                    porcentage={porcentages.positivePercentage}
                    name={"carita feliz"}
                    mood={"carita-mouth happy-mouth"}
                    color={'#A8E6CF'}
                />

                <Face
                    porcentage={porcentages.neutralPercentage}
                    name={"carita neutral"}
                    mood={"carita-mouth neutral-mouth"}
                    color={'gray'}
                />

                <Face
                    porcentage={porcentages.negativePercentage}
                    name={"carita sad"}
                    mood={"carita-mouth sad-mouth"}
                    color={'#FF8C8C'}
                />
              </div>

              <div>
                <h1>EL total de reseñas fueron: {porcentages.totalReviews}</h1>
                <h2>Promedio de Calificación: {porcentages.averageRating}</h2>
                <h2>Promedio de Probabilidad: {porcentages.averageProbability}</h2>
                <h2> {console.log(porcentages)}</h2>
              </div>

              <div className="App">
                <div className="visualization-container">
                  <D3Visualization data={porcentages}/>
                  <Chart data={porcentages}/>
                </div>
              </div>
            </>
        ) : (
            <p></p>
        )}
      </div>
  );
}
