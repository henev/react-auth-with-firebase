import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

function Form({ routes, children, flexible }) {
  return (
    <div className={flexible ? styles.formFlexible : styles.form}>
      <div className={styles.navigation}>
        { routes.map(route => (
          <NavLink 
            key={route.name}
            to={route.path} 
            activeClassName={styles.activeNavLink} 
            className={styles.navLink} 
            style={{ borderTopLeftRadius: '4px' }}
          >
            {route.name}
          </NavLink>
        )) }
      </div>

      <div className={styles.content}>
        { children }
      </div>
    </div>
  );
}

export default Form;