import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

function Sidebar() {
  const [openClose, setOpenClose] = useState(false);

  const handleSideBar = () => {
    setOpenClose(!openClose);
  };

  return (
    <SidebarWrapper handle={openClose}>
      <SidebarNavigation>
        <Link style={{ textDecoration: 'none' }} to="/admin/poll-management">
          <SidebarOption>Management</SidebarOption>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/admin/active-polls">
          <SidebarOption>Active polls</SidebarOption>
        </Link>
      </SidebarNavigation>
      <HamburgerIcon onClick={() => handleSideBar()} />
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.div`
  width: 20%;
  height: 85%;
  background-color: #1b2430;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  left: ${(props) => (props.handle ? '-20%' : '0%')};
  top: 0;
`;

const SidebarOption = styled.p`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  color: #d9d9d9;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  padding: 20px;

  &:hover {
    color: #fff;
    font-weight: 700;
    font-size: 21px;
  }
`;

const SidebarNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  margin-top: 10px;
`;

const HamburgerIcon = styled(GiHamburgerMenu)`
  color: #d9d9d9;
  position: absolute;
  background-color: #1b2430;
  font-size: 25px;
  border-radius: 5px;
  cursor: pointer;
  right: -15px;
  padding: 2px;
  top: 50%;
`;
