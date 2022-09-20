import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import Img from '../../public/luzu.png';

import './Header.css';

function Header(props) {
  const { hidden, isSideBarOpen, setIsSideBarOpen } = props;

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className={`headerWrapper ${hidden ? 'hidden' : ''}`}>
      <GiHamburgerMenu
        className={`header-HamburgerIcon ${isSideBarOpen ? 'isOpen' : ''}`}
        onClick={handleSideBar}
      />
      <Link to="/">
        <img className="header-logo" src={Img} alt="Luzu TV Logo" />
      </Link>
      <div className="header-logOutBtn">Logout</div>
    </div>
  );
}

export default Header;
