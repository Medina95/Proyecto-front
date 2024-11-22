import React, {useEffect, useState} from 'react';
import './App.css';
import D3Visualization from './D3Visualization';
import {Face} from "./components/Face";
import {Chart} from "./components/Chart";



  export function App() {

    const [porcentages, setPorcentages]  = useState([]);

    useEffect(() => {
      const apiUrl = "http://localhost:8080/api/v1/reviews/porcentajes";

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
            <Face porcentage={porcentages[1]} name={"carita feliz"} mood={"carita-mouth happy-mouth"} color={'green'}/>
            <Face porcentage={porcentages[2]} name={"carita sad"} mood={"carita-mouth sad-mouth"} color={'red'}/>

          </div>

          <div className="App">
            <h1>D3.js Pie Chart y Word Cloud</h1>
            <D3Visualization />
          </div>

          <Chart />

        </div>
      </>
    );
  }