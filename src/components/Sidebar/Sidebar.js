import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

function Sidebar(props) {
  const { hidden, isOpen, setIsOpen } = props;

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sideBarContainer ${!isOpen || hidden ? 'hidden' : ''}`}>
      <div className="sideBar-Navigation">
        <div className="sideBar-LinkContainer">
          <Link to="/admin/poll-management" onClick={handleSideBar}>
            <div className="sideBar-Option">Management</div>
          </Link>
          <Link to="/admin/active-polls" onClick={handleSideBar}>
            <div className="sideBar-Option">Active Polls</div>
          </Link>
        </div>

        <div className="sideBar-Option sideBar-logOutBtn">Logout</div>
      </div>
    </div>
  );
}

export default Sidebar;
