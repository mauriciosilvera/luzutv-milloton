import React, { useEffect } from 'react';
import {
  Collapse,
  Box,
  CircularProgress,
  IconButton,
  Button,
  TextField
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
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
  const [edit, setEdit] = React.useState();
  const [emissionName, setEmissionName] = React.useState();

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

  const handleEditEmission = (emission, e) => {
    setEdit(emission?._id);
    setEmissionName(emission?.emission_name);
    e.stopPropagation();
  };

  const handleAcceptEdit = (id, name, e) => {
    e?.stopPropagation();
    const reqData = [
      {
        emission: {
          id,
          emission_name: name
        }
      }
    ];

    pollPut(reqData);
    setEdit(false);
    setUpdated(true);
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
          {data?.map((emission) => {
            if (edit === emission?._id) {
              return (
                <div key={emission?._id} className="editContainer">
                  <TextField
                    sx={{ width: '320px', fontSize: '20px' }}
                    id="standard-basic"
                    variant="standard"
                    className="editInput"
                    value={emissionName}
                    onChange={(e) => setEmissionName(e.target.value)}
                  />
                  <IconButton
                    onClick={() => handleAcceptEdit(emission._id, emissionName)}
                  >
                    <CheckIcon sx={{ color: 'green' }} />
                  </IconButton>
                  <IconButton onClick={() => setEdit(undefined)}>
                    <ClearIcon sx={{ color: 'red' }} />
                  </IconButton>
                </div>
              );
            }
            return (
              <div
                key={emission?._id}
                className="emissionContainer"
                onClick={() =>
                  setOpenEmission(openEmission === emission ? '' : emission)
                }
              >
                <div className="emissionTitle">
                  <div>
                    <span>{emission?.emission_name}</span>
                    <IconButton
                      onClick={(e) => handleEditEmission(emission, e)}
                    >
                      <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                  </div>
                  <span>
                    {openEmission === emission ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
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
                        <div key={question?._id} className="pollCard">
                          <PollCard question={question} />
                          <IconButton
                            onClick={handleDeletePoll}
                            value={question?._id}
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
            );
          })}
        </>
      )}
    </div>
  );
}

export default PollManagement;
