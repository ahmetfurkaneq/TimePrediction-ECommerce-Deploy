import React, { useEffect, useState } from 'react';
import { getCategories, getProductsByCategory } from '../../api/productApi';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleChange = async (e) => {
    const cat = e.target.value;
    setSelected(cat);
    try {
      const res = await getProductsByCategory(cat);
      setFilteredProducts(res.data);
      setError(null);
    } catch {
      setFilteredProducts([]);
      setError("Ürünler alınamadı.");
    }
  };

  return (
    <div className="mb-4">
      <Form>
        <Form.Group as={Row} controlId="categorySelect">
          <Form.Label column sm={2}>Kategori Seç:</Form.Label>
          <Col sm={10}>
            <Form.Select onChange={handleChange} value={selected}>
              <option value="">Kategori Seçin</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-3">
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4}>
            <ProductCard product={product} onPurchase={() => {}} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryFilter;
