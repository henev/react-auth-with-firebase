import React, { useState } from 'react';

import PasswordForm from '../containers/Password';
import ProfileForm from '../containers/Profile';

const FORM_PROFILE = 'profile';
const FORM_PASSWORD = 'password';

function Settings() {
  const [currentForm, setCurrentForm] = useState(FORM_PROFILE);

  return (
    <div>
      <button onClick={() => setCurrentForm(FORM_PROFILE)}>Profile</button>
      <button onClick={() => setCurrentForm(FORM_PASSWORD)}>Password</button>

      { 
        currentForm === FORM_PROFILE
          ? <ProfileForm />
          : <PasswordForm />
      }
    </div>
  );
}

export default Settings;
