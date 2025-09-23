// src/components/common/AppNavbar.jsx
import React, { useEffect, useRef, useMemo } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { gsap } from 'gsap';

const AppNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout, isAdmin: isAdminFromCtx, roles = [], hasRole } = useAuth();
  const navigate = useNavigate();
  const brandRef = useRef(null);

  useEffect(() => {
    if (brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ---- ROL KONTROLLERİ (sağlam fallback’li) ----
  const isAdmin = useMemo(() => {
    // 1) Context isAdmin varsa onu kullan
    if (typeof isAdminFromCtx === 'boolean') return isAdminFromCtx;
    // 2) /me'deki user.admin true ise admin say
    if (user?.admin === true) return true;
    // 3) login/JWT’den gelen roller
    return roles.includes('ROLE_ADMIN') || roles.includes('ADMIN');
  }, [isAdminFromCtx, user, roles]);

  const isCustomer = useMemo(() => {
    // hasRole varsa tercih et
    if (typeof hasRole === 'function') return hasRole('CUSTOMER') || hasRole('ROLE_CUSTOMER');
    // değilse roller dizisinden kontrol et
    return roles.includes('ROLE_CUSTOMER') || roles.includes('CUSTOMER');
  }, [hasRole, roles]);

  return (
    <>
      <Navbar
        bg={theme === 'dark' ? 'dark' : 'light'}
        variant={theme === 'dark' ? 'dark' : 'light'}
        expand="lg"
        className="mb-0 shadow-sm"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand ref={brandRef} className="fw-bold" style={{ cursor: 'pointer' }}>
              <span className="text-primary">V</span>ending<span className="text-primary">M</span>achine
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center">
              {!isAuthenticated ? (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Giriş</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Kayıt</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/products">
                    <Nav.Link>Ürünler</Nav.Link>
                  </LinkContainer>

                  {/* ADMIN linki */}
                  {isAdmin && (
                    <LinkContainer to="/admin/products">
                      <Nav.Link>Admin</Nav.Link>
                    </LinkContainer>
                  )}

                  {/* İsteğe bağlı: Müşteri Paneli menü linki */}
                  {isCustomer && (
                    <LinkContainer to="/customer">
                      <Nav.Link>Müşteri Paneli</Nav.Link>
                    </LinkContainer>
                  )}

                  <LinkContainer to="/profile">
                    <Nav.Link>
                      Profil{user?.username ? ` (${user.username})` : ''}
                    </Nav.Link>
                  </LinkContainer>

                  <Button
                    variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                    onClick={handleLogout}
                    className="ms-2"
                  >
                    Çıkış Yap
                  </Button>

                  <Button
                    onClick={toggleTheme}
                    size="sm"
                    variant={theme === 'dark' ? 'light' : 'dark'}
                    className="ms-2"
                  >
                    {theme === 'dark' ? 'Aydınlık' : 'Karanlık'} Mod
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ROLE_CUSTOMER için üst bar (yalnızca giriş yaptıysa ve müşteri ise) */}
      {isAuthenticated && isCustomer && (
        <div className="w-100" style={{ background: '#059669' /* bootstrap: bg-success-700 */ }}>
          <Container className="d-flex justify-content-between align-items-center py-1">
            <div className="text-white small">
              🎟️ Müşteri ayrıcalıkları aktif — kampanyalar, kuponlar ve hızlı iade!
            </div>
            <LinkContainer to="/customer">
              <Button size="sm" variant="light">
                Müşteri Alanına Git
              </Button>
            </LinkContainer>
          </Container>
        </div>
      )}

      {/* Navbar ile içerik arasına küçük boşluk (bar varsa bariyle birleşmesin) */}
      <div style={{ height: 12 }} />
    </>
  );
};

export default AppNavbar;
