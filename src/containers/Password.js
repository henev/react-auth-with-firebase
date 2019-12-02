import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input/index';
import firebase from '../firebase';
import * as ROUTES from '../constants/routes';

function Register() {
  const history = useHistory();
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be minimum of 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Confrim password should match Password')
      .min(6, 'Confirm password must be minimum of 6 characters')
      .required('Confirm password is required')
  });

  const updatePassword = values => {
    firebase.auth().currentUser.updatePassword(values.password)
      .then(() => history.push(ROUTES.DASHBOARD))
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={ validationSchema }
      onSubmit={ updatePassword }
    >
      {props => (
        <Form>
          <Input label="Password" name="password" type="password" placeholder="Enter password" />
          <Input label="Confirm password" name="confirmPassword" type="password" placeholder="Confirm password" />
          
          <button type="submit" disabled={props.isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
