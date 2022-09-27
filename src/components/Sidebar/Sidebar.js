import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../util/auth';

import './Sidebar.css';

function Sidebar(props) {
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();
  const hideButtons = !auth?.isAuthenticated;

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (auth?.isAuthenticated) {
      auth?.signout();
    }
    navigate('/admin/login', { replace: true });
  };

  return (
    <div
      className={`sideBarContainer ${!isOpen || hideButtons ? 'hidden' : ''}`}
    >
      <div className="sideBar-Navigation">
        <div className="sideBar-LinkContainer">
          <Link to="/admin/polls-management" onClick={handleSideBar}>
            <div className="sideBar-Option">Manejo de encuestas</div>
          </Link>
        </div>

        <div
          className="sideBar-Option sideBar-logOutBtn"
          onClick={handleLogout}
        >
          {auth?.isAuthenticated ? 'Log Out' : 'Log In'}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
