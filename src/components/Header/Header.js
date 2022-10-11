import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { auth } from '../../util/auth';
import Img from '../../public/luzu.png';
import Sponsor from '../../public/cocalogo.png';

import './Header.css';

function Header(props) {
  const { isSideBarOpen, setIsSideBarOpen } = props;

  const hideButtons = !auth?.isAuthenticated;

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
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
      <img className="header-sponsor" src={Sponsor} alt="Sponsor" />
    </div>
  );
}

export default Header;
