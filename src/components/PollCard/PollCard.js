import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import './PollCard.css';

function PollCard(props) {
  const { question, create } = props;

  return (
    <Link
      className={`pollCardWrapper ${create ? 'create' : ''}`}
      to={
        create
          ? '/admin/poll-details/new'
          : `/admin/poll-details/${question?._id}`
      }
    >
      <span className="pollCardTitle">
        {question?.question_name ?? (create ? <Add /> : '')}
      </span>
    </Link>
  );
}

export default PollCard;
