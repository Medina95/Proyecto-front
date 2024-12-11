import React, { useEffect, useState } from 'react';
import './App.css';
import { Face } from "./components/Face";
import { Chart } from "./components/Chart";
import { DataImport } from "./components/DataImport";
import { ClipLoader } from "react-spinners";
import { Table } from "./components/Table";
import {WordCloudComponent} from "./components/WordCloudComponent";
import PieChartComponent from "./components/PieChartComponent";

export function App() {
  const [file, setFile] = useState(null);
  const [nameColumns, setNameColumns] = useState(["", ""]);
  const [porcentages, setPorcentages] = useState([]);
  const [shouldShowContent, setShouldContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#cd6155");
  const stopWords = [
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this',
    'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing',
    'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'd', 'll',
    'm', 'o', 're', 've', 'y', 'ain', 'aren', 'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven', 'isn', 'ma', 'mightn', 'mustn', 'needn', 'shan',
    'shouldn', 'wasn', 'weren', 'won', 'wouldn'
  ];
  function getWordFrequency(texts, maxWords = 100) {
    const wordCount = {};
    let totalWords = 0;

    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const words = text.toLowerCase().match(/\w+('\w+)?/g);

      if (words) {
        for (let j = 0; j < words.length; j++) {
          const word = words[j];
          if (!stopWords.includes(word)) {
            wordCount[word] = (wordCount[word] || 0) + 1;
            totalWords++;

            if (totalWords >= maxWords) {
              return wordCount;
            }
          }
        }
      }

      if (totalWords >= maxWords) {
        return wordCount;
      }
    }
    return wordCount;
  }



  const uploadFileAndFetchPercentages = async () => {
      const apiUrl = "http://localhost:8000/api/v1/reviews/uploadDataFrame";

      if (!file || !nameColumns) {
      alert("Verifique el archivo o los nombres de las columnas e intente nuevamente.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("labels", JSON.stringify(nameColumns));

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtiene el texto del error
        throw new Error(`ERROR AL INTENTAR SUBIR Y TRAER LOS DATOS: ${errorText}`);
      }

      const data = await response.json();

      // Procesamiento de la data recibida
      const text = data.map((row) => row["Text"]);
      const predictedClasses = data.map((row) => row["Predicted Class"]);
      const ratings = data.map((row) => row["Rating"]);
      const probabilities = data.map((row) => row["Probability"]);

      // valores del rating
      const uniqueRatings = [...new Set(ratings)].sort((a, b) => a - b);
      function countEmotionOccurrences(ratings, predictedClasses, uniqueRatings, emotion) {
        return uniqueRatings.map((rating) => {
          // Contamos las veces que el rating aparece con la emoción
          const count = ratings.filter((r, index) => r === rating && predictedClasses[index] === emotion).length;
          return count;
        });
      }
      const positiveRatingsCount = countEmotionOccurrences(ratings, predictedClasses, uniqueRatings, "Positivo");
      const negativeArray = countEmotionOccurrences(ratings, predictedClasses, uniqueRatings, "Negativo");
      const negativeRatingsCount = negativeArray.map(num => -num);

      const neutralrating = countEmotionOccurrences(ratings, predictedClasses, uniqueRatings, "Neutro");



      // Calcular los porcentajes de cada clase de sentimiento
      const totalReviews = data.length;
      const positiveReviews = predictedClasses.filter((c) => c === "Positivo").length;
      const negativeReviews = predictedClasses.filter((c) => c === "Negativo").length;
      const neutralReviews = predictedClasses.filter((c) => c === "Neutro").length;

      const positivePercentage = Math.round((positiveReviews / totalReviews) * 100);
      const negativePercentage = Math.round((negativeReviews / totalReviews) * 100);
      const neutralPercentage = Math.round((neutralReviews / totalReviews) * 100);


      // Filtrar los textos de las reviews
      const textpositiveReviews = text.filter((text, index) => predictedClasses[index] === "Positivo");
      const textnegativeReviews = text.filter((text, index) => predictedClasses[index] === "Negativo");
      const textneutralReviews = text.filter((text, index) => predictedClasses[index] === "Neutro");

      const positiveWordFrequency = getWordFrequency(textpositiveReviews);
      const negativeWordFrequency = getWordFrequency(textnegativeReviews);
      const neutralWordFrequency = getWordFrequency(textneutralReviews);

      // Promedio de calificaciones y probabilidades
      const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
      const averageProbability = probabilities.reduce((acc, curr) => acc + curr, 0) / probabilities.length;
    // Crear arrays de ratings positivos y negativos


      setPorcentages({
        neutralrating,

        uniqueRatings,
        negativeRatingsCount,
        positiveRatingsCount,
        positiveWordFrequency,
        negativeWordFrequency,
        neutralWordFrequency,
        positiveReviews,
        negativeReviews,
        neutralReviews,
        totalReviews,
        positivePercentage,
        negativePercentage,
        neutralPercentage,
        averageRating,
        averageProbability,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
      <div className={`App ${shouldShowContent ? 'background-image' : ''}`}>
        {!shouldShowContent && (
            <DataImport
                file={file}
                setFile={setFile}
                nameColumns={nameColumns}
                setNameColumns={setNameColumns}
                shouldShowContent={shouldShowContent}
                setShouldShowContent={setShouldContent}
                uploadFileAndFetchPercentages={uploadFileAndFetchPercentages}
            />
        )}

        {shouldShowContent ? (
            <>
              <h1 className="page-title">
                <span>📊 Reseñas Con Inteligencia Artificial</span>
                <br/>
                <span className="highlight">y Análisis de Sentimientos</span>
              </h1>

              {loading ? (
                  <ClipLoader
                      color={color}
                      loading={loading}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />
              ) : (
                  <>
                    <div className="caritas-container">
                      <Face
                          porcentage={porcentages.positivePercentage}
                          name={"carita feliz"}
                          mood={"carita-mouth happy-mouth"}
                          color={"#A8E6CF"}
                      />

                      <Face
                          porcentage={porcentages.neutralPercentage}
                          name={"carita neutral"}
                          mood={"carita-mouth neutral-mouth"}
                          color={"gray"}
                      />

                      <Face
                          porcentage={porcentages.negativePercentage}
                          name={"carita sad"}
                          mood={"carita-mouth sad-mouth"}
                          color={"#FF6384"}
                      />
                    </div>

                    <div>
                      <h1>El total de reseñas fueron: {porcentages.totalReviews}</h1>
                    </div>

                    <div className="visualization-container" style={{
                      display: 'flex',
                      justifyContent: 'space-around',  // Alinea los elementos con espacio entre ellos
                      alignItems: 'flex-start', // Alinea verticalmente en la parte superior
                      flexWrap: 'nowrap', // Evita que los elementos se envuelvan
                    }}>
                      {/* Visualización Gráfico */}
                      <div style={{flex: '1 1 30%', padding: '10px'}}>
                        <h1> Emociones vs Ranting </h1>
                        <Chart labels={porcentages.uniqueRatings} dataset1Data={porcentages.positiveRatingsCount} dataset2Data={porcentages.negativeRatingsCount} dataset3Data={porcentages.neutralrating}/>
                      </div>

                      {/* Tabla de emociones y Gráfico Circular */}
                      <div >
                        <h1>Tabla de emociones</h1>
                        <Table
                            positiveReviews={porcentages.positiveReviews}
                            negativeReviews={porcentages.negativeReviews}
                            neutralReviews={porcentages.neutralReviews}
                        />

                      </div>
                      <PieChartComponent

                          positiveReviews={porcentages.positivePercentage}
                          negativeReviews={porcentages.negativePercentage}
                          neutralReviews={porcentages.neutralPercentage}
                      />
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-around', gap: '20px'}}>
                      <div style={{flex: 1, textAlign: 'center'}}>
                        <h1>Nube de Palabras - Positivas</h1>
                        <WordCloudComponent
                            wordFrequency={porcentages.positiveWordFrequency}
                            id="word-cloud-positive"
                        />
                      </div>
                      <div style={{flex: 1, textAlign: 'center'}}>
                        <h1>Nube de Palabras - Neutras</h1>
                        <WordCloudComponent
                            wordFrequency={porcentages.neutralWordFrequency}
                            id="word-cloud-neutral"
                        />
                      </div>
                      <div style={{flex: 1, textAlign: 'center'}}>
                        <h1>Nube de Palabras - Negativas</h1>
                        <WordCloudComponent
                            wordFrequency={porcentages.negativeWordFrequency}
                            id="word-cloud-negative"
                        />
                      </div>


                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                    </div>
                  </>
              )}
            </>
            )
            :
            (
                <p></p>
            )
        }
      </div>
  )
      ;

}
