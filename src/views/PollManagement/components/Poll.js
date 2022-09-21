import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Poll() {
  return (
    <PollWrapper to="/admin/poll/id">
      <PollName> Prueba</PollName>
    </PollWrapper>
  );
}

export default Poll;

// STYLES

const PollWrapper = styled(Link)`
  width: 45%;
  height: 20%;
  border: 1px solid #1b2430;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  margin: 5px;
`;

const PollName = styled.p`
  font-size: 25px;
  padding: 15px;
`;
