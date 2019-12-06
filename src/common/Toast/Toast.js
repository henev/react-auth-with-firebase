import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './styles.module.css';

function Toast({ children, remove, type }) {
  const animationProps = useSpring({opacity: .9, from: {opacity: 0}});
  const removeRef = useRef(remove);
  removeRef.current = remove;

  useEffect(() => {
    const duration = 5000;
    const id = setTimeout(() => removeRef.current(), duration);

    return () => clearTimeout(id);
  }, []);

  return (
    <animated.div style={animationProps} onClick={remove} className={styles[`${type}Toast`]}>
      <div className={styles.text}>
        <strong className={styles[type]}>{type === 'error' ? '[Error] ' : '[Success] '}</strong>
        { children }
      </div>
      <div>
        <button className={styles.closeButton}>x</button>
      </div>
    </animated.div>
  );
}

export default Toast;