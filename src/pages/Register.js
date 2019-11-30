import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input/index';

function Register() {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First name is required'),
    lastName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required')
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={ validationSchema }
      onSubmit={ onSubmit }
    >
      {props => (
        <Form>
          <Input label="First Name" name="firstName" type="text" placeholder="Enter first name" />
          <Input label="Last Name" name="lastName" type="text" placeholder="Enter last name" />
          <Input label="Email Address" name="email" type="email" placeholder="Enter email address" />
          
          <button type="submit" disabled={props.isSubmitting}>Submit</button>
          <button type="reset" onClick={props.handleReset}>Reset</button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
