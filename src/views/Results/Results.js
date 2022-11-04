import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allPollsPost } from '../../util/Requests';
import './Results.css';

function Results() {
  const [data, setData] = useState();

  useEffect(() => {
    allPollsPost().then((polls) => {
      setData(polls);
    });
  }, []);

  return (
    <div className="resultsWrapper">
      {data && (
        <div className="pollResultsWrapper">
          <h1 className="title">Resultados</h1>
          <h2 className="title">Encuestas</h2>
          <div className="pollsWrapper">
            {data?.map((group) => (
              <div className="pollsWrapper" key={group?._id}>
                {group?.questions?.map((question) => (
                  <Link to={`/admin/poll-results/${question?._id}`}>
                    <div key={question?._id} className="pollCard">
                      <div className="pollCardWrapper">
                        <span className="pollCardTitle">
                          {question?.question_name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <h2 className="title">Grupos</h2>
          <div className="pollsWrapper">
            {data?.map((group) => (
              <div className="pollsWrapper" key={group?._id}>
                {group?.group_name !== 'Sin Agrupar' ? (
                  <Link to={`/admin/group-results/${group?._id}`}>
                    <div key={group?._id} className="pollCard">
                      <div className="pollCardWrapper">
                        <span className="pollCardTitle">
                          {group?.group_name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
