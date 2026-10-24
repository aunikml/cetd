import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cedr_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cedr_access_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/auth/me/');
      setUser(res.data);
      localStorage.setItem('cedr_user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Failed to fetch user:', err);
      logout();
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login/', { username, password });
      const accessToken = res.data.access;
      setToken(accessToken);
      localStorage.setItem('cedr_access_token', accessToken);
      localStorage.setItem('cedr_refresh_token', res.data.refresh);

      // Fetch user profile
      const userRes = await api.get('/auth/me/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(userRes.data);
      localStorage.setItem('cedr_user', JSON.stringify(userRes.data));
      setLoading(false);
      return { success: true, user: userRes.data };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        error: err.response?.data?.detail || 'Invalid username or password',
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('cedr_access_token');
    localStorage.removeItem('cedr_refresh_token');
    localStorage.removeItem('cedr_user');
  };

  // Check role authorization
  const canAccess = (allowedRoles) => {
    if (!user) return false;
    if (user.is_super_admin || user.role === 'super_admin') return true;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, canAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
