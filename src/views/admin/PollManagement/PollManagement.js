import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';

function PollManagement() {
  return (
    <PollManagementWrapper>
      <Header />
      <Sidebar />
    </PollManagementWrapper>
  );
}

export default PollManagement;

const PollManagementWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
