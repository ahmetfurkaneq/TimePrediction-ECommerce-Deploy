// src/pages/Register.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../components/user/RegisterForm';

const Register = () => {
  return (
    <Container className="mt-5">
      <RegisterForm />
    </Container>
  );
};

export default Register;
