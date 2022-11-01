import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box, CircularProgress } from '@mui/material';
import { allPollsPostWithoutGroups, getPollById } from '../../util/Requests';
import './PollResults.css';

function PollResults() {
  const [data, setData] = useState();
  const [viewPolls, setViewPolls] = useState(true);
  const [selectedPoll, setSelectedPoll] = useState();
  const [pollData, setPollData] = useState();

  useEffect(() => {
    allPollsPostWithoutGroups().then((polls) => {
      setData(polls);
    });
  }, []);

  useEffect(() => {
    getPollById(selectedPoll).then((poll) => {
      setPollData(poll);
    });
  }, [selectedPoll]);

  const handleOpenResults = (id) => {
    setSelectedPoll(id);
    setViewPolls(!viewPolls);
  };

  const totalVotes = pollData?.answers?.reduce(
    (accumulator, option) => accumulator + option.voteCount,
    0
  );

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
        {answer?.option}: {answer?.voteCount}
      </strong>
    </div>
  );

  const handleBackwards = () => {
    setViewPolls(!viewPolls);
  };

  return (
    <div className="pollResultsWrapper">
      {viewPolls && (
        <div className="pollResultsWrapper">
          <h1 className="title">Resultados</h1>
          <div className="pollsWrapper">
            {data?.map((question) => (
              <div key={question?._id} className="pollCard">
                <div
                  className="pollCardWrapper"
                  onClick={() => handleOpenResults(question?._id)}
                >
                  <span className="pollCardTitle">
                    {question?.question_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!pollData && !viewPolls && (
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

      {pollData && !viewPolls && (
        <div className="graphResultsWrapper">
          <div className="pollResultsTitle">
            <IconButton onClick={handleBackwards}>
              <ArrowBackIcon sx={{ fontSize: '40px' }} />
            </IconButton>
            <div className="pollResultsTitleBox">
              <h2 className="white">{pollData?.question_name}</h2>
            </div>
            <div />
          </div>

          {totalVotes !== 0 ? (
            <div style={{ height: '70%', width: '70%' }}>
              <ResponsiveBar
                data={pollData?.answers}
                keys={['voteCount']}
                indexBy="answer_name"
                margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                minValue="0"
                padding={0.2}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'pastel1' }}
                tooltip={(info) => buildTooltip(info?.data)}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 10,
                  tickRotation: 0,
                  legendPosition: 'middle',
                  legendOffset: 0
                }}
              />
            </div>
          ) : (
            <div className="pollWithoutVotesMessage">
              Esta encuesta aún no ha recibido votos.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PollResults;
