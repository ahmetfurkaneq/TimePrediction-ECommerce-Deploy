import React, { useEffect, useMemo, useState } from 'react';
import { deleteUser, getAllUsers } from '../../api/AdminUserApi';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

export default function UserListAdmin(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const load = async ()=>{
    setLoading(true);
    try { const {data}=await getAllUsers(); setItems(data||[]); }
    catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(()=>{ load(); },[]);

  const filtered = useMemo(()=>{
    const s=q.toLowerCase().trim();
    return s ? items.filter(u =>
      u.username?.toLowerCase().includes(s)||u.email?.toLowerCase().includes(s)
    ) : items;
  },[items,q]);

  const onDelete = async (id)=>{
    if(!confirm('Silinsin mi?')) return;
    await deleteUser(id).catch(()=>alert('Silme hatası'));
    load();
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
      <Row className="mb-3 g-3 align-items-center">
        <Col md={8}>
          <Form.Control
            placeholder="Kullanıcı ara..."
            value={q}
            onChange={e=>setQ(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-md-end">
          <Button variant="primary" onClick={()=>nav('/admin/users/new')}>Yeni Kullanıcı</Button>
        </Col>
      </Row>

      {!filtered.length ? (
        <Alert variant="warning">Kullanıcı bulunamadı.</Alert>
      ) : (
        <Row className="g-4">
          {filtered.map(u=>(
            <Col key={u.id} md={4}>
              <Card className="shadow-sm rounded-3 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style={{height:4}} />
                <Card.Body>
                  <div className="fs-5 fw-semibold">{u.username}</div>
                  <div className="text-muted small">{u.email || '-'}</div>
                  <div className="small mt-2">Bakiye: {u.budget} ₺</div>
                  <div className="small">Ad Soyad: {u.firstName || '-'} {u.lastName || ''}</div>
                  <div className="small">Durum: {u.active ? 'Aktif' : 'Pasif'}</div>

                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button size="sm" variant="dark" onClick={()=>nav(`/admin/users/${u.id}`)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={()=>onDelete(u.id)}>Sil</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
