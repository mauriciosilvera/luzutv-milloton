import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PollOption from '../../components/PollOption/PollOption';
import { getActivePoll, vote, getIPAddress } from '../../util/Requests';
import './Home.css';

function Home() {
  const [selectedOption, setSelectedOption] = useState();
  const [activePoll, setActivePoll] = useState();
  const [ipAdress, setIpAdress] = useState('');
  const [IPv4LocalStorage, setIPv4LocalStorage] = useState('');
  // const hasAlreadyVoted = ipAdress;

  useEffect(() => {
    getActivePoll().then((poll) => {
      setActivePoll(poll);
    });
    getIPAddress().then((ip) => {
      setIpAdress(ip);
    });
    const localIp = JSON.parse(localStorage.getItem('IPv4'));
    if (localIp) {
      setIPv4LocalStorage(localIp);
    }
  }, []);

  const handleVote = (answer) => {
    setSelectedOption(answer);
    localStorage.setItem('IPv4', JSON.stringify(ipAdress));
    const data = {
      answerVote: {
        _id: answer?._id
      }
    };
    vote(data);
  };

  const hasAlreadyVoted = ipAdress === IPv4LocalStorage;

  return (
    <div className="homeWrapper">
      {console.log(hasAlreadyVoted)}
      {!activePoll && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}

      {activePoll && !activePoll?.length && (
        <div>No se encontrar encuestas activas en este momento</div>
      )}

      {(activePoll?.length && selectedOption) || hasAlreadyVoted ? (
        <div>Muchas gracias por votar!</div>
      ) : (
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
