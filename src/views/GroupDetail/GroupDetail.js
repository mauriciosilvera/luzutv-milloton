import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import './GroupDetail.css';
import { useParams, Link } from 'react-router-dom';
import { ResponsiveBar } from '@nivo/bar';
import { calculateVotes } from '../../util/Requests';
// import ResultsCard from '../../components/ResultsCard/ResultsCard';

function GroupDetail() {
  const { groupId } = useParams();
  const [votesData, setVotesData] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const globalResults = [];

  useEffect(() => {
    const ApiBody = {
      group_id: [groupId]
    };
    calculateVotes(ApiBody).then((votes) => {
      setVotesData(votes);
    });
  }, [groupId]);

  useEffect(() => {
    votesData?.votes?.answerVotesPercentage?.map((row, i) => {
      const answerCount = `answer_${i + 1}_count`;
      globalResults.push({
        name: `Opción ${i + 1}`,
        votes: row[answerCount]
      });
      return globalResults;
    });
  }, [globalResults, votesData?.votes?.answerVotesPercentage]);

  return (
    <div className="groupDetailWrapper">
      {!votesData && !globalResults && (
        <div className="loadingState">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}

      {votesData && globalResults && (
        <>
          <div className="groupTitleBox">
            <h1 className="title white"> {votesData?.group?.group_name}</h1>
            <Typography
              variant="body2"
              sx={{ color: 'white', paddingBottom: '10px' }}
            >{`Votos Totales: ${votesData?.votes?.totalVotes}`}</Typography>
          </div>
          <h2 className="title">Resultados totales</h2>
          <div className="globalResultsGraphContainer">
            <ResponsiveBar
              data={globalResults}
              keys={['votes']}
              indexBy="name"
              margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
              minValue="0"
              padding={0.4}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'pastel1' }}
              labelSkipHeight={1}
            />
          </div>
          <h2 className="title">Resultados individuales</h2>
          <div className="linksContainer">
            {votesData?.polls?.map((poll) => (
              <Link to={`/admin/poll-details/${poll._id}`}>
                <h3 className="linkToPoll">{poll.question_name}</h3>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GroupDetail;
