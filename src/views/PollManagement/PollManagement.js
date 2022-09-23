import React, { useEffect } from 'react';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PollCard from '../../components/PollCard/PollCard';
import { mockEmissions } from '../../util';
import { allPollsPost } from '../../util/Requests';
import './PollManagement.css';

function PollManagement() {
  const [openEmission, setOpenEmission] = React.useState(true);
  const [data, setData] = React.useState();

  useEffect(() => {
    allPollsPost().then((polls) => {
      setData(polls);
    });
  }, []);

  return (
    <div className="pollManagementWrapper">
      <h2 className="pollTitle">Encuestas</h2>
      {mockEmissions.map((emission) => {
        const emissionPolls = data?.filter(
          (poll) => poll.emission_name === emission.name
        );

        return (
          <div
            key={emission.id}
            className="emissionContainer"
            onClick={() =>
              setOpenEmission(openEmission === emission ? '' : emission)
            }
          >
            <div className="emissionTitle">
              <span>{emission.name}</span>
              <span>
                {openEmission === emission ? <ExpandLess /> : <ExpandMore />}
              </span>
            </div>
            <Collapse
              in={openEmission === emission}
              timeout="auto"
              unmountOnExit
            >
              <div className="pollsContainer">
                {emissionPolls?.length > 0 ? (
                  emissionPolls.map((poll) => (
                    <PollCard key={poll._id} poll={poll} />
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
        );
      })}
    </div>
  );
}

export default PollManagement;
