// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { getAllProducts, getProductsByCategory, getCategories, purchaseProduct } from '../api/productApi';
import ProductCard from '../components/product/ProductCard';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault?.();
    setQuery((q) => q.trim());
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      setCategories([]);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === '') return loadProducts();

    setLoading(true);
    try {
      const res = await getProductsByCategory(category);
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // (İsteğe bağlı) PrivateRoute kullanıyorsan bu kısım gereksiz.
  if (!localStorage.getItem('token')) {
    navigate('/login');
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Ürünler</h2>

      {/* Üst arama satırı: kategori / input / Ara */}
      <Row className="mb-3 g-3 align-items-end">
        <Col md={4}>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Tüm Kategoriler</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="Ürün ara"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e)=> e.key==='Enter' && handleSearch(e)}
          />
        </Col>

      </Row>

      {message && <Alert variant="info">{message}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {products
            .filter((p) => p.name?.toLowerCase().includes(query.toLowerCase()))
            .map((product) => (
              <Col key={product.id} md={4}>
                <ProductCard
                  product={product}
                  onPurchase={async (id, name) => {
                    try {
                      await purchaseProduct(id);
                      setMessage(`"${name}" satın alındı.`);
                      loadProducts();
                    } catch (err) {
                      console.error("Satın alma hatası:", err);
                      setMessage(`"${name}" satın alınamadı.`);
                    }
                  }}
                />
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;
