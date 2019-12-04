import React from 'react';
import * as ROUTES from '../../constants/routes';

import styles from './styles.module.css';
import Form from '../../common/Form';

function LoginLayout({ children }) {
  const routes = [{
    path: ROUTES.LOGIN,
    name: 'LOGIN'
  }, {
    path: ROUTES.REGISTER,
    name: 'REGISTER'
  }];

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.header}>
          <img src="/react.svg" className={styles.headerLogo} alt="React icon" />
          <div>
            <div className={styles.headerTextSmall}>Authentication w/</div>
            <div className={styles.headerTextBig}>React & Firebase</div>
          </div>
        </div>

        <Form routes={routes}>
          { children }
        </Form>
      </div>
    </div>
  );
}

export default LoginLayout;
