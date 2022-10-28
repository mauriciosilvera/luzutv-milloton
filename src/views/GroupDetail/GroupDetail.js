import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import './GroupDetail.css';
import { useParams, Link } from 'react-router-dom';
import { ResponsiveBar } from '@nivo/bar';
import { calculateVotes } from '../../util/Requests';

function GroupDetail() {
  const { groupId } = useParams();
  const [votesData, setVotesData] = useState();
  const [globalResults, setGlobalResults] = useState([]);

  useEffect(() => {
    const ApiBody = {
      group_id: [groupId]
    };
    calculateVotes(ApiBody).then((votes) => {
      setVotesData(votes);
    });
  }, [groupId]);

  useEffect(() => {
    if (votesData) {
      const newState = votesData?.votes?.answerVotesPercentage?.map(
        (row, i) => {
          const answerCount = `answer_${i + 1}_count`;
          const newRow = {
            name: `Opción ${i + 1}`,
            votes: row[answerCount]
          };
          return newRow;
        }
      );
      setGlobalResults(newState);
    }
  }, [votesData]);

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
        {answer.name}: {answer.votes}
      </strong>
    </div>
  );

  return (
    <div className="groupDetailWrapper">
      {!votesData && !globalResults && (
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {votesData && globalResults && votesData?.votes?.totalVotes > 0 ? (
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
              tooltip={(data) => buildTooltip(data.data)}
              axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: 'middle',
                legendOffset: 32
              }}
            />
          </div>
          <h2 className="title">Resultados individuales</h2>
          <div className="linksContainer">
            {votesData?.polls?.map((poll) => (
              <Link key={poll?._id} to={`/admin/poll-details/${poll?._id}`}>
                <h3 className="linkToPoll">{poll?.question_name}</h3>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="groupTitleBox">
            <h1 className="title white"> {votesData?.group?.group_name}</h1>
          </div>
          <div className="groupWithoutVotesMessage">
            Este grupo aún no ha recibido votos.
          </div>
        </>
      )}
    </div>
  );
}

export default GroupDetail;
