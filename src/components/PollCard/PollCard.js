import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import './PollCard.css';

function PollCard(props) {
  const { poll, create } = props;
  return (
    <Link
      className={`pollCardWrapper ${create ? 'create' : ''}`}
      to={
        create
          ? '/admin/poll-management/'
          : `/admin/poll-management/${poll?.id}`
      }
    >
      <span className="pollCardTitle">
        {poll?.question ?? (create ? <Add /> : '')}
      </span>
    </Link>
  );
}

export default PollCard;
