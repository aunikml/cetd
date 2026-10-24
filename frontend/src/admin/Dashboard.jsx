import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  Button, List, ListItem, ListItemText, ListItemIcon, Stack
} from '@mui/material';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../theme/tokens';
import api from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    slides: 3,
    focusAreas: 3,
    platforms: 4,
    research: 4,
    inquiries: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [slidesRes, inqRes] = await Promise.all([
          api.get('/cms/hero-slides/'),
          api.get('/cms/inquiries/').catch(() => ({ data: [] })),
        ]);
        setStats((prev) => ({
          ...prev,
          slides: slidesRes.data?.length || 3,
          inquiries: inqRes.data?.length || 0,
        }));
      } catch (err) {
        // Fallback
      }
    };
    fetchCounts();
  }, []);

  const statCards = [
    { title: 'Active Hero Slides', count: stats.slides, icon: ViewCarouselIcon, color: tokens.colors.primary[500], path: '/admin-portal/hero-slides' },
    { title: 'Core Focus Areas', count: stats.focusAreas, icon: SchoolIcon, color: tokens.colors.secondary[500], path: '/admin-portal/focus-areas' },
    { title: 'Interactive Platforms', count: stats.platforms, icon: DevicesIcon, color: tokens.colors.accent[500], path: '/admin-portal/platforms' },
    { title: 'Research Publications', count: stats.research, icon: AutoStoriesIcon, color: '#9333EA', path: '/admin-portal/research' },
    { title: 'Partnership Inquiries', count: stats.inquiries, icon: EmailOutlinedIcon, color: '#D97706', path: '/admin-portal/inquiries' },
  ];

  return (
    <Box>
      {/* Top Welcome Banner */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h4" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ letterSpacing: '-0.02em', mb: 0.5, fontSize: '1.625rem' }}>
          Welcome to CEDR Content Studio
        </Typography>
        <Typography variant="body1" color={tokens.colors.neutral[600]} sx={{ fontSize: '0.875rem' }}>
          Logged in as <strong>{user?.username}</strong> ({user?.role}). Manage public website modules, hero slides, interactive platform demos, and partner leads.
        </Typography>
      </Box>

      {/* Metrics Row */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={card.title}>
              <Card
                sx={{
                  borderRadius: `${tokens.radius.lg}px`,
                  border: `1px solid ${tokens.colors.neutral[200]}`,
                  backgroundColor: '#FFFFFF',
                  boxShadow: tokens.shadows.xs,
                  transition: 'all 200ms ease',
                  '&:hover': {
                    borderColor: card.color,
                    boxShadow: tokens.shadows.md,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: `${tokens.radius.md}px`,
                        backgroundColor: `${card.color}14`,
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography variant="h4" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ fontSize: '1.5rem' }}>
                      {card.count}
                    </Typography>
                  </Box>
                  <Typography variant="caption" fontWeight={700} color={tokens.colors.neutral[500]} sx={{ fontSize: '0.75rem' }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Role Capabilities & Instructions */}
      <Grid container spacing={3.5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: 3, borderRadius: `${tokens.radius.lg}px`, border: `1px solid ${tokens.colors.neutral[200]}`, boxShadow: tokens.shadows.sm, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
              <VerifiedUserIcon sx={{ color: tokens.colors.primary[500], fontSize: 22 }} />
              <Typography variant="h6" fontWeight={800} color={tokens.colors.primary[500]} sx={{ fontSize: '1.0625rem' }}>
                Your Role Permissions ({user?.role})
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: tokens.colors.neutral[600], mb: 2, fontSize: '0.8125rem' }}>
              The CEDR CMS implements hierarchical Role-Based Access Control (RBAC). Here is what your account can perform:
            </Typography>

            <List disablePadding>
              {user?.role === 'super_admin' && (
                <>
                  <ListItem disableGutters sx={{ py: 0.6 }}>
                    <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 18 }} /></ListItemIcon>
                    <ListItemText primary="User & Role Management: Create new content managers and assign role tiers." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.6 }}>
                    <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 18 }} /></ListItemIcon>
                    <ListItemText primary="Hero Slider: Add, edit, reorder, and change themes of dynamic slides." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.6 }}>
                    <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 18 }} /></ListItemIcon>
                    <ListItemText primary="All CMS Modules: Focus areas, platforms, research briefs, and partnership inquiries." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                </>
              )}

              {user?.role === 'content_manager' && (
                <>
                  <ListItem disableGutters sx={{ py: 0.6 }}>
                    <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon color="secondary" sx={{ fontSize: 18 }} /></ListItemIcon>
                    <ListItemText primary="Manage Hero Slides, Focus Areas, Roadmap, and Team Leadership." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.6 }}>
                    <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon color="secondary" sx={{ fontSize: 18 }} /></ListItemIcon>
                    <ListItemText primary="Review and manage incoming institutional partnership inquiries." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                </>
              )}

              {user?.role === 'platform_editor' && (
                <ListItem disableGutters sx={{ py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon color="info" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Manage Platform Showcases, VLE specifications, AI demo configurations, and tech stacks." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                </ListItem>
              )}

              {user?.role === 'research_editor' && (
                <ListItem disableGutters sx={{ py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 26 }}><CheckCircleOutlinedIcon sx={{ color: '#9333EA', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Create, update, and publish applied research publications, policy briefs, and abstracts." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: 3, borderRadius: `${tokens.radius.lg}px`, border: `1px solid ${tokens.colors.neutral[200]}`, height: '100%', backgroundColor: '#FFFFFF', boxShadow: tokens.shadows.sm }}>
            <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} gutterBottom sx={{ fontSize: '1.0625rem' }}>
              Quick Navigation
            </Typography>
            <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ mb: 2.5, fontSize: '0.8125rem' }}>
              Jump straight into content editing or review live public frontend.
            </Typography>

            <Stack spacing={1.5}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/admin-portal/hero-slides"
                startIcon={<ViewCarouselIcon sx={{ fontSize: 18 }} />}
                fullWidth
                sx={{ justifyContent: 'flex-start', height: 40, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem' }}
              >
                Edit Modern Hero Slides
              </Button>

              <Button
                variant="outlined"
                component={RouterLink}
                to="/admin-portal/inquiries"
                startIcon={<EmailOutlinedIcon sx={{ fontSize: 18 }} />}
                fullWidth
                sx={{ justifyContent: 'flex-start', height: 40, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem', borderColor: tokens.colors.neutral[300] }}
              >
                View Institutional Inquiries
              </Button>

              {user?.role === 'super_admin' && (
                <Button
                  variant="outlined"
                  color="error"
                  component={RouterLink}
                  to="/admin-portal/users"
                  fullWidth
                  sx={{ justifyContent: 'flex-start', height: 40, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem' }}
                >
                  Manage Content Managers & Roles
                </Button>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
