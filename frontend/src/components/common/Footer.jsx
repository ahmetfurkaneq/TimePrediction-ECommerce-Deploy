import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { gsap } from 'gsap';

const Footer = () => {
  const { theme } = useTheme();
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, []);

  return (
    <footer
      className={`py-3 mt-auto ${
        theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'
      } border-top`}
      ref={footerRef}
    >
      <Container className="text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} Otomat Makinesi | Tüm hakları saklıdır.
        </p>
        <small>İletişim: destek@otomatmakinesi.com</small>
      </Container>
    </footer>
  );
};

export default Footer;
