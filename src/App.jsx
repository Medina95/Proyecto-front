import React, {useEffect, useState} from 'react';
import './App.css';
import D3Visualization from './D3Visualization';
import {Face} from "./components/Face";


  export function App() {
    const [porcentaje1, setPorcentaje1] = useState(30);
    const [porcentaje2, setPorcentaje2] = useState(60);
    const [porcentaje3, setPorcentaje3] = useState(90);

    const [porcentages, setPorcentages]  = useState([]); // Este fetch trae los porcentajes

    useEffect(() => {
      const apiUrl = "AquiDeberiaHaberUnaURl:8080";

      const fetchPorcetages = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response) {
            throw new Error('ERROR AL INTENTAR TRAER LOS DATOS');
          }
          const data = await response.json();
          setPorcentages(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPorcetages();
    }, []);



    return (
      <>
        <div className="App">
          <h1>Caritas con porcentaje</h1>
          <div className="caritas-container">
            <Face porcentage={porcentaje1} name={"carita feliz"} mood={"carita-mouth happy-mouth"} color={'green'}/>
            <Face porcentage={porcentaje2} name={"carita neutral"} mood={"carita-mouth neutral-mouth"} color={'gray'}/>
            <Face porcentage={porcentaje3} name={"carita sad"} mood={"carita-mouth sad-mouth"} color={'red'}/>

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
      </>
    );
  }