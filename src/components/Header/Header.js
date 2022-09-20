import React from 'react';
import styled from 'styled-components';
import Img from './luzu.png';

function Header() {
  return (
    <HeaderWrapper>
      <Logo src={Img} />
      <Logout> Logout </Logout>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 15%;
  background-color: #1b2430;
  display: flex;
  margin: 0;
  justify-content: space-between;
  align-items: center;
`;

const Logout = styled.p`
  padding: 20px;
  font-size: 20px;
  background: none;
  border: none;
  color: #d9d9d9;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #fff;
    font-weight: 700;
    font-size: 21px;
  }
`;

const Logo = styled.img`
  width: 250px;
  height: 100px;
`;
