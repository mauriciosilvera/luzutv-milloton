import React from 'react';
import './ResultsCard.css';

function ResultsCard(props) {
  const { name, votes } = props;

  return (
    <div className="resultsCardWrapper">
      <span className="questionName">{name}</span>
      <div className="percentageBar" />
      <span className="questionVotes">{`Votos: ${votes}`}</span>
    </div>
  );
}

export default ResultsCard;
