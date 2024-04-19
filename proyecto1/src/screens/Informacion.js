import React from 'react';
import './Informacion.css';
import LinesChart from '../LinesChart';

function Informacion() {
  return (
    <div className="informacion-page">
      <header>
        <h1 className="title">Información</h1>
        <nav>
          <ul>
            <li><a href="#mapa-de-calor">Mapa de Calor</a></li>
            <li><a href="#historico">Histórico</a></li>
          </ul>
        </nav>
      </header>
      <section id="mapa-de-calor" className="section">
        <h2 className="subtitle">Mapa de Calor</h2>
        <h3>Tiempo Real</h3>
        <h3>Contador de Personas</h3>
        <div className="heatmap-container"></div>
      </section>
      <section id="historico" className="section">
        <h2 className="subtitle">Histórico</h2>
        <div className="historico-container">
            <LinesChart/>
        </div>
      </section>
    </div>
  );
}

export default Informacion;
