import React from 'react';
import Heading from '../../common/Heading';
import styled from 'styled-components';

const Text = styled.div`
  font-size: 20px;
`;

function Dashboard() {
  return (
    <>
      <Heading>Dashboard</Heading>
      <Text>Nothing to display here ¯\_(ツ)_/¯</Text>
    </>
  );
}

export default Dashboard;
