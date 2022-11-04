import React, { useEffect, useState } from 'react';
import { getImages } from '../../util/Requests';
import './Footer.css';

function Footer(props) {
  const { imageHasChanged } = props;
  const [sponsors, setSponsors] = useState();

  useEffect(() => {
    getImages('sponsorOne,sponsorTwo,sponsorThree,sponsorFour').then(
      (images) => {
        setSponsors(images);
      }
    );
  }, [imageHasChanged]);

  return (
    <div className="footerWrapper">
      {sponsors?.sponsorOne && (
        <img
          className="footer-sponsor"
          src={sponsors?.sponsorOne}
          alt="Sponsor"
        />
      )}
      {sponsors?.sponsorTwo && (
        <img
          className="footer-sponsor"
          src={sponsors?.sponsorTwo}
          alt="Sponsor"
        />
      )}
      {sponsors?.sponsorThree && (
        <img
          className="footer-sponsor"
          src={sponsors?.sponsorOne}
          alt="Sponsor"
        />
      )}
      {sponsors?.sponsorFour && (
        <img
          className="footer-sponsor"
          src={sponsors?.sponsorOne}
          alt="Sponsor"
        />
      )}
    </div>
  );
}

export default Footer;
