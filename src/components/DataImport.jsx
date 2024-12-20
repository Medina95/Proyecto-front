import React, { useState } from 'react';
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

export const DataImport = ( {file, setFile,nameColumns,setNameColumns, shouldShowContent, setShouldShowContent, uploadFileAndFetchPercentages }) => {

    const [reviewText, setReviewText] = useState('');
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');
    const [rating, setRating] = useState('')
    const [text, setText] = useState('')


    const handleInputChange = (index, value) => {
        const updatedColumns = [...nameColumns];
        updatedColumns[index] = value;
        setNameColumns(updatedColumns);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };
    const handleTextChange = (e) => {
        setReviewText(e.target.value);
    }
    const handleAnalyzeClick = async () => {
        try {
            const response = await fetch('https://reviewai.duckdns.org:8000/api/v1/reviews/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: reviewText }),
            });

            const result = await response.json();

            if (response.ok) {
                setPrediction(result.prediction);
                setError('');
            } else {
                setPrediction('');
                setError(result.error || 'Ocurrió un error');
            }
        } catch (err) {
            setPrediction('');
            setError('Error de conexión o servidor');
        }
    };


    const handleUpload =  () => {
        if (!file || !nameColumns) {
            alert("Verifique el archivo o los nombres de las columnas e intente nuevamente .");
            return;
        }

        if (!file.name.endsWith(".csv")) {
            alert("El archivo debe ser un archivo .csv. Seleccione un archivo válido.");
            return;
        }
        setShouldShowContent(true);
        uploadFileAndFetchPercentages();

    }

    return (
        <>
            <div style={{ backgroundColor: '#5F6A88', color: 'white', minHeight: '100vh' }}>

            <div style={{textAlign: 'center', padding: '20px'}}>
                <h1 className="title">👋🏻 Hola Y Bienvenido a nuestro Aplicación de Analisis</h1>
            </div>

            <div style={{display: 'flex',backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{flex: 1, marginRight: '20px'}}>
                    <h1 className="green-title">Subir y Analizar CSV</h1>
                    <input
                        id={"file-selected"}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        style={{
                            color: 'black',
                            border: '2px solid black',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Ingresa el nombre de la columna de reviews"
                        value={nameColumns[0]}
                        onChange={(e) => handleInputChange(0, e.target.value)}

                    />
                    <input
                        type="text"
                        placeholder="Ingresa el nombre de la columna de ratings"
                        value={nameColumns[1]}
                        onChange={(e) => handleInputChange(1, e.target.value)}
                    />
                    <button onClick={handleUpload}>Subir y analizar</button>
                </div>
                <img src="/emocionesproyecto.jpg" alt="Logo" width="500" height="auto"/>

                <div style={{flex: 1}}>
                    <h1 className="green-title">Modelo mini</h1>
                    <input
                        type="text"
                        placeholder="Ingresa tu review aca"
                        value={reviewText}
                        onChange={handleTextChange}
                    />
                    <button onClick={handleAnalyzeClick}>Analizar texto</button>
                    <h2 style={{ color: 'green' }}>Predicción: {prediction}</h2>
                </div>

            </div>

            </div>

        </>

    );
}