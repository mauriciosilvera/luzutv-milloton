import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import './PollCard.css';

function PollCard(props) {
  const { poll, create } = props;
  return (
    <div>
      {create ? (
        <Link
          className={`pollCardWrapper ${create ? 'create' : ''}`}
          to="/admin/poll-details/new"
        >
          <Add />
        </Link>
      ) : (
        poll?.questions?.map((row) => (
          <Link
            className={`pollCardWrapper ${create ? 'create' : ''}`}
            to={`/admin/poll-details/${row._id}`}
          >
            <span className="pollCardTitle">
              {create ? <Add /> : row.question_name}
            </span>
          </Link>
        ))
      )}
    </div>
  );
}

export default PollCard;
