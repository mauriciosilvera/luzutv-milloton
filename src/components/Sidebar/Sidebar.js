import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../util/auth';

import './Sidebar.css';

function Sidebar(props) {
  const { isSidebarOpen, setIsSidebarOpen, setIsSidebarButtonDisplayed } =
    props;
  const navigate = useNavigate();
  const hideButtons = !auth?.isAuthenticated;

  const handleLogout = () => {
    if (auth?.isAuthenticated) {
      auth?.signout();
    }
    setIsSidebarButtonDisplayed(false);
    navigate('/admin/login', { replace: true });
  };

  return (
    <div
      className={`sideBarContainer ${
        !isSidebarOpen || hideButtons ? 'hidden' : ''
      }`}
    >
      <div className="sideBar-Navigation">
        <div className="sideBar-LinkContainer">
          <Link to="/admin/polls-management">
            <div
              className="sideBar-Option"
              onClick={() => setIsSidebarOpen(false)}
            >
              Encuestas
            </div>
          </Link>
          <Link to="/admin/groups-management">
            <div
              className="sideBar-Option"
              onClick={() => setIsSidebarOpen(false)}
            >
              Grupos
            </div>
          </Link>
          <Link to="/admin/images-management">
            <div
              className="sideBar-Option"
              onClick={() => setIsSidebarOpen(false)}
            >
              Imágenes
            </div>
          </Link>
          <Link to="/admin/results">
            <div
              className="sideBar-Option"
              onClick={() => setIsSidebarOpen(false)}
            >
              Resultados
            </div>
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
