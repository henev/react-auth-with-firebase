import React from 'react';
import styles from './styles.module.css';

function Toast({ children, remove, type }) {
  // useEffect(() => {
  //   const duration = 5000;
  //   const id = setTimeout(() => remove(), duration);
  //   console.log(id);

  //   return () => clearTimeout(id);
  // }, []);

  return (
    <div onClick={remove} className={styles[`${type}Toast`]}>
      <div className={styles.text}>
        <strong className={styles[type]}>{type === 'error' ? '[Error] ' : '[Success] '}</strong>
        { children }
      </div>
      <div>
        <button className={styles.closeButton}>x</button>
      </div>
    </div>
  );
}

export default Toast;