import React, { useState, useEffect } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components';
import { getPollById } from '../../util/Requests';
import BarGraph from './Components/BarGraph';
import './PollResults.css';

function PollResults() {
  const { pollId } = useParams();
  const [pollData, setPollData] = useState();
  const [graphData, setGraphData] = useState();
  const mediaQueryMatches = useMediaQuery('(min-width:480px)');

  useEffect(() => {
    getPollById(pollId).then((poll) => {
      setPollData(poll);
    });
  }, [pollId]);

  useEffect(() => {
    const newGraphData = pollData?.answers?.map((answer) => ({
      voteCount: answer?.voteCount,
      mobileDisplay:
        answer?.answer_name.length > 4
          ? `${answer?.answer_name.slice(0, 3)}..`
          : answer?.answer_name,
      desktopDisplay:
        answer?.answer_name.length > 8
          ? `${answer?.answer_name.slice(0, 7)}..`
          : answer?.answer_name
    }));
    setGraphData(newGraphData);
  }, [pollData]);

  const buildTooltip = (answer) => (
    <div
      style={{
        padding: 12,
        color: '#fff',
        background: '#222222'
      }}
    >
      <strong
        style={{
          fontSize: '14px'
        }}
      >
        {answer?.desktopDisplay}: {answer?.voteCount}
      </strong>
    </div>
  );

  const totalVotes = pollData?.answers?.reduce(
    (accumulator, option) => accumulator + option.voteCount,
    0
  );

  return (
    <div className="pollResultsWrapper">
      {!graphData && <LoadingSpinner />}

      {graphData && (
        <>
          <div className="resultsTitleBox">
            <div className="resultsTitle">
              <h2 className="white">{pollData?.question_name}</h2>
            </div>
            <Typography
              variant="body2"
              className="votesCount white"
            >{`Votos Totales: ${totalVotes}`}</Typography>
          </div>
          <h2 className="title">Resultados</h2>
          {totalVotes !== 0 ? (
            <BarGraph
              data={graphData}
              tooltip={buildTooltip}
              isInMobile={!mediaQueryMatches}
            />
          ) : (
            <div className="pollWithoutVotesMessage">
              Esta encuesta aún no ha recibido votos.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PollResults;
