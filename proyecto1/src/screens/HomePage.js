import React from "react";

import "./HomePage.css";

const HomePage = ({ onRoomClick }) => {
  const handleRoomClick = (roomName) => {
    onRoomClick(roomName);
  };

  return (
    <div className="home-page">
      <h1 className="title">Dashboard Inicial</h1>
      <div className="container">
        <div className="column">
          <div className="box small-box" onClick={() => handleRoomClick("Habitación 1")}>
            <div className="name">Habitación 1</div>
            <div className="number">0</div>
          </div>

          <div className="box small-box" onClick={() => handleRoomClick("Habitación 2")}>
            <div className="name">Habitación 2</div>
            <div className="number">0</div>
          </div>

          <div className="box small-box" onClick={() => handleRoomClick("Habitación 3")}>
            <div className="name">Habitación 3</div>
            <div className="number">0</div>
          </div>
        </div>
        <div className="column">
          <div className="box large-box" onClick={() => handleRoomClick("Habitación 4")}>
            <div className="name">Habitación 4</div>
            <div className="number">0</div>
          </div>
          <div className="box large-box" onClick={() => handleRoomClick("Habitación 5")}>
            <div className="name">Habitación 5</div>
            <div className="number">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
