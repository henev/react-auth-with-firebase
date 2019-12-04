import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 54px;
  font-family: 'RobotoLight';
`;

function NotFound() {
  return (
    <Container>
      <Heading>404 Not Found</Heading>
    </Container>
  );
}

export default NotFound;
