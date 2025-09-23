// Home.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
   
    <Container className={`mt-5 p-4 rounded shadow-sm bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'}`}>
      <h1>Otomat Makinesi'ne Hoş Geldiniz!</h1>
      <p>Ürünleri görüntülemek için menüyü kullanın.</p>
    </Container>
  );
};

export default Home;
