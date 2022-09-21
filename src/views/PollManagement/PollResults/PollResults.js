import React from 'react';
import './PollResults.css';
import { BsCircle as Icon } from 'react-icons/bs';

function PollResults() {
  return (
    <div className="pollResultsWrapper">
      <div className="titleBox">
        <Icon />
        <p className="title">Prueba respuesta</p>
      </div>
    </div>
  );
}

export default PollResults;
