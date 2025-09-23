// src/pages/admin/ProductListAdmin.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Form, Button } from "react-bootstrap";
import { getAllProducts, deleteProduct } from "../../api/AdminProductApi";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { useNavigate } from "react-router-dom";

export default function ProductListAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(""); // kategori seçimi
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProducts();
      setItems(data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Kategorileri ürünlerden türet (ayrı API gerekmesin)
  const categories = useMemo(() => {
    const set = new Set(items.map(p => p.category).filter(Boolean));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return items.filter(p => {
      const byCat = cat ? p.category === cat : true;
      const byQ =
        !s ||
        p.name?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s);
      return byCat && byQ;
    });
  }, [items, q, cat]);

  const onDelete = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    try {
      await deleteProduct(id);
      setMsg("Ürün silindi.");
      load();
    } catch {
      setMsg("Silme hatası.");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center" style={{ minHeight: "40vh" }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Admin</h2>

      <Row className="mb-3 g-3 align-items-end">
        <Col md={4}>
          <Form.Select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">Tüm Kategoriler</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            placeholder="Ürün ara"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-md-end">
          <Button variant="primary" onClick={() => nav("/admin/products/new")}>
            Yeni Ürün
          </Button>
        </Col>
      </Row>

      {msg && <Alert variant="info">{msg}</Alert>}
      {!filtered.length ? (
        <Alert variant="warning">Ürün bulunamadı.</Alert>
      ) : (
        <Row className="g-4">
          {filtered.map((p) => (
            <Col key={p.id} md={4}>
              <AdminProductCard
                product={p}
                onEdit={() => nav(`/admin/products/${p.id}`)}
                onDelete={() => onDelete(p.id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
