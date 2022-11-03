import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getPollById, allPollsPost } from '../../util/Requests';
import { LoadingSpinner } from '../../components';
import './PollResults.css';
import BarGraph from './Components/BarGraph';

function PollResults() {
  const [data, setData] = useState();
  const [viewPolls, setViewPolls] = useState(true);
  const [selectedPoll, setSelectedPoll] = useState();
  const [pollData, setPollData] = useState();
  const [graphData, setGraphData] = useState();
  const mediaQueryMatches = useMediaQuery('(min-width:480px)');

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
        {answer?.desktopDisplay}: {answer?.voteCount}
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
                    <div key={group?._id} className="pollCard">
                      <div
                        className="pollCardWrapper"
                        onClick={() => handleOpenResults(group?._id)}
                      >
                        <span className="pollCardTitle">
                          {group?.group_name}
                        </span>
                      </div>
                    </div>
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
            <div className="resultsTitleBox">
              <h2 className="white">{pollData?.question_name}</h2>

              <Typography
                variant="body2"
                className="votesCount white"
              >{`Votos Totales: ${totalVotes}`}</Typography>
            </div>
            <div />
          </div>
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
        </div>
      )}
    </div>
  );
}

export default PollResults;
