import React, { useEffect } from 'react';
import {
  Collapse,
  Box,
  CircularProgress,
  IconButton,
  Button
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import PollCard from '../../components/PollCard/PollCard';
import {
  allPollsPost,
  deletePoll,
  getActivePoll,
  pollPut
} from '../../util/Requests';
import './PollManagement.css';

function PollManagement() {
  const [openEmission, setOpenEmission] = React.useState(true);
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

  const handleDeletePoll = (e) => {
    e?.stopPropagation();
    deletePoll(e?.currentTarget?.value);
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
          <h2 className="pollTitle">Encuesta activa</h2>
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
          <h2 className="pollTitle">Encuestas</h2>
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
              <Collapse
                in={openEmission === emission}
                timeout="auto"
                unmountOnExit
              >
                <div className="pollsContainer">
                  {emission?.questions?.length > 0 ? (
                    emission?.questions?.map((question) => (
                      <div key={question._id} className="pollCard">
                        <PollCard question={question} />
                        <IconButton
                          onClick={handleDeletePoll}
                          value={question._id}
                        >
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
        </>
      )}
    </div>
  );
}

export default PollManagement;
