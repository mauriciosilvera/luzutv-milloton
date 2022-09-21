import React from 'react';
import './PollOption.css';
import { BsCircle as Icon } from 'react-icons/bs';

function PollOption() {
  return (
    <div className="pollOptionWrapper">
      <div className="titleBox">
        <Icon />
        <p className="title">Prueba respuesta</p>
      </div>
    </div>
  );
}

export default PollOption;
