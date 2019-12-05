import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { compose } from 'recompose';

import LoginLayout from './layouts/Login';
import PrivateLayout from './layouts/Private';

import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';

import { withAuthentication, AuthUserContext } from './common/Session';
import { withToastProvider } from './common/Toast';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.LOGIN} render={props => 
          <LoginLayout {...props}>
            <Login {...props} />
          </LoginLayout>
        } />
        <Route path={ROUTES.REGISTER} render={props => 
          <LoginLayout {...props}>
            <Register {...props} />
          </LoginLayout>
        } />
        
        <PrivateRoute exact path="/" component={() => <Redirect to={ROUTES.DASHBOARD} />} />
        <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
        <PrivateRoute path={ROUTES.SETTINGS} component={Settings} />
        
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={(props) => 
    <AuthUserContext.Consumer>
      {authUser => (
        <PrivateLayout authUser={authUser} {...props}>
          <Component {...props} />
        </PrivateLayout>
      )}
    </AuthUserContext.Consumer>
  } />
}

export default compose(withToastProvider, withAuthentication)(App);
