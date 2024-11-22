import React, { useEffect } from "react";
import * as d3 from "d3"; // Importa d3
import cloud from "d3-cloud"; // Asegúrate de instalar d3-cloud

const D3Visualization = () => {
  useEffect(() => {
    // Datos de ejemplo para la nube de palabras
    const words = [
      { text: "carolina", frequency: 50 },
      { text: "juan", frequency: 30 },
      { text: "chiristian", frequency: 20 },
      { text: "emotion", frequency: 40 },
      { text: "troste", frequency: 100 },
      { text: "feli", frequency: 60 }
    ];

    dataViz_wordcloud(words); // Llamamos la función de WordCloud con las palabras

    // Función para la nube de palabras
    function dataViz_wordcloud(data) {
      const wordScale = d3.scaleLinear().domain([0, 100]).range([10, 50]); // Tamaños de palabras más pequeños

      const keywords = ["chiristian", "emotion", "troste", "feli"]; // Palabras clave a resaltar

      cloud()
        .size([400, 400]) // Tamaño reducido del área de la nube
        .words(data)
        .fontSize(d => wordScale(d.frequency)) // Escala para el tamaño de las palabras
        .padding(5) // Aumentar el padding entre palabras
        .rotate(() => (Math.random() > 0.5 ? 90 : 0)) // Rotación aleatoria para las palabras
        .on("end", draw)
        .start();

      function draw(words) {
        // Limpiar el SVG previo antes de añadir nuevo contenido
        d3.select("#cloud").selectAll("*").remove();

        // Crear el grupo para las palabras en la nube
        const wordG = d3.select("#cloud")
          .append("g")
          .attr("id", "wordCloudG")
          .attr("transform", "translate(200,200)"); // Centrar las palabras

        // Añadir las palabras a la nube
        wordG
          .selectAll("text.miclase")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", d => d.size + "px")
          .style("fill", d => (keywords.indexOf(d.text) > -1 ? "red" : "black"))
          .style("opacity", 0.75)
          .attr("text-anchor", "middle")
          .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);
      }
    }
  }, []);

  return (
    <div id="viz" style={{ width: '400px', height: '400px' }}>
      <svg id="cloud" width="100%" height="100%"></svg>
    </div>
  );
};

export default D3Visualization;
