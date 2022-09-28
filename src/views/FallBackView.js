import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Img from '../public/luzu.png';

function FallBackView() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="testView">
      <img src={Img} alt="" />
    </div>
  );
}

export default FallBackView;
