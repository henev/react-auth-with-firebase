import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import * as ROUTES from '../constants/routes';
import * as COLLECTIONS from '../constants/collections';

function Dashboard() {
  const [users, setUsers] = useState(null);
  const history = useHistory();
  const logout = () => {
    firebase.auth().signOut()
      .then(() => history.push(ROUTES.LOGIN))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const listener = firebase.firestore().collection(COLLECTIONS.USERS).onSnapshot(querySnapshot => {
        setUsers(querySnapshot);
        querySnapshot.forEach(doc => console.log(doc.id, doc.data()));
      });

    return listener;
  }, []);

  return (
    <>
      <button onClick={logout}>Sign out</button>
      <h3>Dashboard</h3>
      { users ? users.docs.map(u => {
        const user = u.data();
        
        return <div key={u.id}>{user.firstName} {user.lastName} - {user.email}</div>;
      }) : null }
    </>
  );
}

export default Dashboard;
