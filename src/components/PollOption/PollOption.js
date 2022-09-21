import React from 'react';
import './PollOption.css';

function PollOption(props) {
  const { option, onClick, selected } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`pollOptionWrapper ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="titleBox">
        <span className="title">{option}</span>
      </div>
    </div>
  );
}

export default PollOption;
