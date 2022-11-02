import React, { useEffect, useState } from 'react';
import { LoadingSpinner, PollOption } from '../../components';
import { getActivePoll, vote, getIPAddress } from '../../util/Requests';
import './Home.css';

function Home() {
  const [selectedOption, setSelectedOption] = useState();
  const [activePoll, setActivePoll] = useState();
  const [ipAddress, setIpAddress] = useState();

  useEffect(() => {
    const getIp = async () => {
      const ip = await getIPAddress();
      setIpAddress(ip);
    };

    getIp();
  }, [ipAddress]);

  useEffect(() => {
    if (ipAddress) {
      const getPoll = async () => {
        const poll = await getActivePoll(ipAddress);
        setActivePoll(poll);
      };
      getPoll();
    }
  }, [ipAddress]);

  const handleVote = async (answer) => {
    setSelectedOption(answer);

    const data = {
      ip_address: ipAddress,
      answerVote: {
        _id: answer?._id
      }
    };

    await vote(data);
  };

  return (
    <div className="homeWrapper">
      {!activePoll && !ipAddress && <LoadingSpinner />}

      {selectedOption && (
        <div className="votesMessage">¡Muchas gracias por tu voto!</div>
      )}

      {activePoll && activePoll?.message && (
        <div className="votesMessage">{activePoll.message}</div>
      )}

      {!selectedOption && !activePoll?.message && (
        <>
          <h2 className="questionTitle">{activePoll?.[0]?.question_name}</h2>
          <div className="answersWrapper">
            {activePoll?.[0]?.answers?.map((answer) => (
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
