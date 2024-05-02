import React from "react";
import "./HomePage.css";
import Swal from 'sweetalert2' 
import compassImage from '../BRUJULA.png';

const HomePage = ({ onRoomClick }) => {
  const showAlert = () => {
    Swal.fire({
      title: 'Mueve la cámara a la habitación y presiona aceptar',
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cámara movida!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Cambio cancelado', '', 'info');
      }
    });
  };

  const handleModalOpen = (roomName) => {
    onRoomClick(roomName);
  };

  return (
    <div className="home-page">
      <div className="sidebar">
        <h3 className="sidebar-title">Habitaciones</h3>
        <button onClick={() => showAlert("Habitación 1")}>Habitación 1</button>
        <button onClick={() => showAlert("Habitación 2")}>Habitación 2</button>
        <button onClick={() => showAlert("Habitación 3")}>Habitación 3</button>
        <button onClick={() => showAlert("Habitación 4")}>Habitación 4</button>
        <button onClick={() => showAlert("Habitación 5")}>Habitación 5</button>
      </div>
      <img src={compassImage} alt="Compass" className="compass-img"/>
      <div className="caja">
        <div className="caja2">
          <div className="caja3">
            <h1 className="title">Dashboard Inicial</h1>
            <div className="container">
              <div className="column">
                <div
                  className="box small-box"
                  onClick={() => handleModalOpen("Habitación 1")}
                >
                  <div className="name">Habitación 1</div>
                  <div className="number">0</div>
                </div>
                <div
                  className="box small-box"
                  onClick={() => handleModalOpen("Habitación 2")}
                >
                  <div className="name">Habitación 2</div>
                  <div className="number">0</div>
                </div>
                <div
                  className="box small-box"
                  onClick={() => handleModalOpen("Habitación 3")}
                >
                  <div className="name">Habitación 3</div>
                  <div className="number">0</div>
                </div>
              </div>
              <div className="column">
                <div
                  className="box large-box"
                  onClick={() => handleModalOpen("Habitación 4")}
                >
                  <div className="name">Habitación 4</div>
                  <div className="number">0</div>
                </div>
                <div
                  className="box large-box"
                  onClick={() => handleModalOpen("Habitación 5")}
                >
                  <div className="name">Habitación 5</div>
                  <div className="number">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
