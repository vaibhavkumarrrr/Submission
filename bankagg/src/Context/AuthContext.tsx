import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { saveToken, getToken, clearToken, saveMandatoryId, getMandatoryId, clearMandatoryId } from '../services/storage';
import { decodeJwt, isExpired } from '../services/auth';
import type { DecodedToken } from '../services/auth';

type User = {
  username?: string;
  roles: string[];
  sub?: string;
  claims?: DecodedToken;
  mandatoryId?: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
};

type AuthContextValue = AuthState & {
  login: (token: string, rolesFromApi?: string[], mandatoryId?: string) => void;
  logout: () => void;
  hasRole: (...allowed: string[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ token: null, user: null });

  
  useEffect(() => {
    const existing = getToken();
    const storedMandatoryId = getMandatoryId() || undefined;

    if (existing && !isExpired(existing)) {
      const claims = decodeJwt(existing);
      const roles = Array.isArray(claims?.roles) ? claims!.roles.map(r => String(r).toLowerCase()) : [];
      setState({
        token: existing,
        user: {
          username: (claims?.username || claims?.sub) as string | undefined,
          roles,
          sub: claims?.sub as string | undefined,
          claims,
          mandatoryId: storedMandatoryId, 
        },
      });
    } else {
      clearToken();
      clearMandatoryId();
      setState({ token: null, user: null });
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    token: state.token,
    user: state.user,
    login: (token, rolesFromApi, mandatoryId) => {
      saveToken(token);
      if (mandatoryId) saveMandatoryId(mandatoryId);

      const claims = decodeJwt(token);
      const roles = (rolesFromApi || []).map(r => String(r).toLowerCase());

      setState({
        token,
        user: {
          username:(claims?.username || claims?.sub) as string | undefined,
          roles,
          mandatoryId
        },
      });
    },
    logout: () => {
      clearToken();
      clearMandatoryId();
      setState({ token: null, user: null });
    },
    hasRole: (...allowed: string[]) => {
      if (!allowed.length) return true;
      const userRoles = state.user?.roles || [];
      const required = allowed.map(r => r.toLowerCase());
      return userRoles.some(r => required.includes(r));
    },
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};