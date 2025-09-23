import React from 'react';
import { Button } from 'react-bootstrap';
import { purchaseProduct } from '../../api/productApi';

const PurchaseButton = ({ id, productName, onSuccess }) => {
  const handleClick = async () => {
    try {
      const res = await purchaseProduct(id);
      if (res.data && onSuccess) onSuccess();
    } catch {
      alert("Satın alma başarısız.");
    }
  };

  return (
    <Button onClick={handleClick} variant="success">
      Satın Al
    </Button>
  );
};

export default PurchaseButton;
    