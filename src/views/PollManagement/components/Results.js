import React from 'react';
import styled from 'styled-components';

function Results() {
  return (
    <ResultsWrapper>
      <TitleBox>
        <Title>Titulo de prueba</Title>
        <Title>100%</Title>
      </TitleBox>
      <ProgressBar />
      <Votes> 29 votes </Votes>
    </ResultsWrapper>
  );
}

export default Results;

// STYLES
const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #1b2430;
  width: 45%;
  height: 20%;
  border-radius: 10px;
  padding: 15px;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  height: 5px;
  width: 100%;
  background-color: #1b2430;
  border-radius: 5px;
  margin: 10px 0;
`;

const Votes = styled.div`
  width: 100%;
  font-size: 12px;
  font-style: italic;
  padding-top: 5px;
  color: #1b2430;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
`;
