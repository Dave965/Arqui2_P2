import React, { useEffect, useState, useRef } from "react";
import "./Modal.css";
import ApexCharts from "apexcharts";

const Modal = ({ onClose, roomName }) => {
  
  const graficaRef = useRef(null); // Ref para almacenar la instancia de la gráfica
  const historicoRef = useRef(null); // Ref para almacenar la instancia de la gráfica histórica

  useEffect(() => {
    // Definir las opciones de la gráfica
    const options = {
      series: DataTR,
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1
      },
      title: {
        text: 'Mapa de Calor'
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        enabled: false
      }
    };

    // Creación y renderizado de la gráfica en #grafica-container
    const graficaContainer = document.querySelector("#grafica-container");
    if (graficaContainer) {
      if (graficaRef.current) {
        graficaRef.current.destroy();
      }
      const chart = new ApexCharts(graficaContainer, options);
      chart.render();
      graficaRef.current = chart;
    } else {
      console.error("No se encontró el contenedor de la gráfica #grafica-container.");
    }

    // Creación y renderizado de la gráfica en #historico-container
    const historicoContainer = document.querySelector("#historico-container");
    if (historicoContainer) {
      if (historicoRef.current) {
        historicoRef.current.destroy();
      }
      const historicoChart = new ApexCharts(historicoContainer, options);
      historicoChart.render();
      historicoRef.current = historicoChart;
    } else {
      console.error("No se encontró el contenedor de la gráfica #historico-container.");
    }

    // Función para generar datos aleatorios
    

    // Función de limpieza
    return () => {
      if (graficaRef.current) {
        graficaRef.current.destroy();
      }
      if (historicoRef.current) {
        historicoRef.current.destroy();
      }
    };
  }, [roomName]);

  function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = '' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    }


  const [DataTR, setDataTR] = useState([{name: '', data: generateData(10, 5)}]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Información de {roomName}</h2>
        <div className="informacion-page">
          <section id="mapa-de-calor" className="section">
            <h2 className="subtitle">Mapa de Calor</h2>
            <h3>Tiempo Real</h3>
            <h3>Contador de Personas</h3>
            <div className="heatmap-container"></div>
            <div id="grafica-container" className="grafica-container"></div>
          </section>
          <section id="historico" className="section">
            <h2 className="subtitle">Histórico</h2>
            <div id="historico-container" className="historico-container"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
