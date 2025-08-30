import React from "react";
import "./Alert.css";

function CustomAlert({ message, type, onClose }) {
  return (
    <div className={`alert-box ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
}

export default CustomAlert;
