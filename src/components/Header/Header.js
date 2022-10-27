import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { auth } from '../../util/auth';
import { getImages } from '../../util/Requests';

import './Header.css';

function Header(props) {
  const { isSideBarOpen, setIsSideBarOpen, imageHasChanged } = props;
  const [logo, setLogo] = useState();
  const hideButtons = !auth?.isAuthenticated;

  useEffect(() => {
    getImages('luzuLogo').then((image) => setLogo(image.imageUrl));
  }, [imageHasChanged]);

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
          <img className="header-logo" src={logo} alt="Luzu TV Logo" />
        </Link>
      </div>
      <div className="emptyDiv" />
    </div>
  );
}

export default Header;
