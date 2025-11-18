export type DecodedToken = {
  sub?: string;
  username?: string;
  roles?: string[];
  exp?: number; // seconds since epoch
  [k: string]: unknown;
};

export function decodeJwt(token: string): DecodedToken | undefined {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    // decodeURIComponent(escape(...)) is deprecated; but fine for ASCII. If you have UTF-8 claims consider a robust base64->utf8 method.
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return undefined;
  }
}

export function isExpired(token?: string | null) {
  if (!token) return true;
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return false; // if no exp, treat as not expired
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}

export function normalizedRoles(decoded?: DecodedToken) {
  const roles = Array.isArray(decoded?.roles) ? decoded!.roles : [];
  return roles.map(r => String(r).toLowerCase());
}