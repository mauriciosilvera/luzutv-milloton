import React from 'react';
import cocaLogo from '../../public/cocalogo.png';
import carrefourLogo from '../../public/carrefour.png';
import adidasLogo from '../../public/adidas.png';
import samsungLogo from '../../public/samsung.png';
import './Footer.css';

function Footer() {
  return (
    <div className="footerWrapper">
      <img className="footer-sponsor" src={cocaLogo} alt="Sponsor" />
      <img className="footer-sponsor" src={adidasLogo} alt="Sponsor" />
      <img className="footer-sponsor" src={samsungLogo} alt="Sponsor" />
      <img className="footer-sponsor" src={carrefourLogo} alt="Sponsor" />
    </div>
  );
}

export default Footer;
