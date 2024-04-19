import React, { useEffect, useRef } from "react";
import "./Modal.css";
import ApexCharts from "apexcharts";

const Modal = ({ onClose, roomName }) => {
  const graficaRef = useRef(null); // Ref para almacenar la instancia de la gráfica
  const historicoRef = useRef(null); // Ref para almacenar la instancia de la gráfica histórica

  useEffect(() => {
    /* 01234567
    -0 00000000
    -1 00000000
    -2 00001000
    -3 00011000
    -4 00011000
    -5 00000000
    -6 00000000
    -7 00000000*/
    // Definir las opciones de la gráfica
    const options = {
      "series":[{"name":19,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0},{"x":15,"y":0},{"x":16,"y":0},{"x":17,"y":0},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":18,"data":[{"x":0,"y":0},{"x":1,"y":0.5},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0},{"x":5,"y":0.5},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0.5},{"x":10,"y":0},{"x":11,"y":0.5},{"x":12,"y":0},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":17,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":16,"data":[{"x":0,"y":0},{"x":1,"y":0.5},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":15,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0},{"x":11,"y":0.5},{"x":12,"y":0},{"x":13,"y":0.5},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":14,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":13,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0},{"x":5,"y":0.5},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0.5},{"x":10,"y":0},{"x":11,"y":0.5},{"x":12,"y":0},{"x":13,"y":0.5},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":12,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":11,"data":[{"x":0,"y":0},{"x":1,"y":0.5},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0},{"x":5,"y":0.5},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":10,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0.5},{"x":10,"y":1},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":9,"data":[{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0.5},{"x":10,"y":1},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":8,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":1},{"x":10,"y":0.5},{"x":11,"y":0.5},{"x":12,"y":0},{"x":13,"y":0.5},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":7,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0.5},{"x":10,"y":1},{"x":11,"y":0.5},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":6,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0},{"x":5,"y":0.5},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0.5},{"x":10,"y":0.5},{"x":11,"y":1},{"x":12,"y":0},{"x":13,"y":0.5},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0}]},{"name":5,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":1},{"x":11,"y":0.5},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":4,"data":[{"x":0,"y":0},{"x":1,"y":0.5},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0},{"x":5,"y":0.5},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0.5},{"x":10,"y":0},{"x":11,"y":0.5},{"x":12,"y":0},{"x":13,"y":0.5},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":3,"data":[{"x":0,"y":0},{"x":1,"y":0.5},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0},{"x":5,"y":0.5},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0.5},{"x":17,"y":0},{"x":18,"y":0.5},{"x":19,"y":0}]},{"name":2,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0},{"x":11,"y":0.5},{"x":12,"y":0},{"x":13,"y":0.5},{"x":14,"y":0},{"x":15,"y":0.5},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":1,"data":[{"x":0,"y":0},{"x":1,"y":0.5},{"x":2,"y":0},{"x":3,"y":0.5},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0.5},{"x":7,"y":0},{"x":8,"y":0.5},{"x":9,"y":0},{"x":10,"y":0.5},{"x":11,"y":0},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0.5}]},{"name":0,"data":[{"x":0,"y":0.5},{"x":1,"y":0},{"x":2,"y":0.5},{"x":3,"y":0},{"x":4,"y":0.5},{"x":5,"y":0},{"x":6,"y":0},{"x":7,"y":0.5},{"x":8,"y":0},{"x":9,"y":0.5},{"x":10,"y":0},{"x":11,"y":0.5},{"x":12,"y":0.5},{"x":13,"y":0},{"x":14,"y":0.5},{"x":15,"y":0},{"x":16,"y":0},{"x":17,"y":0.5},{"x":18,"y":0},{"x":19,"y":0.5}]}],
      chart: {
        height: '100%',
        width: '100%',
        type: 'heatmap',
      },
      plotOptions: {
        heatmap: {
          enableShades: true,
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: true,
          distributed: true,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0.25,
                name: '0-25%',
                color: '#0808ff'
              },
              {
                from: 0.25,
                to: 0.50,
                name: '25-50%',
                color: '#00ff00'
              },
              {
                from: 0.50,
                to: 0.75,
                name: '50-75%',
                color: '#fefa11'
              },
              {
                from: 0.75,
                to: 1,
                name: '75-100%',
                color: '#ff0000'
              }
            ],
          }
        }
      },
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
        }
      },
      xaxis: {
        labels: {
          show: false,
        }
      },
      tooltip: {
        enabled: false,
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
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = '' + (i + 1).toString();
        var y = Math.random();


        series.push({
          x: x,
          y: y 
        });
        i++;
      }
      return series;
    }

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
