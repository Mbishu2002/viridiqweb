import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../Assets/logo.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required')
});

const Login = () => (
  <div className="login-container">
    <div className="login-card">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="logo-auth" />
      </div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          // Handle login logic here
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" className="btn">Login</button>
          </Form>
        )}
      </Formik>
      <p className="links">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p className="links">
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
      <p className="links">
        <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-service">Terms of Service</Link>
      </p>
    </div>
  </div>
);

export default Login;
