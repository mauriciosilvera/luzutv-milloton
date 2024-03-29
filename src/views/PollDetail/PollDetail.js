import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './PollDetail.css';
import {
  Button,
  MenuItem,
  Select,
  IconButton,
  Typography
} from '@mui/material';
import { MdModeEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import { LoadingSpinner } from '../../components';
import { pollPost, getPollById, getGroups, pollPut } from '../../util/Requests';

function PollDetail() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [selectedPoll, setSelectedPoll] = useState('');
  const [groups, setGroups] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([
    { _id: 0, answer_name: '' },
    { _id: 1, answer_name: '' }
  ]);

  useEffect(() => {
    let mounted = true;
    getGroups().then((groupsData) => {
      setGroups(groupsData);
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
      setSelectedGroup(selectedPoll?.group_id);
      setSelectedQuestion(selectedPoll?.question_name);
      setSelectedOptions(selectedPoll?.answers);
      setIsActive(selectedPoll?.is_active);
    }
  }, [selectedPoll]);

  const handleAddOption = () => {
    setSelectedOptions([
      ...selectedOptions,
      { _id: selectedOptions?.length, answer_name: '' }
    ]);
  };

  const handleChangeOption = (id, e) => {
    e.preventDefault();

    const newArray = selectedOptions.map((option) => {
      if (option?._id === id || option?.id === id) {
        return { ...option, answer_name: e?.currentTarget?.value };
      }
      return option;
    });
    setSelectedOptions(newArray);
  };

  const handleDeleteOption = (id) => {
    const values = [...selectedOptions];
    if (values?.length > 2) {
      values?.splice(
        values?.findIndex((value) => value?._id === id),
        1
      );
      setSelectedOptions(values);
    }
  };

  const handleSelectChange = (e) => {
    e.preventDefault();

    setSelectedGroup(e?.target?.value);
  };

  const handleQuestion = (e) => {
    e.preventDefault();

    setSelectedQuestion(e?.target?.value);
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
          id: selectedPoll?._id,
          question_name: selectedQuestion,
          is_active: !isActive
        }
      }
    ];

    pollPut(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = [
      {
        question: {
          question_name: selectedQuestion,
          is_active: isActive,
          group_id: selectedGroup?._id
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
          question_name: selectedQuestion,
          group_id: selectedGroup?._id
        },
        answers: selectedOptions?.map((option) => {
          if (option?._id?.length > 10) {
            return { id: option?._id, answer_name: option?.answer_name };
          }
          return { answer_name: option?.answer_name };
        })
      }
    ];

    e?.preventDefault();

    if (isEditMode) {
      await pollPut(putData);
    } else {
      await pollPost(postData);
    }
    navigate('/admin/polls-management');
  };

  const totalVotes = selectedPoll?.answers?.reduce(
    (accumulator, option) => accumulator + option.voteCount,
    0
  );

  return (
    <div className="pollDetailWrapper">
      {!selectedPoll && pollId !== 'new' && <LoadingSpinner />}
      {(selectedPoll || pollId === 'new') && (
        <div className="pollFormBox">
          <form className="pollForm" onSubmit={handleSubmit}>
            <div className="pollTitleBox">
              <div className="pollTitle">
                <h2 className="white">{`${
                  selectedPoll ? selectedPoll?.question_name : 'Nueva encuesta'
                }`}</h2>
                {selectedPoll && !isActive && (
                  <IconButton onClick={handleEditMode} sx={{ color: '#fff' }}>
                    <EditIcon />
                  </IconButton>
                )}
              </div>
              {selectedPoll && (
                <Typography
                  variant="body2"
                  className="votesCount white"
                >{`Votos Totales: ${totalVotes}`}</Typography>
              )}
            </div>
            {selectedPoll && !isEditMode ? (
              <>
                <label htmlFor="live" className="pollLabel">
                  Grupo
                </label>
                <div className="valueContainer">
                  <Typography variant="h6">
                    {selectedPoll?.group_id?.group_name}
                  </Typography>
                </div>
                <label htmlFor="pollQuestion" className="pollLabel">
                  Pregunta
                </label>
                <div className="valueContainer">
                  <Typography variant="h6">
                    {selectedPoll?.question_name}
                  </Typography>
                </div>
                {selectedPoll?.answers?.map((option, id) => (
                  <div key={option?._id} className="OptionContainer">
                    <label htmlFor="option" className="pollLabel">
                      Opción {id + 1}
                    </label>
                    <div className="valueContainer">
                      <Typography variant="h6">
                        {option?.answer_name}
                      </Typography>
                    </div>
                  </div>
                ))}
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
              </>
            ) : (
              <>
                <label htmlFor="live" className="pollLabel">
                  Grupo
                </label>
                <Select
                  onChange={handleSelectChange}
                  sx={{ height: '2.4375em' }}
                  value={selectedGroup}
                  required
                  renderValue={(selected) => {
                    if (selectedGroup && !selected) {
                      return <em>{selectedGroup?.group_name}</em>;
                    }
                    return selected?.group_name;
                  }}
                >
                  {groups?.map((group) => (
                    <MenuItem key={group?._id} value={group} size="small">
                      {group?.group_name}
                    </MenuItem>
                  ))}
                </Select>
                <label htmlFor="pollQuestion" className="pollLabel">
                  Pregunta
                </label>
                <TextField
                  fullWidth
                  size="small"
                  id="pollQuestion"
                  variant="outlined"
                  onChange={handleQuestion}
                  defaultValue={selectedQuestion}
                  required
                />
                {selectedOptions?.map((option, id) => (
                  <div key={option?._id || option?.id} className="pollLabel">
                    <label htmlFor="option" className="pollOption">
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
                        <IconButton
                          onClick={() => handleDeleteOption(option?._id)}
                          value={id}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

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
          </form>
        </div>
      )}
    </div>
  );
}

export default PollDetail;
