import React, { useState, useEffect } from 'react';
import AuthUserContext from './context';
import firebase from '../../firebase';

function withAuthentication(Component) {
  function WithAuthentication(props) {
    const [ authUser, setAuthUser ] = useState(null);

    useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged(authUser => {
        authUser
          ? setAuthUser(authUser)
          : setAuthUser(null);
      });

      return listener;
    });

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }

  return WithAuthentication;
}

export default withAuthentication;
