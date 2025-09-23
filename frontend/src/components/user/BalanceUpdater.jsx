import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { showBudget, updateBalance } from '../../api/userApi';
import { useAuth } from '../../context/AuthContext';
const BalanceUpdater = ({ username }) => {
  const [money, setMoney] = useState('');
  const [isAdding, setIsAdding] = useState(true);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateBalance(username, parseFloat(money), isAdding);
      setMessage(res.data ? "Bakiye güncellendi." : "Güncellenemedi.");
    } catch {
      setMessage("Bir hata oluştu.");
    }
  };
  
  return (
    <Card className="p-4">
      <h5>Bakiye Güncelle</h5>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            placeholder="Tutar"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Check
          type="radio"
          label="Ekle"
          name="balanceAction"
          checked={isAdding}
          onChange={() => setIsAdding(true)}
        />
        <Form.Check
          type="radio"
          label="Çıkar"
          name="balanceAction"
          checked={!isAdding}
          onChange={() => setIsAdding(false)}
        />
        <Button type="submit" className="w-100 mt-2" variant="dark">Uygula</Button>
      </Form>
    </Card>
  );
};

export default BalanceUpdater;
