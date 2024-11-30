import React, { useState } from 'react';

export const DataImport = ( {file, setFile,shouldShowContent, setShouldShowContent }) => {

    const [reviewText, setReviewText] = useState('');
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        let selectedFile = event.target.files[0];
        if (selectedFile.type !== "text/csv") {
            alert("Solo se permiten archivos .csv. Porfavor seleccione uno valido");
            setFile(selectedFile)
            return;
        }

        setFile(selectedFile); // Guardar el archivo en el estado del componente padre.
        console.log("Archivo seleccionado:", selectedFile.name);

    }
    const handleTextChange = (e) => {
        setReviewText(e.target.value);
    };
    const handleAnalyzeClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/reviews/predict', {
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


    const handleUpload = () => {
        if (!file ) {
            alert("Primero selecciona un archivo para analizar.");
            return;
        }
        setShouldShowContent(true);
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