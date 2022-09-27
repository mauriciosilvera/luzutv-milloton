import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { auth } from '../../util/auth';
import Img from '../../public/luzu.png';

import './Header.css';

function Header(props) {
  const { isSideBarOpen, setIsSideBarOpen } = props;

  const hideButtons = !auth?.isAuthenticated;
  const navigate = useNavigate();

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleLogout = () => {
    if (auth?.isAuthenticated) {
      auth?.signout();
    }
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className={`headerWrapper ${hideButtons ? 'hideButtons' : ''}`}>
      <GiHamburgerMenu
        className={`header-HamburgerIcon ${isSideBarOpen ? 'isOpen' : ''} ${
          hideButtons ? 'hidden' : ''
        }`}
        onClick={handleSideBar}
      />
      <Link to="/">
        <img className="header-logo" src={Img} alt="Luzu TV Logo" />
      </Link>
      <div
        className={`header-logOutBtn ${hideButtons ? 'hidden' : ''}`}
        onClick={handleLogout}
      >
        {auth?.isAuthenticated ? 'Log Out' : 'Log In'}
      </div>
    </div>
  );
}

export default Header;
