import React from 'react';
import styled from 'styled-components';

function Answers(color) {
  return (
    <AnswersWrapper color={color}>
      <TitleBox>
        <Title>Titulo de prueba</Title>
        <Title>100%</Title>
      </TitleBox>
      <ProgressBar color={color} />
      <Votes color={color}> 29 votes </Votes>
    </AnswersWrapper>
  );
}

export default Answers;

// STYLES
const AnswersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.color};
  width: 50%;
  height: 13%;
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
  background-color: ${(props) => props.color};
  border-radius: 5px;
  margin: 10px 0;
`;

const Votes = styled.div`
  width: 100%;
  font-size: 12px;
  font-style: italic;
  padding-top: 5px;
  color: ${(props) => props.color};
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
`;
