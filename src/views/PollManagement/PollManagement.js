import React from 'react';
import Poll from './components/Poll/Poll';
import './PollManagement.css';

function PollManagement() {
  return (
    <div className="pollManagementWrapper">
      <h1 className="pollTitle"> Polls history</h1>
      <div className="pollsContainer">
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
      </div>
    </div>
  );
}

export default PollManagement;
