import React, { useEffect, useState } from 'react';
import { allPollsPostWithoutGroups } from '../../util/Requests';
import PollCard from '../../components/PollCard/PollCard';
import './PollResults.css';

function PollResults() {
  const [data, setData] = useState();
  const [viewResults, setViewResults] = useState();

  useEffect(() => {
    allPollsPostWithoutGroups().then((polls) => {
      setData(polls);
    });
  }, []);

  const pollList = (
    <>
      <h1 className="title">Resultados</h1>
      <div className="pollsWrapper">
        {data?.map((question) => (
          <div key={question?._id} className="pollCard">
            <PollCard question={question} />
          </div>
        ))}
      </div>
    </>
  );

  if (viewResults) {
    return (
      <div className="pollResultsWrapper">
        {pollList}
        <span>TESTTTT</span>
      </div>
    );
  } else if {

  }

}

export default PollResults;
