import React, { useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { gsap } from 'gsap';


const ProductCard = ({ product, onPurchase }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <Card ref={cardRef} className="m-2 shadow-sm rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" />
      <Card.Body className="space-y-2">
        <Card.Title className="text-lg font-semibold">{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Kategori: {product.category}
        </Card.Subtitle>
        <Card.Text>Fiyat: {product.price} ₺</Card.Text>
        <Card.Text>Stok: {product.stock}</Card.Text>
        <Button
          className='w-100 bg-dark text-light p-2 hover:opacity-90'
          variant="dark"
          onClick={() => onPurchase(product.id, product.name)}
          disabled={product.stock === 0}
        >
          Satın Al
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
