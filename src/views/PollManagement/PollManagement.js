import React, { useEffect } from 'react';
import { Box, CircularProgress, IconButton, Button } from '@mui/material';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import {
  allPollsPost,
  deletePoll,
  getActivePoll,
  pollPut
} from '../../util/Requests';
import PollCard from '../../components/PollCard/PollCard';
import './PollManagement.css';

function PollManagement() {
  const [data, setData] = React.useState();
  const [updated, setUpdated] = React.useState(false);
  const [activePoll, setActivePoll] = React.useState();
  const [isActive, setIsActive] = React.useState();

  useEffect(() => {
    allPollsPost().then((polls) => {
      setData(polls);
    });

    getActivePoll().then((poll) => {
      setActivePoll(poll);
    });
  }, []);

  useEffect(() => {
    if (updated) {
      allPollsPost().then((polls) => {
        setData(polls);
      });
      setUpdated(false);
    }
  }, [updated]);

  useEffect(() => {
    if (activePoll) {
      setIsActive(activePoll?.[0]?.is_active);
    }
  }, [activePoll]);

  const handleDeletePoll = (questionId, e) => {
    e?.stopPropagation();
    const reqData = [
      {
        question: {
          id: questionId
        }
      }
    ];
    deletePoll(reqData);
    setUpdated(true);
  };

  const handleActivate = (e) => {
    e.preventDefault();

    const reqData = [
      {
        question: {
          id: activePoll?.[0]._id,
          is_active: !isActive
        }
      }
    ];
    setIsActive(!isActive);
    pollPut(reqData);
  };

  return (
    <div
      className={`pollManagementWrapper ${
        !activePoll && !data ? 'loading' : ''
      }`}
    >
      {!activePoll && !data && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {isActive && (
        <>
          <h1 className="pollTitle">Encuesta activa</h1>
          <div key={activePoll[0]._id} className="activePollCard">
            <PollCard activePoll question={activePoll[0]} />
            <Button
              onClick={handleActivate}
              size="small"
              className="pollButton"
              type="submit"
              variant="outlined"
              color="error"
            >
              Finalizar encuesta activa
            </Button>
          </div>
        </>
      )}
      {data && (
        <>
          <h1 className="pollTitle">Encuestas</h1>
          <div className="searchContainer">
            <input type="text" placeholder="Buscar.." className="search" />
          </div>
          <div className="pollsWrapper">
            {data?.map((emission) =>
              emission?.questions?.map((question) => (
                <div key={question?._id} className="pollCard">
                  <PollCard question={question} />
                  <IconButton
                    onClick={(e) => handleDeletePoll(question?._id, e)}
                    value={question?._id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            )}
            <PollCard create />
          </div>
        </>
      )}
    </div>
  );
}

export default PollManagement;
