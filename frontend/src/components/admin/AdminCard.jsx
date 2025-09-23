// src/components/admin/AdminCard.jsx
import React from 'react';

export default function AdminCard({ header = true, children, footer }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {header && (
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      )}
      {/* KRİTİK: kart içindeki tüm yazıyı kontrastlı yap */}
      <div className="p-5 text-gray-900 dark:text-gray-100">{children}</div>
      {footer && (
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
}
