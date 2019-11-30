import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';

import './App.css';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthUserContext, withAuthentication } from './components/Session';
import firebase from './firebase';

function App() {
  return (
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/public" component={PublicPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

function AuthButton() {
  const history = useHistory();
  const logout = () => {
    firebase.auth().signOut()
      .then(() => history.push('/'))
      .catch(err => console.log(err));
  };

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <p>
            Welcome!{' '}
            <button onClick={logout}>Sign out</button>
          </p>
        ) : (
          <p>You are not logged in.</p>
        )
      }
    </AuthUserContext.Consumer>
  );
}

// function PrivateRoute(props) {
//   return (
//     <AuthUserContext.Consumer>
//       {authUser =>
//         authUser
//           ? <Route {...props} />
//           : <Redirect to={{ pathname:'/login', state: { from: props.location } }} />
//       }
//     </AuthUserContext.Consumer>
//   );
// }

function PublicPage() {
  return <h3>Public</h3>;
}

export default withAuthentication(App);
