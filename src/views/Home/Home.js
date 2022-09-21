import React, { useState } from 'react';
import { mockPolls } from '../../util';
import PollOption from '../../components/PollOption/PollOption';
import './Home.css';

function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <div className="homeWrapper">
      <h2 className="questionTitle">{mockPolls[1].question}</h2>
      <div className="answersWrapper">
        {mockPolls[1].answers.map((answer) => (
          <PollOption
            option={answer}
            onClick={() => {
              setSelectedOption(answer);
            }}
            selected={selectedOption === answer}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
