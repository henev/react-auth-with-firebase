import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { withAuthentication, withAuthorization } from './components/Session';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
        
        <PrivateRoute exact path="/" component={() => <Redirect to={ROUTES.DASHBOARD} />} />
        <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
        <PrivateRoute path={ROUTES.SETTINGS} component={Settings} />
        
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} component={withAuthorization(Component)} />
}

export default withAuthentication(App);
