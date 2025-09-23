import React, { useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { gsap } from "gsap";

export default function AdminProductCard({ product, onEdit, onDelete }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  }, []);

  return (
    <Card ref={ref} className="m-2 shadow-sm rounded-xl overflow-hidden bg-white">
      {/* Products kartındaki şerit */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" />
      <Card.Body className="space-y-2 text-gray-900">
        <Card.Title className="text-lg fw-semibold">{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Kategori: {product.category || "-"}</Card.Subtitle>
        <Card.Text>Fiyat: {product.price} ₺</Card.Text>
        <Card.Text>Stok: {product.stock}</Card.Text>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="dark" onClick={onEdit}>Edit</Button>
          <Button variant="danger" onClick={onDelete}>Sil</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
