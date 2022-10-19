import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { auth } from '../../util/auth';
import Logo from '../../public/luzu.png';

import './Header.css';

function Header(props) {
  const { isSideBarOpen, setIsSideBarOpen } = props;

  const hideButtons = !auth?.isAuthenticated;

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className={`headerWrapper ${hideButtons ? 'hideButtons' : ''}`}>
      <div className="burger">
        <GiHamburgerMenu
          className={`header-HamburgerIcon ${isSideBarOpen ? 'isOpen' : ''} ${
            hideButtons ? 'hidden' : ''
          }`}
          onClick={handleSideBar}
        />
      </div>
      <div className="header-logosContainer">
        <Link to="/">
          <img className="header-logo" src={Logo} alt="Luzu TV Logo" />
        </Link>
      </div>
      <div className="emptyDiv" />
    </div>
  );
}

export default Header;
