import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PollOption from '../../components/PollOption/PollOption';
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
  }, []);

  useEffect(() => {
    const getPoll = async () => {
      const poll = await getActivePoll(ipAddress);
      setActivePoll(poll);
    };

    getPoll();
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
      {!activePoll && !ipAddress && (
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}

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
