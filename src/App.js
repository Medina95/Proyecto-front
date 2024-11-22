  import React, { useState } from 'react';
  import './App.css';
import D3Visualization from './D3Visualization';


  function App() {
    const [porcentaje1, setPorcentaje1] = useState(30);
    const [porcentaje2, setPorcentaje2] = useState(60);
    const [porcentaje3, setPorcentaje3] = useState(90);

    return (
      <div className="App">
        <h1>Caritas con porcentaje</h1>
        <div className="caritas-container">
          
          {/* Carita 1 - Feliz (verde) */}
          <div className="carita happy">
            <div className="filler" style={{ height: `${porcentaje1}%`, backgroundColor: 'green' }}></div>
            <div className="ojitos">
              <span className="ojo"></span>
              <span className="ojo"></span>
            </div>
            <div className="carita-mouth happy-mouth"></div>
            <span>{porcentaje1}%</span>
          </div>

          {/* Carita 2 - Neutral (gris) */}
          <div className="carita neutral">
            <div className="filler" style={{ height: `${porcentaje2}%`, backgroundColor: 'gray' }}></div>
            <div className="ojitos">
              <span className="ojo"></span>
              <span className="ojo"></span>
            </div>
            <div className="carita-mouth neutral-mouth"></div>
            <span>{porcentaje2}%</span>
          </div>

          {/* Carita 3 - Triste (roja) */}
          <div className="carita sad">
            <div className="filler" style={{ height: `${porcentaje3}%`, backgroundColor: 'red' }}></div>
            <div className="ojitos">
              <span className="ojo"></span>
              <span className="ojo"></span>
            </div>
            <div className="carita-mouth sad-mouth"></div>
            <span>{porcentaje3}%</span>
          </div>
        </div>

        <div className="controls">
          <button onClick={() => setPorcentaje1(porcentaje1 + 10)}>Aumentar Carita 1</button>
          <button onClick={() => setPorcentaje2(porcentaje2 + 10)}>Aumentar Carita 2</button>
          <button onClick={() => setPorcentaje3(porcentaje3 + 10)}>Aumentar Carita 3</button>
        </div>

        <div className="App">
      <h1>D3.js Pie Chart y Word Cloud</h1>
      <D3Visualization />
    </div>

      </div>
    );
  }

  export default App;
