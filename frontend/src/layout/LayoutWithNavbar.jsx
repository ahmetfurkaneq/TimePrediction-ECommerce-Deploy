import React from 'react';
import AppNavbar from '../components/common/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';


const LayoutWithNavbar = ({currentUser,handleLogout}) => {
  return (
    <>
      <AppNavbar username={currentUser?.username} onLogout={handleLogout} />
      <Outlet />
      <Footer/>
    </>
  );
};

export default LayoutWithNavbar;
