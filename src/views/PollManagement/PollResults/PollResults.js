import React from 'react';
import './PollResults.css';

function PollResults() {
  return (
    <div className="pollResultsWrapper">
      <div className="titleBox">
        <p className="title">Titulo de prueba</p>
        <p className="title">100%</p>
      </div>
      <div className="progressBar" />
      <div className="votes"> 29 votes </div>
    </div>
  );
}

export default PollResults;
