import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from '../../firebase';
import * as ROUTES from '../../constants/routes';

function withAuthorization(Component) {
  function WithAuthorization(props) {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged(authUser => { 
        if (!authUser) {
          history.push(ROUTES.LOGIN, { from: location });
        }
      });

      return listener;
    });

    // TODO: Add loading component instead of null
    return firebase.auth().currentUser ? <Component {...props} /> : null;
  }

  return WithAuthorization;
}

export default withAuthorization;