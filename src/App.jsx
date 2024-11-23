import React, {useEffect, useState} from 'react';
import './App.css';
import D3Visualization from './components/D3Visualization';
import {Face} from "./components/Face";
import {Chart} from "./components/Chart";



  export function App() {

    const [porcentages, setPorcentages]  = useState([]);

    useEffect(() => {
      const apiUrl = "http://localhost:5000/api/v1/reviews/porcentajes";

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
          <h1 className="page-title">
            <span>📊 Reseñas Con Inteligencia Artificial</span>
            <br/>
            <span className="highlight">y Análisis de Sentimientos</span>
          </h1>

          <div className="caritas-container">
            <Face porcentage={porcentages[1]} name={"carita feliz"} mood={"carita-mouth happy-mouth"} color={'#A8E6CF'}/>
            <h1> EL total de reseñas fueron: {porcentages[0]}</h1>
            <Face porcentage={porcentages[2]} name={"carita sad"} mood={"carita-mouth sad-mouth"} color={'#FF8C8C'}/>

          </div>

          <div className="App">
            <div className="visualization-container">
              <D3Visualization/>
              <Chart/>
            </div>
          </div>

        </div>
      </>
    );
  }