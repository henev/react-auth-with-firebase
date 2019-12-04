import React from 'react';
import styles from './styles.module.css';

function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;