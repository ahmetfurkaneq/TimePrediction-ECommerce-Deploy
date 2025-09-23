import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from '../api/axiosConfig';
import { decodeJwt, normalizeRole } from '../utils/jwt';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : null;   // { token, username, roles }
  });
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const token = auth?.token ?? null;

  // Rolleri her zaman garantile: login cevabından yoksa JWT'den oku
  const myRoles = useMemo(() => {
    if (!auth?.token) return [];
    if (Array.isArray(auth?.roles) && auth.roles.length) return auth.roles;
    const payload = decodeJwt(auth.token);
    return Array.isArray(payload?.roles) ? payload.roles : [];
  }, [auth]);

  const isAuthenticated = !!token;

  const login = ({ token, username, roles }) => {
    // fallback: roles yoksa JWT'den çıkar
    let finalRoles = Array.isArray(roles) && roles.length ? roles : [];
    if (!finalRoles.length) {
      const payload = decodeJwt(token);
      finalRoles = Array.isArray(payload?.roles) ? payload.roles : [];
    }
    const next = { token, username, roles: finalRoles };
    setAuth(next);
    localStorage.setItem('auth', JSON.stringify(next));
    fetchUser(token); // token paramıyla çağır
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    setUser(null);
  };

  // token parametresi al: setAuth sonrasında closure sorunlarını önler
  const fetchUser = async (tk = token) => {
    if (!tk) { setInitializing(false); return; }
    try {
      const res = await axios.get('/user/me'); // interceptor Authorization ekler
      setUser(res.data);
    } catch (err) {
      const s = err?.response?.status;
      if (s === 401 || s === 403) logout();
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => { fetchUser(token); /* eslint-disable-next-line */ }, [token]);

  // Yardımcılar
  const hasRole = (role) => {
    const need = normalizeRole(role); // "ROLE_ADMIN" veya "ADMIN" -> "ADMIN"
    const mine = new Set(myRoles.map(normalizeRole));
    // user?.admin true ise ADMIN yetkisi gibi kabul et
    return mine.has(need) || (need === 'ADMIN' && user?.admin === true);
  };

  const value = { auth, token, roles: myRoles, user, isAuthenticated, initializing, login, logout, hasRole };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
