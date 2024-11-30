export const DataImport = ( {file, setFile,shouldShowContent, setShouldShowContent }) => {

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

    const handleUpload = () => {
        if (!file ) {
            alert("Primero selecciona un archivo para analizar.");
            return;
        }
        setShouldShowContent(true);
    }

    return (
        <>
            <div>
                <h1>👋🏻 Hola Y Bienvenido a nuestro Aplicacion de Analisis</h1>
                <input type="file" accept=".csv" onChange={handleFileChange}/>
                <button onClick={handleUpload}>Subir y analizar</button>

            </div>
        </>
    );
}