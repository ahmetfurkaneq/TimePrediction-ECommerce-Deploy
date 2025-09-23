import React, { useEffect, useState } from 'react';
import { getAllProducts, purchaseProduct } from '../../api/productApi';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseMessage, setPurchaseMessage] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handlePurchase = async (id, productName) => {
    try {
      const res = await purchaseProduct(id);
      if (res.data) {
        setPurchaseMessage(`"${productName}" ürünü başarıyla satın alındı.`);
      } else {
        setPurchaseMessage(`"${productName}" satın alınamadı.`);
      }
    } catch { 
      setPurchaseMessage("Satın alma sırasında bir hata oluştu.");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (!products.length) return <Alert variant="warning">Ürün bulunamadı.</Alert>;

  return (
    <>
      {purchaseMessage && <Alert variant="info">{purchaseMessage}</Alert>}
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <ProductCard product={product} onPurchase={handlePurchase} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
