import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { editUser } from '../../api/userApi';

const EditUserForm = ({ currentUsername }) => {
  const [form, setForm] = useState({ newUsername: '', newPassword: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editUser(currentUsername, form.newUsername, form.newPassword);
      setMessage(res.data ? "Bilgiler güncellendi." : "Güncelleme başarısız.");
    } catch {
      setMessage("Bir hata oluştu.");
    }
  };

  return (
    <Card className="p-4">
      <h3 className="mb-3">Bilgileri Güncelle</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Yeni Kullanıcı Adı</Form.Label>
          <Form.Control name="newUsername" value={form.newUsername} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Yeni Şifre</Form.Label>
          <Form.Control name="newPassword" type="password" value={form.newPassword} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="warning" className="w-100">Güncelle</Button>
      </Form>
    </Card>
  );
};

export default EditUserForm;
