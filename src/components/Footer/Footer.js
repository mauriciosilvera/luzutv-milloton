import React, { useEffect, useState } from 'react';
import { getImages } from '../../util/Requests';
import './Footer.css';

function Footer(props) {
  const { imageHasChanged } = props;
  const [sponsorOne, setSponsorOne] = useState();
  const [sponsorTwo, setSponsorTwo] = useState();
  const [sponsorThree, setSponsorThree] = useState();
  const [sponsorFour, setSponsorFour] = useState();

  useEffect(() => {
    getImages('sponsorOne').then((image) => setSponsorOne(image.imageUrl));
    getImages('sponsorTwo').then((image) => setSponsorTwo(image.imageUrl));
    getImages('sponsorThree').then((image) => setSponsorThree(image.imageUrl));
    getImages('sponsorFour').then((image) => setSponsorFour(image.imageUrl));
  }, [imageHasChanged]);

  return (
    <div className="footerWrapper">
      <img className="footer-sponsor" src={sponsorOne} alt="Sponsor" />
      <img className="footer-sponsor" src={sponsorTwo} alt="Sponsor" />
      <img className="footer-sponsor" src={sponsorThree} alt="Sponsor" />
      <img className="footer-sponsor" src={sponsorFour} alt="Sponsor" />
    </div>
  );
}

export default Footer;
