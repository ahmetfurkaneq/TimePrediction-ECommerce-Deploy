import React, { useEffect, useState } from 'react';
import { createProduct, getProductById, updateProduct } from '../../api/AdminProductApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';

const empty = { name:'', price:'', stock:0, category:'' };

export default function ProductDetail(){
  const { id } = useParams();
  const isCreate = id === 'new';
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(!isCreate);
  const nav = useNavigate();

  useEffect(()=>{
    const run=async()=>{
      if (isCreate) return;
      try{
        const { data } = await getProductById(id);
        setForm({
          name: data.name ?? '',
          price: data.price?.toString() ?? '',
          stock: data.stock ?? 0,
          category: data.category ?? ''
        });
      } catch {
        alert('Ürün bulunamadı');
        nav('/admin/products',{replace:true});
      } finally { setLoading(false); }
    };
    run();
  },[id]);

  const onChange = e => {
    const {name, value} = e.target;
    setForm(s => ({...s, [name]: name==='stock'? Number(value||0): value}));
  };

  const onSubmit = async (e)=>{
    e.preventDefault();
    const payload = { ...form, price: String(form.price), stock: Number(form.stock) };
    try{
      if (isCreate) await createProduct(payload); else await updateProduct(id, payload);
      nav('/admin/products');
    }catch{ alert('Kaydetme hatası'); }
  };

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center" style={{ minHeight: 300 }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm rounded-3 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style={{height:4}} />
            <Card.Body className="p-4">
              <Card.Title as="h2" className="h5 mb-4">{isCreate ? 'Yeni Ürün' : 'Ürün Düzenle'}</Card.Title>

              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Ad</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={onChange} required />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="price">
                      <Form.Label>Fiyat (₺)</Form.Label>
                      <Form.Control name="price" value={form.price} onChange={onChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="stock">
                      <Form.Label>Stok</Form.Label>
                      <Form.Control type="number" min={0} name="stock" value={form.stock} onChange={onChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="category">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control name="category" value={form.category} onChange={onChange} />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary" onClick={()=>nav(-1)}>İptal</Button>
                  <Button variant="primary" type="submit">Kaydet</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
