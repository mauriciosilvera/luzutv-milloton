import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import './GroupDetail.css';
import { useParams } from 'react-router-dom';
import { calculateVotes } from '../../util/Requests';
import ResultsCard from '../../components/ResultsCard/ResultsCard';

function GroupDetail() {
  const { groupId } = useParams();
  const [votesData, setVotesData] = useState();

  useEffect(() => {
    const ApiBody = {
      group_id: [groupId]
    };
    calculateVotes(ApiBody).then((votes) => {
      setVotesData(votes);
    });
  }, [groupId]);

  return (
    <div className="groupDetailWrapper">
      {!votesData && (
        <div className="loadingState">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <div className="groupData">
        <h1 className="title"> {votesData?.group?.group_name}</h1>
        <Typography variant="body2">{`Votos Totales: ${votesData?.votes?.totalVotes}`}</Typography>
      </div>
      <h2 className="title">Resultados totales</h2>
      {votesData && (
        <div className="questionWrapper">
          {votesData?.votes?.answerVotesPercentage?.map((row, i) => {
            const answerCount = `answer_${i + 1}_count`;
            return (
              <ResultsCard
                // eslint-disable-next-line react/no-array-index-key
                key={i + 1}
                name={`Opción ${i + 1}`}
                votes={row[answerCount]}
                percentage={row?.percentage}
              />
            );
          })}
        </div>
      )}
      <h2 className="title">Resultados individuales</h2>
      {votesData?.polls?.map((poll) => (
        <div key={poll._id} className="questionWrapper">
          <h3 className="title">{poll.question_name}</h3>

          {poll.answers.map((answer) => (
            <ResultsCard
              key={answer._id}
              name={answer.answer_name}
              votes={answer.voteCount}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GroupDetail;
