import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './PollDetail.css';
import {
  Button,
  MenuItem,
  Select,
  IconButton,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import { MdModeEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import {
  pollPost,
  getPollById,
  getEmissions,
  pollPut
} from '../../util/Requests';

function PollDetail() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [selectedPoll, setSelectedPoll] = useState('');
  const [emissions, setEmissions] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedEmission, setSelectedEmission] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([
    { id: 0, answer_name: '' },
    { id: 1, answer_name: '' }
  ]);

  useEffect(() => {
    let mounted = true;
    getEmissions().then((emissionsData) => {
      setEmissions(emissionsData);
    });
    if (pollId !== 'new' && mounted) {
      getPollById(pollId).then((poll) => {
        setSelectedPoll(poll);
      });
    }
    return () => {
      mounted = false;
    };
  }, [pollId]);

  useEffect(() => {
    if (selectedPoll) {
      setSelectedEmission(selectedPoll?.emission_id);
      setSelectedQuestion(selectedPoll?.question_name);
      setSelectedOptions(selectedPoll?.answers);
      setIsActive(selectedPoll?.is_active);
    }
  }, [selectedPoll]);

  const handleAddOption = () => {
    setSelectedOptions([
      ...selectedOptions,
      { id: selectedOptions?.length, answer_name: '' }
    ]);
  };

  const handleChangeOption = (id, e) => {
    e.preventDefault();

    const newArray = selectedOptions.map((option) => {
      if (option._id === id || option.id === id) {
        return { ...option, answer_name: e?.currentTarget?.value };
      }
      return option;
    });
    setSelectedOptions(newArray);
  };

  const handleDeleteOption = (e) => {
    const values = [...selectedOptions];
    if (values?.length > 2) {
      values.splice(
        values.findIndex((value) => value?.id === e?.target?.value),
        1
      );
      setSelectedOptions(values);
    }
  };

  const handleSelectChange = (e) => {
    e.preventDefault();

    setSelectedEmission(e.target.value);
  };

  const handleQuestion = (e) => {
    e.preventDefault();

    setSelectedQuestion(e.target.value);
  };

  const handleEditMode = (e) => {
    e.preventDefault();

    setIsEditMode(!isEditMode);
  };

  const handleActivate = (e) => {
    e.preventDefault();
    setIsActive(!isActive);

    const data = [
      {
        question: {
          id: selectedPoll._id,
          question_name: selectedQuestion,
          is_active: !isActive
        }
      }
    ];

    pollPut(data);
  };

  const handleSubmit = (e) => {
    const postData = [
      {
        emission: selectedEmission
      },
      {
        question: {
          question_name: selectedQuestion,
          is_active: isActive
        }
      },
      {
        answers: selectedOptions
      }
    ];

    const putData = [
      {
        question: {
          id: selectedPoll?._id,
          question_name: selectedQuestion
        }
      },
      {
        answers: selectedOptions.map((option) => ({
          ...option,
          id: option._id
        }))
      }
    ];

    e?.preventDefault();

    console.log(putData, selectedOptions);
    if (isEditMode) {
      pollPut(putData);
    } else {
      pollPost(postData);
    }
    navigate('/admin/polls-management');
  };

  const totalVotes = selectedPoll?.answers?.reduce((accumulator, option) => {
    return accumulator + option.voteCount;
  }, 0);

  return (
    <div className="pollDetailWrapper">
      {!selectedPoll && pollId !== 'new' && (
        <div className="loadingState">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {(selectedPoll || pollId === 'new') && (
        <div className="pollFormBox">
          <form className="pollForm" onSubmit={handleSubmit}>
            <div className="pollTitleBox">
              <div className="pollTitle">
                <h2 className="title">{`${
                  selectedPoll ? selectedPoll.question_name : 'Nueva encuesta'
                }`}</h2>
                {selectedPoll && !isActive && (
                  <IconButton onClick={handleEditMode}>
                    <EditIcon className="pollIcon" />
                  </IconButton>
                )}
              </div>
              {selectedPoll && (
                <Typography variant="body2">{`Votos Totales: ${totalVotes}`}</Typography>
              )}
            </div>
            <label htmlFor="live" className="pollLabel">
              Emisión
            </label>
            {selectedPoll && !isEditMode ? (
              <Typography variant="h6" className="selectedValue">
                {selectedPoll?.emission_id?.emission_name}
              </Typography>
            ) : (
              <Select
                onChange={handleSelectChange}
                sx={{ height: '2.4375em' }}
                value={selectedEmission}
                required
                renderValue={(selected) => {
                  if (selectedEmission && !selected) {
                    return <em>{selectedEmission?.emission_name}</em>;
                  }
                  return selected?.emission_name;
                }}
              >
                {emissions?.map((emission) => (
                  <MenuItem key={emission?._id} value={emission} size="small">
                    {emission?.emission_name}
                  </MenuItem>
                ))}
              </Select>
            )}
            <label htmlFor="pollQuestion" className="pollLabel">
              Pregunta
            </label>
            {selectedPoll && !isEditMode ? (
              <Typography variant="h6" className="selectedValue">
                {selectedPoll?.question_name}
              </Typography>
            ) : (
              <TextField
                fullWidth
                size="small"
                id="pollQuestion"
                variant="outlined"
                onChange={handleQuestion}
                defaultValue={selectedQuestion}
                required
              />
            )}
            {selectedPoll && !isEditMode
              ? selectedPoll?.answers?.map((option, id) => (
                  <div key={option?._id} className="OptionContainer">
                    <label htmlFor="option" className="pollLabel">
                      Opción {id + 1}
                    </label>
                    <div className="valueContainer">
                      <Typography variant="h6">
                        {option?.answer_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="voteCount"
                      >{`Votos: ${option?.voteCount}`}</Typography>
                    </div>
                  </div>
                ))
              : selectedOptions?.map((option, id) => (
                  <>
                    <label htmlFor="option" className="pollLabel">
                      Opción {id + 1}
                    </label>
                    <div className="pollOptionBox">
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        onChange={(e) =>
                          handleChangeOption(option?._id ?? option?.id, e)
                        }
                        required
                        defaultValue={option?.answer_name}
                      />
                      {id >= 2 && (
                        <IconButton onClick={handleDeleteOption} value={id}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </>
                ))}

            {(!selectedPoll || isEditMode) && (
              <div className="pollButtonBox">
                <div className="addQuestionBox">
                  <Button
                    size="small"
                    className="pollButton"
                    variant="outlined"
                    onClick={handleAddOption}
                  >
                    Agregar opción
                  </Button>
                </div>

                <Button
                  size="large"
                  className="pollButton"
                  type="submit"
                  variant="outlined"
                >
                  Guardar encuesta
                </Button>
              </div>
            )}

            {selectedPoll && !isEditMode && (
              <div className="activateButton">
                <Button
                  onClick={handleActivate}
                  size="large"
                  className="pollButton"
                  type="submit"
                  variant="outlined"
                  color={isActive ? 'error' : 'success'}
                >
                  {isActive ? 'Terminar encuesta' : 'Activar encuesta'}
                </Button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default PollDetail;
