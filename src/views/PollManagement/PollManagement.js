import React, { useEffect } from 'react';
import {
  Collapse,
  Box,
  CircularProgress,
  IconButton,
  Button,
  TextField
} from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  allPollsPost,
  deletePoll,
  getActivePoll,
  pollPut,
  pollPost
} from '../../util/Requests';
import PollCard from '../../components/PollCard/PollCard';
import './PollManagement.css';

function PollManagement() {
  const [openEmission, setOpenEmission] = React.useState(true);
  const [data, setData] = React.useState();
  const [updated, setUpdated] = React.useState(false);
  const [activePoll, setActivePoll] = React.useState();
  const [isActive, setIsActive] = React.useState();
  const [edit, setEdit] = React.useState();
  const [deleteEmission, setDeleteEmission] = React.useState();
  const [emissionName, setEmissionName] = React.useState();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [add, setAdd] = React.useState(false);

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

  const handleEditEmission = (emission, e) => {
    setEdit(emission?._id);
    setEmissionName(emission?.emission_name);
    e?.stopPropagation();
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

  const handleClickOpen = (id, e) => {
    e.stopPropagation();

    setDeleteEmission(id);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleAcceptDelete = () => {
    const reqData = [
      {
        emission: {
          id: deleteEmission
        }
      }
    ];

    deletePoll(reqData);
    setOpenDeleteDialog(false);
    setUpdated(true);
  };

  const handleAddEmission = (name) => {
    const reqData = [
      {
        emission: {
          emission_name: name
        }
      }
    ];

    pollPost(reqData);
    setAdd(false);
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
                    <IconButton
                      onClick={(e) => handleClickOpen(emission?._id, e)}
                    >
                      <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <Dialog
                      open={openDeleteDialog}
                      onClose={handleCancelDelete}
                      onClick={(e) => e.stopPropagation()}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Confirmar eliminado.
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Eliminar la emisión borrará también las preguntas que
                          tenga dicha emisión, deseas continuar de igual manera?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleCancelDelete()}>
                          Cancelar
                        </Button>
                        <Button onClick={() => handleAcceptDelete()} autoFocus>
                          Aceptar
                        </Button>
                      </DialogActions>
                    </Dialog>
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
                            onClick={(e) => handleDeletePoll(question?._id, e)}
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
          {add ? (
            <div className="editContainer">
              <TextField
                sx={{ width: '320px', fontSize: '20px' }}
                id="standard-basic"
                label="Nueva emisión"
                variant="standard"
                onChange={(e) => setEmissionName(e.target.value)}
              />
              <IconButton onClick={handleAddEmission(emissionName)}>
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={() => setAdd(false)}>
                <ClearIcon sx={{ color: 'red' }} />
              </IconButton>
            </div>
          ) : (
            <div className="addEmissionButton" onClick={() => setAdd(true)}>
              <Add />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PollManagement;
