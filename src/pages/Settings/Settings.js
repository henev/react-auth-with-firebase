import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PasswordForm from './Password';
import ProfileForm from './Profile';
import { AuthUserContext } from '../../common/Session';
import * as ROUTES from '../../constants/routes';
import Form from '../../common/Form';
import Heading from '../../common/Heading';

function Settings() {
  const routes = [{
    path: ROUTES.PROFILE,
    name: 'PROFILE'
  }, {
    path: ROUTES.PASSWORD,
    name: 'PASSWORD'
  }];

  return (
    <>
      <Heading>Settings</Heading>

      <Form routes={routes} flexible>
        <Route exact path={ROUTES.SETTINGS} component={() => <Redirect to={ROUTES.PROFILE} />} />
        <Route path={ROUTES.PROFILE}>
          <AuthUserContext.Consumer>{ authUser => <ProfileForm authUser={authUser} /> }</AuthUserContext.Consumer>
        </Route>
        <Route path={ROUTES.PASSWORD} component={PasswordForm} />
      </Form>
    </>
  );
}

export default Settings;
