import React from 'react';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PollCard from '../../components/PollCard/PollCard';
import { mockEmissions, mockPolls } from '../../util';
import './PollManagement.css';

function PollManagement() {
  const [openEmission, setOpenEmission] = React.useState(true);

  return (
    <div className="pollManagementWrapper">
      <h2 className="pollTitle">Encuestas</h2>
      {mockEmissions.map((emission) => {
        const emissionPolls = mockPolls.filter(
          (poll) => poll.emissions === emission
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
                {emissionPolls.length > 0 ? (
                  emissionPolls.map((poll) => (
                    <PollCard key={poll.id} poll={poll} />
                  ))
                ) : (
                  <div className="emptyPollsContainer">
                    No se encontraron encuestas para esta emision
                  </div>
                )}
                <PollCard create emission={emission} />
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
}

export default PollManagement;
