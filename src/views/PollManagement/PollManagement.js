import React, { useEffect } from 'react';
import { Collapse, Box, CircularProgress } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import PollCard from '../../components/PollCard/PollCard';
import { allPollsPost, deleteQuestion } from '../../util/Requests';
import './PollManagement.css';

function PollManagement() {
  const [openEmission, setOpenEmission] = React.useState(true);
  const [data, setData] = React.useState();

  useEffect(() => {
    allPollsPost().then((polls) => {
      setData(polls);
    });
  }, []);

  const handleDeletePoll = (id) => {
    console.log(id);
    deleteQuestion();
  };

  return (
    <div className="pollManagementWrapper">
      {console.log(data)}
      <h2 className="pollTitle">Encuestas</h2>
      {data === undefined && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {data?.map((emission) => (
        <div
          key={emission?._id}
          className="emissionContainer"
          onClick={() =>
            setOpenEmission(openEmission === emission ? '' : emission)
          }
        >
          <div className="emissionTitle">
            <span>{emission?.emission_name}</span>
            <span>
              {openEmission === emission ? <ExpandLess /> : <ExpandMore />}
            </span>
          </div>
          <Collapse in={openEmission === emission} timeout="auto" unmountOnExit>
            <div className="pollsContainer">
              {emission?.questions?.length > 0 ? (
                emission?.questions.map((question) => (
                  <div key={question._id} className="pollCard">
                    <PollCard
                      deletePoll={handleDeletePoll}
                      question={question}
                    />
                    <DeleteIcon
                      onClick={() => handleDeletePoll(question._id)}
                    />
                  </div>
                ))
              ) : (
                <div className="emptyPollsContainer">
                  No se encontraron encuestas para esta emisión
                </div>
              )}
              <PollCard create />
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default PollManagement;
