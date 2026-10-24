import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Alert, Divider, Chip, Stack, CircularProgress, Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate, Link as RouterLink } from 'react-router-dom';

export default function AdminLogin() {
  const { login, loading, user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to admin dashboard
  if (user) {
    return <Navigate to="/admin-portal/dashboard" replace />;
  }

  const handleLogin = async (u, p) => {
    setError(null);
    setSubmitting(true);
    const res = await login(u || username, p || password);
    setSubmitting(false);
    if (res.success) {
      navigate('/admin-portal/dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        backgroundImage: 'radial-gradient(rgba(2, 132, 199, 0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          borderRadius: 4,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0D3B75 0%, #0369A1 100%)',
            color: '#FFFFFF',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            CEDR CMS Portal
          </Typography>
          <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
            Center for EduTech Development and Research
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              size="small"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={submitting || loading}
              sx={{
                mt: 2.5,
                mb: 2,
                py: 1.2,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #0D3B75 0%, #0284C7 100%)',
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In to CMS'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="#64748B" fontWeight={700}>
              ONE-CLICK ROLE DEMO LOGINS
            </Typography>
          </Divider>

          {/* Quick Demo Login Buttons */}
          <Stack spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleLogin('admin', 'admin123')}
              sx={{ justifyContent: 'space-between', borderColor: '#CBD5E1', py: 1 }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" fontWeight={700} color="#0D3B75" display="block">
                  👑 Super Admin (Full Access & User Roles)
                </Typography>
                <Typography variant="caption" color="#64748B">
                  user: <code>admin</code> / pass: <code>admin123</code>
                </Typography>
              </Box>
              <Chip label="All Access" size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => handleLogin('content_manager', 'manager123')}
              sx={{ justifyContent: 'space-between', borderColor: '#CBD5E1', py: 1 }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" fontWeight={700} color="#16A34A" display="block">
                  ✍️ Senior Content Manager
                </Typography>
                <Typography variant="caption" color="#64748B">
                  user: <code>content_manager</code> / pass: <code>manager123</code>
                </Typography>
              </Box>
              <Chip label="Content + Inquiries" size="small" color="secondary" sx={{ height: 20, fontSize: '0.65rem' }} />
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => handleLogin('platform_editor', 'editor123')}
              sx={{ justifyContent: 'space-between', borderColor: '#CBD5E1', py: 1 }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" fontWeight={700} color="#0284C7" display="block">
                  💻 Course & Platform Editor
                </Typography>
                <Typography variant="caption" color="#64748B">
                  user: <code>platform_editor</code> / pass: <code>editor123</code>
                </Typography>
              </Box>
              <Chip label="Platform Tech" size="small" color="info" sx={{ height: 20, fontSize: '0.65rem' }} />
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => handleLogin('research_editor', 'research123')}
              sx={{ justifyContent: 'space-between', borderColor: '#CBD5E1', py: 1 }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" fontWeight={700} color="#9333EA" display="block">
                  🔬 Research Contributor
                </Typography>
                <Typography variant="caption" color="#64748B">
                  user: <code>research_editor</code> / pass: <code>research123</code>
                </Typography>
              </Box>
              <Chip label="Research Only" size="small" sx={{ backgroundColor: '#F3E8FF', color: '#9333EA', height: 20, fontSize: '0.65rem' }} />
            </Button>
          </Stack>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ArrowBackIcon />}
              size="small"
              sx={{ color: '#64748B' }}
            >
              Back to Public Website
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
