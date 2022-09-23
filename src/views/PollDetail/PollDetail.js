import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './PollDetail.css';
import { Button, MenuItem, Select } from '@mui/material';
import { MdModeEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import { mockEmissions } from '../../util';
import { pollPost } from '../../util/Requests';

function PollDetail() {
  const { pollId } = useParams();
  const [inputFields, setInputFields] = useState([
    { id: 0, answer_name: '' },
    { id: 1, answer_name: '' }
  ]);
  const [program, setProgram] = useState('');
  const [question, setQuestion] = useState('');

  const data = [
    {
      emission: {
        date: '1663786397915',
        emission_name: program,
        admin_id: '6329e5cc5c8fe25c8095bc6b'
      }
    },
    {
      question: {
        question_name: question,
        date: '1663786397915',
        end_time: '2022-09-21',
        start_time: '2022-09-20T19:00:00.000Z',
        is_active: false
      }
    },
    {
      answers: inputFields
    }
  ];

  const handleAddfields = () => {
    setInputFields([
      ...inputFields,
      { id: inputFields.length, answer_name: '' }
    ]);
  };

  const handleDeleteOption = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    pollPost(data);
  };

  const handleSelectChange = (event) => {
    setProgram(event.target.value);
  };

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleChangeInput = (event) => {
    event.preventDefault();
    setInputFields(...inputFields, ...{ answer_name: event.target.value });
  };

  return (
    <div className="pollDetailWrapper">
      {console.log(inputFields)}
      <div className="pollFormBox">
        <form className="pollForm" onSubmit={handleSubmit}>
          <div className="pollTitleBox">
            <h2 className="title">{`Encuesta # ${pollId}`}</h2>
            <EditIcon className="pollIcon" />
          </div>
          <label htmlFor="live" className="pollLabel">
            Emisión
          </label>
          <Select onChange={handleSelectChange} sx={{ height: '2.4375em' }}>
            {mockEmissions.map((emission) => (
              <MenuItem key={emission.id} value={emission.name} size="small">
                {emission.name}
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
          />
          {inputFields?.map((row) => (
            <>
              <label htmlFor="option" className="pollLabel">
                Opción {row.id + 1}
              </label>
              <div className="pollOptionBox">
                <TextField
                  fullWidth
                  size="small"
                  id="option"
                  variant="outlined"
                  onChange={handleChangeInput}
                />
                <DeleteIcon
                  className="pollIcon"
                  onClick={() => handleDeleteOption(row.id)}
                />
              </div>
            </>
          ))}

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
        </form>
      </div>
    </div>
  );
}

export default PollDetail;
