import React from 'react';
import './PollOption.css';

function PollOption(props) {
  const { option, onClick, selected } = props;

  const handleClick = (e) => {
    e?.preventDefault();
    onClick();
  };

  return (
    <div
      className={`pollOptionWrapper ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="titleBox">
        <span className="pollTitleCard">{option?.answer_name}</span>
      </div>
    </div>
  );
}

export default PollOption;
