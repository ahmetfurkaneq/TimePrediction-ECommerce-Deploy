import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminTabs from '../../components/admin/AdminTabs';

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <AdminTabs />
      <Outlet />
    </div>
  );
}
