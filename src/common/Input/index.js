import React from 'react';
import { useField } from 'formik';
import styles from './styles.module.css';

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  const inputErrorClass = meta.touched && meta.error && styles.inputWithError;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={props.id || props.name} className={styles.label}>{label}</label>
      <input className={`${styles.input} ${inputErrorClass}`} {...field} {...props} />
      <div className={styles.error}>{meta.touched && meta.error ? meta.error : '\u00A0' }</div>
    </div>
  );
}

export default Input;