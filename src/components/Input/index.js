import React from 'react';
import { useField } from 'formik';
import './styles.css';

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  const inputErrorClass = meta.touched && meta.error && 'text-input--error';

  return (
    <>
      <label htmlFor={props.id || props.name} className="label">{label}</label>
      <input className={`text-input ${inputErrorClass}`} {...field} {...props} />
      { meta.touched && meta.error && <div className="error">{meta.error}</div> }
    </>
  );
}

export default Input;