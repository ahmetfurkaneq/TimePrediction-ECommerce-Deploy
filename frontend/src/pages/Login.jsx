// src/pages/Login.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../components/user/LoginForm';

const Login = ({ onLogin }) => {
  return (
    <Container className="mt-5">
      <LoginForm onLogin={onLogin} />
    </Container>
  );
};

export default Login;
