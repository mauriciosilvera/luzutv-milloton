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
    getActivePoll().then((poll) => {
      setActivePoll(poll);
    });
    getIPAddress().then((ip) => {
      setIpAddress(ip);
    });
  }, []);

  const handleVote = async (answer) => {
    setSelectedOption(answer);

    const data = {
      ip_address: ipAddress,
      answerVote: {
        _id: answer?._id
      }
    };
    console.log(data);
    const res = await vote(data);
    console.log(res);
  };

  return (
    <div className="homeWrapper">
      {!activePoll && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}

      {activePoll && activePoll?.message && (
        <div className="votesMessage">{activePoll.message}</div>
      )}

      {activePoll?.length && selectedOption ? (
        <div className="votesMessage">¡Muchas gracias por tu voto!</div>
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
