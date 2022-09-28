/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { Collapse, Box, CircularProgress, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import PollCard from '../../components/PollCard/PollCard';
import { allPollsPost, deletePoll, getActivePoll } from '../../util/Requests';
import './PollManagement.css';

function PollManagement() {
  const [openEmission, setOpenEmission] = React.useState(true);
  const [data, setData] = React.useState();
  const [updated, setUpdated] = React.useState(false);
  const [activePoll, setActivePoll] = React.useState();

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

  const handleDeletePoll = (e) => {
    e?.stopPropagation();
    deletePoll(e?.currentTarget?.value);
    setUpdated(true);
  };

  return (
    <div className="pollManagementWrapper">
      <h2 className="pollTitle">Encuesta activa</h2>
      {activePoll === undefined && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {activePoll && activePoll?.length ? (
        <div key={activePoll[0]._id} className="pollCard">
          <PollCard activePoll question={activePoll[0]} />
        </div>
      ) : (
        <span style={{ display: `${!activePoll ? 'none' : 'inline'}` }}>
          En este momento no hay encuestas activas.
        </span>
      )}
      {/* {data?.map((emission) =>
        emission.questions.map((question) => {
          if (question.is_active) {
            return (
              <div key={question._id} className="pollCard">
                <PollCard activePoll question={question} />
              </div>
            );
          }
        })
      )} */}

      <h2 className="pollTitle">Encuestas</h2>
      {data === undefined && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {data?.map((emission) => (
        <div
          key={emission?._id}
          className="emissionContainer"
          onClick={() =>
            setOpenEmission(openEmission === emission ? '' : emission)
          }
        >
          <div className="emissionTitle">
            <span>{emission?.emission_name}</span>
            <span>
              {openEmission === emission ? <ExpandLess /> : <ExpandMore />}
            </span>
          </div>
          <Collapse in={openEmission === emission} timeout="auto" unmountOnExit>
            <div className="pollsContainer">
              {emission?.questions?.length > 0 ? (
                emission?.questions?.map((question) => (
                  <div key={question._id} className="pollCard">
                    <PollCard question={question} />
                    <IconButton onClick={handleDeletePoll} value={question._id}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))
              ) : (
                <div className="emptyPollsContainer">
                  No se encontraron encuestas para esta emisión
                </div>
              )}
              <PollCard create />
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default PollManagement;
