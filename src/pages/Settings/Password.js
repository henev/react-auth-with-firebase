import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../common/Input/index';
import firebase from '../../firebase';
import * as ROUTES from '../../constants/routes';
import Button from '../../common/Button';
import ButtonWrapper from '../../common/ButtonWrapper';
import { useToast } from '../../common/Toast';

function Register() {
  const toast = useToast();
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

  const updatePassword = (values, { setSubmitting }) => {
    firebase.auth().currentUser.updatePassword(values.password)
      .then(() => {
        toast.add('You have successfully changed your password.', 'success');
        history.push(ROUTES.DASHBOARD);
      })
      .catch(err => {
        toast.add(err.message, 'error');
        setSubmitting(false);
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
          
          <ButtonWrapper>
            <Button type="submit" disabled={props.isSubmitting}>UPDATE</Button>
          </ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
