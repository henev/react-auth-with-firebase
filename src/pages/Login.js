import React, { useState } from 'react';

import LoginForm from '../containers/Login';
import RegisterForm from '../containers/Register';

const FORM_LOGIN = 'login';
const FORM_REGISTER = 'register';

function Login() {
  const [currentForm, setCurrentForm] = useState(FORM_LOGIN);

  return (
    <div>
      <button onClick={() => setCurrentForm(FORM_LOGIN)}>Login</button>
      <button onClick={() => setCurrentForm(FORM_REGISTER)}>Register</button>

      { 
        currentForm === FORM_LOGIN
          ? <LoginForm />
          : <RegisterForm />
      }
    </div>
  );
}

export default Login;
