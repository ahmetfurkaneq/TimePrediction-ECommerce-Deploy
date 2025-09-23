// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      // backend: { token, username, roles }
      const { token, username: u, roles } = res.data;
      login({ token, username: u, roles });   // <— nesne olarak ver
      setError('');
      navigate('/');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 403 || err.response?.status === 401) {
        setError("Şifre veya kullanıcı adı hatalı!");
      } else {
        setError("Giriş başarısız, sunucuya erişilemiyor.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <Row>
        <Col>
          <Card bg="dark" text="light" className="w-8 h-5 shadow-lg rounded">
            <Card.Body>
              <h3 className="text-center mb-4">Giriş Yap</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kullanıcı adınızı giriniz"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Şifrenizi giriniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <div className="d-grid">
                  <Button variant="light" type="submit">Giriş Yap</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
