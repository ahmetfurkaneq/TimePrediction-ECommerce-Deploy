import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { registerUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (form.password !== form.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      const res = await registerUser({ username: form.username }, form.password);
      if (res.data) {
        navigate('/');
      } else {
        setError("Kayıt başarısız.");
      }
    } catch {
      setError("Sunucu hatası oluştu.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <Row>
        <Col>
          <Card bg="dark" text="light" className="p-4 shadow-lg rounded">
            <Card.Body>
              <h3 className="text-center mb-4">Kayıt Ol</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="bg-dark text-light border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-dark text-light border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Şifre (Tekrar)</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="bg-dark text-light border-secondary"
                    required
                  />
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button variant="light" type="submit">Kayıt Ol</Button>
                </div>

               

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
   