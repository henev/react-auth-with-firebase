import React from 'react';
import styles from './styles.module.css';

function Button({ children, type, disabled, handleClick, secondary }) {
  return (
    <button 
      type={type || 'button'} 
      disabled={disabled} 
      className={`${styles.button} ${secondary && styles.secondary}`} 
      onClick={handleClick}
    >
      { children }
    </button>
  );
}

export default Button;