import React from 'react';
import styled from 'styled-components';
import Poll from './components/Poll';

function PollManagement() {
  return (
    <PollManagementWrapper>
      <Title> Polls history</Title>
      <PollsContainer>
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
        <Poll />
      </PollsContainer>
    </PollManagementWrapper>
  );
}

export default PollManagement;

const Title = styled.h1`
  padding: 20px;
`;

const PollManagementWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PollsContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  margin: 15px;
`;
