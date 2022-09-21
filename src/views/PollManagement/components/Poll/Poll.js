import React from 'react';
import { Link } from 'react-router-dom';
import './Poll.css';

function Poll() {
  return (
    <Link className="pollWrapper" to="/admin/poll/id">
      <p className="pollName"> Prueba</p>
    </Link>
  );
}

export default Poll;
