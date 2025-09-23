// src/pages/Profile.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BudgetDisplay from '../components/user/BudgetDisplay';
import BalanceUpdater from '../components/user/BalanceUpdater';
import EditUserForm from '../components/user/EditUserForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, initializing } = useAuth();

  if (initializing) return <p style={{ padding: 24 }}>Kullanıcı bilgisi yükleniyor...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return <p style={{ padding: 24 }}>Kullanıcı bilgisi alınamadı.</p>;

  // budget güvenli format
  const budgetNum = typeof user.budget === 'number' ? user.budget : Number(user.budget ?? 0);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Profil Bilgileri</h2>

      <Row className="mb-4">
        <Col md={6}>
          <BudgetDisplay username={user.username} />
        </Col>
        <Col md={6}>
          <BalanceUpdater username={user.username} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="p-4 shadow-sm">
            <h5>Kullanıcı Bilgileri</h5>
            <ul>
              <li><strong>Kullanıcı Adı:</strong> {user.username}</li>
              <li><strong>E-Posta:</strong> {user.email}</li>
              <li><strong>Bakiye:</strong> {budgetNum.toFixed(2)} ₺</li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <EditUserForm currentUsername={user.username} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
