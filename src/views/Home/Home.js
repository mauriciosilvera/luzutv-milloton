import React, { useEffect, useState } from 'react';
import PollOption from '../../components/PollOption/PollOption';
import { getActivePoll } from '../../util/Requests';
import './Home.css';

function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const [activePoll, setActivePoll] = useState();

  useEffect(() => {
    getActivePoll().then((poll) => {
      setActivePoll(poll);
    });
  }, []);

  return (
    <div className="homeWrapper">
      <h2 className="questionTitle">{activePoll?.[0].question_name}</h2>
      <div className="answersWrapper">
        {activePoll?.[0].answers.map((answer) => (
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
