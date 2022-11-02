import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { getPollById, allPollsPost } from '../../util/Requests';
import { LoadingSpinner } from '../../components';
import './PollResults.css';

function PollResults() {
  const [data, setData] = useState();
  const [viewPolls, setViewPolls] = useState(true);
  const [selectedPoll, setSelectedPoll] = useState();
  const [pollData, setPollData] = useState();

  useEffect(() => {
    allPollsPost().then((polls) => {
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
        {answer?.answer_name}: {answer?.voteCount}
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
          <h2 className="title">Encuestas</h2>
          <div className="pollsWrapper">
            {data?.map((group) => (
              <div className="pollsWrapper" key={group?._id}>
                {group?.questions?.map((question) => (
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
            ))}
          </div>

          <h2 className="title">Grupos</h2>
          <div className="pollsWrapper">
            {data?.map((group) => (
              <div className="pollsWrapper" key={group?._id}>
                {group?.group_name !== 'Sin Agrupar' ? (
                  <Link to={`/admin/group-details/${group?._id}`}>
                    <h3 className="linkToPoll">{group?.group_name}</h3>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {!pollData && !viewPolls && <LoadingSpinner />}

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
