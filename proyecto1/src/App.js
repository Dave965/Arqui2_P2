import React, { useState } from "react";
import HomePage from "./screens/HomePage";
import Modal from "./screens/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (roomName) => {
    setSelectedRoom(roomName);
    setShowModal(true);
  };

  return (
    <div>
      <HomePage onRoomClick={handleRoomClick} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)} roomName={selectedRoom}>
       
        </Modal>
      )}
    </div>
  );
}

export default App;
