import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import * as ROUTES from '../../constants/routes';
import * as COLLECTIONS from '../../constants/collections';
import Heading from '../../common/Heading';
import styles from './styles.module.css';
import { withAuthorization } from '../../common/Session';
import { useToast } from '../../common/Toast';

function PrivateLayout({ children , history, match, authUser }) {
  const toast = useToast;
  const [users, setUsers] = useState(null);
  const logout = () => {
    firebase.auth().signOut()
      .then(() => history.push(ROUTES.LOGIN))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const listener = firebase
      .firestore()
      .collection(COLLECTIONS.USERS)
      .onSnapshot(
        querySnapshot => {
          setUsers(querySnapshot);
        }, 
        err => toast.add(err.message, 'error')
      );

    return listener;
  }, [toast]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        { children }
        
        <div className={styles.navigation}>
          { match.url !== ROUTES.DASHBOARD && <Link to={ROUTES.DASHBOARD} className={styles.navLink}>Go to Dashboard</Link> }
          { match.url !== ROUTES.SETTINGS && <Link to={ROUTES.SETTINGS} className={styles.navLink}>Go to Settings</Link> }
          <button onClick={logout} className={styles.navLink}>Logout</button>
        </div>
      </div>
      
      <div className={styles.users}>
        <Heading>Users</Heading>

        <ul className={styles.userList}>
          { users ? users.docs.map(u => {
            const user = u.data();
            
            return (
              <li key={u.id} className={authUser.uid === u.id ? styles.activeUser : styles.user}>
                <strong>{user.firstName} {user.lastName}</strong> [ {user.email} ]
              </li>
            );
          }) : null }
        </ul>
      </div>
    </div>
  );
}

export default withAuthorization(PrivateLayout);