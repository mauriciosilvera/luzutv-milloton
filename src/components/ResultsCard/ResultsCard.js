import React from 'react';
import './ResultsCard.css';

function ResultsCard(props) {
  const { name, votes, percentage } = props;

  return (
    <div className="resultsCardWrapper">
      <span className="questionName">{name}</span>
      <div className="percentageBar" />
      <div className="votesResults">
        <span className="questionVotes">{`Votos: ${votes}`}</span>
        {percentage && (
          <span className="questionVotes">{`${percentage}%`}</span>
        )}
      </div>
    </div>
  );
}

export default ResultsCard;
