
import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutWithoutNavbar = () => {
  return <Outlet />;  // Sadece alt rotayı göster, ekstra bir şey yok
};

export default LayoutWithoutNavbar;
