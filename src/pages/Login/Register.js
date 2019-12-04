import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../common/Input';
import Button from '../../common/Button';
import ButtonWrapper from '../../common/ButtonWrapper';
import firebase from '../../firebase';
import * as ROUTES from '../../constants/routes';
import * as COLLECTIONS from '../../constants/collections';

function Register() {
  const history = useHistory();
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First name is required'),
    lastName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(6, 'Password must be minimum of 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Confrim password should match Password')
      .min(6, 'Confirm password must be minimum of 6 characters')
      .required('Confirm password is required')
  });

  const register = values => {
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        firebase.firestore().collection(COLLECTIONS.USERS).doc(res.user.uid).set({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName
        }).then(() => history.push(ROUTES.DASHBOARD));
      })
      .catch(err => {
        console.log(err.message);
        // Show toast
      });
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={ validationSchema }
      onSubmit={ register }
    >
      {props => (
        <Form>
          <Input label="First Name" name="firstName" type="text" placeholder="Enter first name" />
          <Input label="Last Name" name="lastName" type="text" placeholder="Enter last name" />
          <Input label="Email Address" name="email" type="email" placeholder="Enter email address" />
          <Input label="Password" name="password" type="password" placeholder="Enter password" />
          <Input label="Confirm password" name="confirmPassword" type="password" placeholder="Confirm password" />
          
          <ButtonWrapper>
            <Button type="submit" disabled={props.isSubmitting}>REGISTER</Button>
            <Button type="reset" onClick={props.handleReset} secondary>RESET</Button>
          </ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
