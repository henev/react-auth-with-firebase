import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../common/Input';
import Button from '../../common/Button';
import ButtonWrapper from '../../common/ButtonWrapper';
import firebase from '../../firebase';
import * as ROUTES from '../../constants/routes';
import { useToast } from '../../common/Toast';

function Login({ history, location }) {
  const toast = useToast();
  const { from } = location.state || { from: { pathname: ROUTES.DASHBOARD }};

  const login = (values, { setSubmitting }) => {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push(from);
      })
      .catch(err => {
        toast.add(err.message, 'error');
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(6, 'Password must be minimum of 6 characters')
      .required('Password is required')
  });

  return (
    <Formik 
      initialValues={{ email: 'admin@admin.com', password: '123123' }} 
      validationSchema={ validationSchema }
      onSubmit={ login }
    >
      {props => (
        <Form>
          <Input label="Email Address" name="email" type="email" placeholder="Enter your email address" />
          <Input label="Password" name="password" type="password" placeholder="Enter your password" />
          
          <ButtonWrapper>
            <Button type="submit" disabled={props.isSubmitting}>LOGIN</Button>
          </ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
