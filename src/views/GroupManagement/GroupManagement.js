import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import {
  allPollsPost,
  deletePoll,
  pollPut,
  pollPost
} from '../../util/Requests';
import PollCard from '../../components/PollCard/PollCard';
import './GroupManagement.css';

function GroupManagement() {
  const [openGroup, setOpenGroup] = useState(true);
  const [data, setData] = useState();
  const [updated, setUpdated] = useState(false);
  const [edit, setEdit] = useState();
  const [deleteGroup, setDeleteGroup] = useState();
  const [groupName, setGroupName] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    allPollsPost().then((polls) => {
      setData(polls);
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

  const handleEditGroup = (group, e) => {
    setEdit(group?._id);
    setGroupName(group?.group_name);
    e?.stopPropagation();
  };

  const handleAcceptEdit = async (id, name, e) => {
    e?.stopPropagation();
    const reqData = [
      {
        group: {
          id,
          group_name: name
        }
      }
    ];

    await pollPut(reqData);
    setEdit(false);
    setUpdated(true);
  };

  const handleClickOpen = (id, e) => {
    e?.stopPropagation();

    setDeleteGroup(id);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleAcceptDelete = async () => {
    const reqData = [
      {
        group: {
          id: deleteGroup
        }
      }
    ];

    await deletePoll(reqData);
    setOpenDeleteDialog(false);
    setUpdated(true);
  };

  const handleAddEmission = async (name) => {
    const reqData = [
      {
        group: {
          group_name: name
        }
      }
    ];

    await pollPost(reqData);
    setAdd(false);
    setUpdated(true);
  };

  return (
    <div className={`pollManagementWrapper ${!data ? 'loading' : ''}`}>
      {!data && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}

      {data && (
        <>
          <h1 className="groupTitle">Grupos</h1>
          {data?.map((group) => {
            if (edit === group?._id) {
              return (
                <div key={group?._id} className="editContainer">
                  <TextField
                    sx={{ width: '320px', fontSize: '20px' }}
                    id="standard-basic"
                    variant="standard"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                  <IconButton
                    onClick={() => handleAcceptEdit(group._id, groupName)}
                  >
                    <CheckIcon sx={{ color: 'green' }} />
                  </IconButton>
                  <IconButton onClick={() => setEdit(undefined)}>
                    <ClearIcon sx={{ color: 'red' }} />
                  </IconButton>
                </div>
              );
            }
            if (group?.group_name !== 'Sin Agrupar') {
              return (
                <div
                  key={group?._id}
                  className="groupContainer"
                  onClick={() => setOpenGroup(openGroup === group ? '' : group)}
                >
                  <div className="groupName">
                    <div>
                      <Link
                        className="groupLink"
                        to={`/admin/group-details/${group?._id}`}
                      >
                        <span>{group?.group_name}</span>
                      </Link>
                      <IconButton onClick={(e) => handleEditGroup(group, e)}>
                        <EditIcon sx={{ fontSize: '20px' }} />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleClickOpen(group?._id, e)}
                      >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                      </IconButton>
                      <Dialog
                        open={openDeleteDialog}
                        onClose={handleCancelDelete}
                        onClick={(e) => e?.stopPropagation()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          Confirmar eliminado.
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Eliminar la emisión borrará también las preguntas
                            que tenga dicha emisión, deseas continuar de igual
                            manera?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancelDelete}>Cancelar</Button>
                          <Button onClick={handleAcceptDelete} autoFocus>
                            Aceptar
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    <span>
                      {openGroup === group ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  </div>
                  <Collapse
                    in={openGroup === group}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="pollsContainer">
                      {group?.questions?.length > 0 ? (
                        group?.questions?.map((question) => (
                          <div key={question?._id} className="pollCard">
                            <PollCard question={question} />
                            <IconButton
                              onClick={(e) =>
                                handleDeletePoll(question?._id, e)
                              }
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
            }
            return null;
          })}
          {add ? (
            <div className="editContainer">
              <TextField
                sx={{ width: '320px', fontSize: '20px' }}
                id="standard-basic"
                label="Nuevo grupo"
                variant="standard"
                onChange={(e) => setGroupName(e.target.value)}
              />
              <IconButton onClick={() => handleAddEmission(groupName)}>
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={() => setAdd(false)}>
                <ClearIcon sx={{ color: 'red' }} />
              </IconButton>
            </div>
          ) : (
            <div className="addGroupButton" onClick={() => setAdd(true)}>
              <Add />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GroupManagement;
