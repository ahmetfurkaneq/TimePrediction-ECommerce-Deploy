// src/components/admin/AdminTabs.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Tab = ({ to, label, end }) => (
  <Nav.Item>
    <Nav.Link
      as={NavLink}
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'px-4 py-2 rounded-pill border transition',
          isActive
            ? 'bg-primary text-white border-primary shadow-sm'
            : 'bg-light text-dark border-0'
        ].join(' ')
      }
    >
      {label}
    </Nav.Link>
  </Nav.Item>
);

export default function AdminTabs() {
  return (
    <Nav variant="pills" className="justify-content-center gap-2 mb-4">
      <Tab to="/admin/products" label="ProductSettings" end />
      <Tab to="/admin/users" label="UserSettings" />
    </Nav>
  );
}
