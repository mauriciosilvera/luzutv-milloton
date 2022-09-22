import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './PollDetail.css';
import { Button } from '@mui/material';
import { MdModeEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';

function PollDetail() {
  const [inputFields, setInputFields] = useState([
    { id: 0, option: '' },
    { id: 1, option: '' }
  ]);

  const handleAddfields = () => {
    setInputFields([...inputFields, { id: 2, option: '' }]);
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
            <h2 className="title"> Poll #1</h2>
            <EditIcon className="pollIcon" />
          </div>
          <label htmlFor="title" className="pollLabel">
            {' '}
            Title
          </label>
          <TextField fullWidth size="small" id="title" variant="outlined" />
          <label htmlFor="live" className="pollLabel">
            {' '}
            Emission
          </label>
          <TextField fullWidth size="small" id="emission" variant="outlined" />
          <label htmlFor="pollQuestion" className="pollLabel">
            {' '}
            Question
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
                {' '}
                Option {row.id + 1}
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
                Add option
              </Button>
            </div>

            <Button
              size="large"
              className="pollButton"
              type="submit"
              variant="outlined"
            >
              Save poll!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PollDetail;
