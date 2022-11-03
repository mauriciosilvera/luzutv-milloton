import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { getImages } from '../../util/Requests';

import './Header.css';

function Header(props) {
  const {
    isSidebarButtonDisplayed,
    setIsSidebarOpen,
    imageHasChanged,
    isSidebarOpen
  } = props;
  const [logo, setLogo] = useState();

  useEffect(() => {
    getImages('luzuLogo').then((image) => setLogo(image.imageUrl));
  }, [imageHasChanged]);

  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`headerWrapper ${
        isSidebarButtonDisplayed ? '' : 'hideButtons'
      }`}
    >
      <div className="burger">
        <GiHamburgerMenu
          className={`header-HamburgerIcon ${
            isSidebarButtonDisplayed ? '' : 'hidden'
          }`}
          onClick={handleSideBar}
        />
      </div>
      <div className="header-logosContainer">
        {logo && (
          <Link to="/">
            <img className="header-logo" src={logo} alt="Luzu TV Logo" />
          </Link>
        )}
      </div>
      <div className="emptyDiv" />
    </div>
  );
}

export default Header;
