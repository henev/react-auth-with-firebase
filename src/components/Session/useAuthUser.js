import { useState, useEffect } from 'react';
import firebase from '../../firebase';

function useAuthUser() {
  const [ authUser, setAuthUser ] = useState(null);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? setAuthUser(authUser)
        : setAuthUser(null);
    });

    return listener;
  });

  return authUser;
}

export default useAuthUser;