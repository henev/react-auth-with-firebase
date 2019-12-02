import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input/index';
import firebase from '../firebase';
import * as ROUTES from '../constants/routes';
import * as COLLECTIONS from '../constants/collections';

function Profile() {
  const [authUser] = useState(firebase.auth().currentUser);
  const [userDoc] = useState(firebase.firestore().collection(COLLECTIONS.USERS).doc(authUser.uid));
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

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
      .required('Email address is required')
  });

  useEffect(() => {
    userDoc.get()
      .then(doc => setUserData(doc.data()));
  }, [userDoc]);

  const updateProfile = values => {
    authUser.updateEmail(values.email)
      .then(() => {
        userDoc
          .update({
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName
          }).then(() => history.push(ROUTES.DASHBOARD));
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <Formik
      enableReinitialize={ true }
      initialValues={{ firstName: userData.firstName, lastName: userData.lastName, email: userData.email }}
      validationSchema={ validationSchema }
      onSubmit={ updateProfile }
    >
      {props => (
        <Form>
          <Input label="First Name" name="firstName" type="text" placeholder="Enter first name" />
          <Input label="Last Name" name="lastName" type="text" placeholder="Enter last name" />
          <Input label="Email Address" name="email" type="email" placeholder="Enter email address" />
          
          <button type="submit" disabled={props.isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default Profile;
