import React, { useEffect, useState } from 'react';
import PollOption from '../../components/PollOption/PollOption';
import { getActivePoll, vote } from '../../util/Requests';
import './Home.css';

function Home() {
  const [selectedOption, setSelectedOption] = useState();
  const [activePoll, setActivePoll] = useState();

  useEffect(() => {
    getActivePoll().then((poll) => {
      setActivePoll(poll);
    });
  }, []);

  const handleVote = (answer) => {
    setSelectedOption(answer);

    const data = {
      answerVote: {
        _id: answer._id
      }
    };
    vote(data);
  };

  return (
    <div className="homeWrapper">
      {selectedOption ? (
        <div>Muchas gracias por votar!</div>
      ) : (
        <>
          <h2 className="questionTitle">{activePoll?.[0]?.question_name}</h2>
          <div className="answersWrapper">
            {activePoll?.[0]?.answers.map((answer) => (
              <PollOption
                key={answer._id}
                option={answer}
                onClick={() => handleVote(answer)}
                selected={selectedOption === answer}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
