import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from '../../firebase';
import AuthUserContext from './context';

function withAuthorization(Component) {
  function WithAuthorization(props) {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged(authUser => { 
        if (!authUser) {
          history.push('/login', { from: location });
        }
      });

      return listener;
    });

    return (
      <AuthUserContext.Consumer>
        { authUser => authUser ? <Component {...props} /> : null }
      </AuthUserContext.Consumer>
    )
  }

  return WithAuthorization;
}

export default withAuthorization;