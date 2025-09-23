import React, { useEffect, useState } from 'react';
import { Alert, Spinner, Card } from 'react-bootstrap';
import { showBudget } from '../../api/userApi';

const BudgetDisplay = ({ username }) => {
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await showBudget(username);
        setBudget(res.data);
      } catch {
        setBudget('error');
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, [username]);

  return (
    <Card className="p-3">
      <h5>Bakiye</h5>
      {loading ? <Spinner animation="border" size="sm" /> :
        budget === 'error' ? <Alert variant="danger">Bakiye alınamadı</Alert> :
        <h4>{budget.toFixed(2)} ₺</h4>}
    </Card>
  );
};

export default BudgetDisplay;
