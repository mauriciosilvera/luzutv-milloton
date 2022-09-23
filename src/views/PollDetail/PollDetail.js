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
import { mockEmissions } from '../../util';
import { pollPost, getPollById } from '../../util/Requests';

function PollDetail() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [selectedPoll, setSelectedPoll] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedEmission, setSelectedEmission] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('');

  useEffect(() => {
    getPollById(pollId).then((poll) => {
      setSelectedPoll(poll);
    });
  }, [pollId]);

  useEffect(() => {
    if (selectedPoll) {
      setSelectedEmission(selectedPoll?.emission_id);
      setSelectedQuestion(selectedPoll?.question_name);
      setSelectedOptions(selectedPoll?.answers);
      setIsActive(selectedPoll?.is_active);
    }
  }, [selectedPoll]);

  const handleAddfields = () => {
    setSelectedOptions([
      ...selectedOptions,
      { id: selectedOptions.length, answer_name: '' }
    ]);

    console.log(selectedOptions);
  };

  const handleChangeOption = (id, e) => {
    e.preventDefault();
    const newValue = {
      ...selectedOptions[id],
      answer_name: e.currentTarget.value
    };
    setSelectedOptions(...selectedOptions, (selectedOptions[id] = newValue));
    console.log(selectedOptions);
  };

  const handleDeleteOption = (e) => {
    const values = [...selectedOptions];
    if (values.length > 2) {
      values.splice(
        values.findIndex((value) => value.id === e.target.value),
        1
      );
      setSelectedOptions(values);
    }
  };

  const handleSubmit = (event) => {
    const data = [
      {
        emission: selectedEmission
      },
      {
        question: {
          question_name: selectedQuestion,
          date: '1663786397915',
          end_time: '2022-09-21',
          start_time: '2022-09-20T19:00:00.000Z',
          is_active: false
        }
      },
      {
        answers: selectedOptions
      }
    ];
    event.preventDefault();
    pollPost(data);
    navigate('/admin/polls-management');
  };

  const handleSelectChange = (e) => {
    setSelectedEmission(e.target.value);
  };

  const handleQuestion = (e) => {
    setSelectedQuestion(e.target.value);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleActivate = (e) => {
    e.preventDefault();

    setIsActive(!isActive);
  };

  return (
    <div className="pollDetailWrapper">
      {selectedPoll.length === 0 && (
        <div className="loadingState">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      )}

      {selectedPoll.length !== 0 && (
        <div className="pollFormBox">
          <form className="pollForm" onSubmit={handleSubmit}>
            <div className="pollTitleBox">
              <h2 className="title">{`${
                selectedPoll ? selectedPoll.question_name : 'Nueva encuesta'
              }`}</h2>
              {selectedPoll && (
                <IconButton onClick={handleEditMode}>
                  <EditIcon className="pollIcon" />
                </IconButton>
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
                value={selectedEmission.emission_name}
                required
                renderValue={(selected) => {
                  if (selectedEmission && !selected) {
                    return <em>{selectedEmission.emission_name}</em>;
                  }
                  return selected;
                }}
              >
                {mockEmissions?.map((emission) => (
                  <MenuItem
                    key={emission.id}
                    value={emission.name}
                    size="small"
                  >
                    {emission.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            <label htmlFor="pollQuestion" className="pollLabel">
              Pregunta
            </label>
            {selectedPoll && !isEditMode ? (
              <Typography variant="h6" className="selectedValue">
                {selectedPoll.question_name}
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
                  <>
                    <label htmlFor="option" className="pollLabel">
                      Opción {id + 1}
                    </label>
                    <Typography variant="h6" className="selectedValue">
                      {option.answer_name}
                    </Typography>
                  </>
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
                        onChange={(e) => handleChangeOption(id, e)}
                        required
                        defaultValue={option.answer_name}
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
                    onClick={handleAddfields}
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
                  {isActive ? 'Terminar encuesta' : 'Activar encuestas'}
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
