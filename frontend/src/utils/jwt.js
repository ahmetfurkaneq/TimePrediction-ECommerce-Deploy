export function decodeJwt(token) {
  try {
    const [, payload] = token.split('.');
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch { return null; }
}

export function normalizeRole(r) {
  if (!r) return '';
  return r.startsWith('ROLE_') ? r.slice(5) : r; // "ROLE_ADMIN" -> "ADMIN"
}