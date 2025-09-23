import React, { useEffect, useState } from 'react';
import { createUser, getUserById, updateUser } from '../../api/AdminUserApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';

const empty = { username:'', email:'', password:'', budget:'', firstName:'', lastName:'', active:true };

export default function UserDetail(){
  const { id } = useParams();
  const isCreate = id==='new';
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(!isCreate);
  const nav = useNavigate();

  useEffect(()=>{
    const run=async()=>{
      if(isCreate) return;
      try{
        const {data}=await getUserById(id);
        setForm({
          username: data.username ?? '',
          email: data.email ?? '',
          password: '',
          budget: data.budget?.toString() ?? '',
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          active: data.active ?? true,
        });
      }catch{ alert('Kullanıcı bulunamadı'); nav('/admin/users',{replace:true}); }
      finally{ setLoading(false); }
    }; run();
  },[id]);

  const onChange = e=>{
    const {name, type, checked, value}=e.target;
    setForm(s=>({...s, [name]: type==='checkbox'? checked : value}));
  };

  const onSubmit = async (e)=>{
    e.preventDefault();
    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      ...(form.password ? { password: form.password } : {}),
      budget: form.budget.trim(),
      firstName: form.firstName.trim() || null,
      lastName: form.lastName.trim() || null,
      active: !!form.active,
    };
    try{
      if (isCreate) await createUser(payload); else await updateUser(id, payload);
      nav('/admin/users');
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
              <Card.Title as="h2" className="h5 mb-4">{isCreate ? 'Yeni Kullanıcı' : 'Kullanıcı Düzenle'}</Card.Title>

              <Form onSubmit={onSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="username">
                      <Form.Label>Kullanıcı Adı</Form.Label>
                      <Form.Control name="username" value={form.username} onChange={onChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>E-posta</Form.Label>
                      <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Şifre {isCreate ? '' : '(değiştirmek için girin)'}</Form.Label>
                      <Form.Control type="password" name="password" value={form.password} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="budget">
                      <Form.Label>Bakiye (₺)</Form.Label>
                      <Form.Control name="budget" value={form.budget} onChange={onChange} />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>Ad</Form.Label>
                      <Form.Control name="firstName" value={form.firstName} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Soyad</Form.Label>
                      <Form.Control name="lastName" value={form.lastName} onChange={onChange} />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Check
                      id="active"
                      name="active"
                      checked={form.active}
                      onChange={onChange}
                      label="Aktif"
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
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
