import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './PollDetail.css';
import { Button, MenuItem, Select } from '@mui/material';
import { MdModeEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import { mockEmissions } from '../../util';

function PollDetail() {
  const { pollId } = useParams();
  const [inputFields, setInputFields] = useState([
    { id: 0, option: '' },
    { id: 1, option: '' }
  ]);

  const handleAddfields = () => {
    setInputFields([...inputFields, { id: inputFields.length, option: '' }]);
  };

  const handleDeleteOption = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleSubmit = () => {};

  return (
    <div className="pollDetailWrapper">
      <div className="pollFormBox">
        <form className="pollForm" onSubmit={handleSubmit}>
          <div className="pollTitleBox">
            <h2 className="title">{`Encuesta # ${pollId}`}</h2>
            <EditIcon className="pollIcon" />
          </div>
          <label htmlFor="live" className="pollLabel">
            Emisión
          </label>
          <Select sx={{ height: '2.4375em' }}>
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
          />
          {inputFields.map((row) => (
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
                />
                <DeleteIcon className="pollIcon" onClick={handleDeleteOption} />
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
