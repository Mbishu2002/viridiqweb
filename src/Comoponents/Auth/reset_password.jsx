// src/pages/ResetPassword.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required')
});

const ResetPassword = () => (
  <div className="container">
    <h1>Reset Password</h1>
    <Formik
      initialValues={{ newPassword: '', confirmPassword: '' }}
      validationSchema={ResetPasswordSchema}
      onSubmit={values => {
        // Handle reset password logic here
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <Field type="password" name="newPassword" />
            <ErrorMessage name="newPassword" component="div" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <button type="submit">Reset Password</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ResetPassword;
