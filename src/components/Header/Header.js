import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import Img from '../../public/luzu.png';

import './Header.css';

function Header(props) {
  const { hideButtons, isSideBarOpen, setIsSideBarOpen } = props;

  const navigate = useNavigate();

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    navigate('/admin/login');
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
        onClick={handleLogOut}
      >
        Logout
      </div>
    </div>
  );
}

export default Header;
