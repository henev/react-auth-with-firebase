import React from 'react';
import { withAuthorization } from '../components/Session';

function Dashboard() {
  return <h3>Dashboard</h3>;
}

export default withAuthorization(Dashboard);
