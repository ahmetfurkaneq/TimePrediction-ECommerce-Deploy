import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { normalizeRole } from "../utils/jwt";

export default function PrivateRoute({ children, roles }) {
  const { isAuthenticated, initializing, user, roles: myRoles } = useAuth();

  if (initializing) return <div style={{ padding: 24 }}>Yükleniyor...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles?.length) {
    const mine = new Set(myRoles.map(normalizeRole)); // ["ADMIN","USER",...]
    const need = roles.map(normalizeRole);            // ["ADMIN", ...]
    const isAdminFlag = user?.admin === true;

    const allowed = need.some(r => mine.has(r) || (r === 'ADMIN' && isAdminFlag));
    if (!allowed) return <Navigate to="/" replace />;
  }

  return children;
}
