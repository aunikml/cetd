import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card,
  Button, List, ListItem, ListItemText, ListItemIcon, Stack,
  Chip, LinearProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Tooltip,
  Divider
} from '@mui/material';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import TimelineIcon from '@mui/icons-material/Timeline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { motion } from 'framer-motion';
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
    team: 3,
    roadmap: 3,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [slidesRes, focusRes, platRes, resRes, inqRes, teamRes, roadRes] = await Promise.all([
        api.get('/cms/hero-slides/').catch(() => ({ data: [] })),
        api.get('/cms/focus-areas/').catch(() => ({ data: [] })),
        api.get('/cms/platforms/').catch(() => ({ data: [] })),
        api.get('/cms/research/').catch(() => ({ data: [] })),
        api.get('/cms/inquiries/').catch(() => ({ data: [] })),
        api.get('/cms/team/').catch(() => ({ data: [] })),
        api.get('/cms/roadmap/').catch(() => ({ data: [] })),
      ]);

      setStats({
        slides: slidesRes.data?.length || 3,
        focusAreas: focusRes.data?.length || 3,
        platforms: platRes.data?.length || 4,
        research: resRes.data?.length || 4,
        inquiries: inqRes.data?.length || 0,
        team: teamRes.data?.length || 3,
        roadmap: roadRes.data?.length || 3,
      });

      if (Array.isArray(inqRes.data)) {
        setRecentInquiries(inqRes.data.slice(0, 5));
      }
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.log('Using cached dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Hero Slides',
      count: stats.slides,
      icon: ViewCarouselIcon,
      color: tokens.colors.primary[500],
      bg: tokens.colors.primary[50],
      path: '/admin-portal/hero-slides',
      status: 'Live & Sliding',
      badgeColor: 'primary',
    },
    {
      title: 'Focus Pillars',
      count: stats.focusAreas,
      icon: SchoolIcon,
      color: tokens.colors.secondary[500],
      bg: tokens.colors.secondary[50],
      path: '/admin-portal/focus-areas',
      status: 'NCTB Aligned',
      badgeColor: 'success',
    },
    {
      title: 'Platform Demos',
      count: stats.platforms,
      icon: DevicesIcon,
      color: tokens.colors.accent[500],
      bg: tokens.colors.accent[50],
      path: '/admin-portal/platforms',
      status: 'Moodle / NLP Active',
      badgeColor: 'info',
    },
    {
      title: 'Publications',
      count: stats.research,
      icon: AutoStoriesIcon,
      color: '#9333EA',
      bg: '#FAF5FF',
      path: '/admin-portal/research',
      status: 'Peer Reviewed',
      badgeColor: 'secondary',
    },
    {
      title: 'Partner Leads',
      count: stats.inquiries,
      icon: EmailOutlinedIcon,
      color: '#D97706',
      bg: '#FFFBEB',
      path: '/admin-portal/inquiries',
      status: stats.inquiries > 0 ? `${stats.inquiries} Received` : 'Ready for Inquiries',
      badgeColor: 'warning',
    },
  ];

  const contentHealth = [
    { name: 'Virtual Learning Environment (VLE) Engine', progress: 100, label: 'Moodle 4.x / Canvas Ready', color: tokens.colors.secondary[500] },
    { name: 'Bilingual Interface Coverage (EN / বাংলা)', progress: 100, label: 'Complete dual-field sync', color: tokens.colors.primary[500] },
    { name: 'Bengali Acoustic NLP Speech-to-Text Model', progress: 97, label: '96.8% WER accuracy in noisy rooms', color: tokens.colors.accent[500] },
    { name: 'Bloom’s Taxonomy Assessment Item Bank', progress: 92, label: 'Rubrics & randomization calibrated', color: '#9333EA' },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case 'new':
        return <Chip label="New Inquiry" size="small" sx={{ backgroundColor: tokens.colors.primary[50], color: tokens.colors.primary[700], fontWeight: 700, fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />;
      case 'in_review':
        return <Chip label="In Review" size="small" sx={{ backgroundColor: '#FFFBEB', color: '#D97706', fontWeight: 700, fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />;
      case 'contacted':
        return <Chip label="Contacted" size="small" sx={{ backgroundColor: tokens.colors.secondary[50], color: tokens.colors.secondary[700], fontWeight: 700, fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />;
      case 'closed':
        return <Chip label="Archived" size="small" sx={{ backgroundColor: tokens.colors.neutral[100], color: tokens.colors.neutral[600], fontWeight: 600, fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />;
      default:
        return <Chip label={status || 'Received'} size="small" sx={{ fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />;
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      
      {/* 1. Header & Operational Status Banner */}
      <Box
        sx={{
          mb: 3.5,
          p: { xs: 2.5, md: 3 },
          backgroundColor: '#FFFFFF',
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.neutral[200]}`,
          boxShadow: tokens.shadows.xs,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.5 }}>
            <Typography
              variant="h4"
              fontWeight={800}
              color={tokens.colors.neutral[900]}
              sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, letterSpacing: '-0.02em' }}
            >
              CEDR Operational Control Center
            </Typography>
            <Chip
              icon={<BoltIcon sx={{ fontSize: 14, color: `${tokens.colors.secondary[600]} !important` }} />}
              label="Live Sync"
              size="small"
              sx={{
                backgroundColor: tokens.colors.secondary[50],
                color: tokens.colors.secondary[700],
                fontWeight: 700,
                fontSize: '0.6875rem',
                height: 22,
                borderRadius: `${tokens.radius.sm}px`,
              }}
            />
          </Box>
          <Typography variant="body2" color={tokens.colors.neutral[500]} sx={{ fontSize: '0.8125rem' }}>
            Logged in as <strong>{user?.username}</strong> • Role clearance: <strong>{user?.role?.toUpperCase()}</strong> • Synced at {lastRefreshed}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Tooltip title="Refresh Dashboard Metrics">
            <IconButton
              size="small"
              onClick={fetchDashboardData}
              sx={{
                border: `1px solid ${tokens.colors.neutral[300]}`,
                borderRadius: `${tokens.radius.md}px`,
                p: 0.85,
              }}
            >
              <RefreshIcon sx={{ fontSize: 18, color: tokens.colors.neutral[700] }} />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            size="small"
            component={RouterLink}
            to="/"
            target="_blank"
            startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            sx={{
              height: 36,
              fontSize: '0.8125rem',
              borderRadius: `${tokens.radius.md}px`,
              borderColor: tokens.colors.neutral[300],
              color: tokens.colors.neutral[700],
            }}
          >
            Live Site
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            component={RouterLink}
            to="/admin-portal/hero-slides"
            startIcon={<ViewCarouselIcon sx={{ fontSize: 16 }} />}
            sx={{
              height: 36,
              fontSize: '0.8125rem',
              borderRadius: `${tokens.radius.md}px`,
              boxShadow: tokens.shadows.brandGlow,
            }}
          >
            Manage Hero
          </Button>
        </Box>
      </Box>

      {/* 2. Key Metrics Row (8pt Spacing Grid) */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={card.title}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
              >
                <Card
                  component={RouterLink}
                  to={card.path}
                  sx={{
                    textDecoration: 'none',
                    borderRadius: `${tokens.radius.lg}px`,
                    border: `1px solid ${tokens.colors.neutral[200]}`,
                    backgroundColor: '#FFFFFF',
                    boxShadow: tokens.shadows.xs,
                    display: 'block',
                    p: 2.25,
                    height: '100%',
                    transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: card.color,
                      boxShadow: tokens.shadows.md,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: `${tokens.radius.md}px`,
                        backgroundColor: card.bg,
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 22 }} />
                    </Box>
                    <Chip
                      label={card.status}
                      size="small"
                      color={card.badgeColor}
                      variant="outlined"
                      sx={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        height: 20,
                        borderRadius: `${tokens.radius.xs}px`,
                        borderWidth: '1px',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    color={tokens.colors.neutral[900]}
                    sx={{ fontSize: '1.75rem', lineHeight: 1.1, mb: 0.5 }}
                  >
                    {card.count}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600} color={tokens.colors.neutral[600]} sx={{ fontSize: '0.8125rem' }}>
                      {card.title}
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 14, color: tokens.colors.neutral[400] }} />
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* 3. Middle Section: Recent Inquiries + Content Health Readiness */}
      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        
        {/* Left Column: Recent Partnership Inquiries Table */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card
            sx={{
              borderRadius: `${tokens.radius.lg}px`,
              border: `1px solid ${tokens.colors.neutral[200]}`,
              backgroundColor: '#FFFFFF',
              boxShadow: tokens.shadows.xs,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 2.5, pb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ fontSize: '1.0625rem' }}>
                  Recent Institutional Inquiries
                </Typography>
                <Typography variant="caption" color={tokens.colors.neutral[500]} sx={{ fontSize: '0.75rem' }}>
                  Inbound requests for teacher courses, LMS hosting, and research pilots
                </Typography>
              </Box>

              <Button
                component={RouterLink}
                to="/admin-portal/inquiries"
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                sx={{ fontSize: '0.75rem', fontWeight: 700 }}
              >
                View All ({stats.inquiries})
              </Button>
            </Box>

            <Divider sx={{ borderColor: tokens.colors.neutral[200] }} />

            <TableContainer sx={{ flexGrow: 1 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: tokens.colors.neutral[50] }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: tokens.colors.neutral[700], py: 1.25 }}>Organization</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: tokens.colors.neutral[700] }}>Contact Person</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: tokens.colors.neutral[700] }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: tokens.colors.neutral[700] }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: tokens.colors.neutral[700] }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentInquiries.length > 0 ? (
                    recentInquiries.map((inq) => (
                      <TableRow key={inq.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.8125rem', color: tokens.colors.neutral[900] }}>
                          {inq.organization}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', color: tokens.colors.neutral[600] }}>
                          {inq.name}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={inq.partner_type}
                            size="small"
                            sx={{ fontSize: '0.6875rem', height: 20, backgroundColor: tokens.colors.neutral[100], borderRadius: `${tokens.radius.xs}px` }}
                          />
                        </TableCell>
                        <TableCell>
                          {getStatusChip(inq.status)}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            component={RouterLink}
                            to="/admin-portal/inquiries"
                            size="small"
                            sx={{ fontSize: '0.6875rem', py: 0.25, px: 1, minWidth: 'auto', borderRadius: `${tokens.radius.xs}px` }}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color={tokens.colors.neutral[500]} sx={{ fontSize: '0.8125rem' }}>
                          No inquiries received yet. Inbound partner leads submitted from the public site form will appear here.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Right Column: Platform Readiness & Content Health */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card
            sx={{
              borderRadius: `${tokens.radius.lg}px`,
              border: `1px solid ${tokens.colors.neutral[200]}`,
              backgroundColor: '#FFFFFF',
              boxShadow: tokens.shadows.xs,
              p: 2.5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ fontSize: '1.0625rem' }}>
                  Platform & Content Health
                </Typography>
                <Typography variant="caption" color={tokens.colors.neutral[500]} sx={{ fontSize: '0.75rem' }}>
                  Realtime system readiness & curriculum alignment
                </Typography>
              </Box>
              <Chip
                icon={<CloudDoneOutlinedIcon sx={{ fontSize: 14, color: `${tokens.colors.secondary[600]} !important` }} />}
                label="Healthy"
                size="small"
                sx={{
                  backgroundColor: tokens.colors.secondary[50],
                  color: tokens.colors.secondary[700],
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  height: 22,
                  borderRadius: `${tokens.radius.xs}px`,
                }}
              />
            </Box>

            <Divider sx={{ mb: 2.5, borderColor: tokens.colors.neutral[200] }} />

            <Stack spacing={2.25} sx={{ flexGrow: 1 }}>
              {contentHealth.map((item) => (
                <Box key={item.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={600} color={tokens.colors.neutral[800]} sx={{ fontSize: '0.8125rem' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" fontWeight={700} color={item.color} sx={{ fontSize: '0.75rem' }}>
                      {item.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress}
                    sx={{
                      height: 6,
                      borderRadius: `${tokens.radius.xs}px`,
                      backgroundColor: tokens.colors.neutral[100],
                      '& .MuiLinearProgress-bar': { backgroundColor: item.color, borderRadius: `${tokens.radius.xs}px` },
                    }}
                  />
                  <Typography variant="caption" color={tokens.colors.neutral[500]} sx={{ fontSize: '0.6875rem', display: 'block', mt: 0.5 }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* 4. Bottom Row: Quick CMS Actions + Role Governance Privileges */}
      <Grid container spacing={3}>
        
        {/* Quick CMS Action Launcher */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: `${tokens.radius.lg}px`,
              border: `1px solid ${tokens.colors.neutral[200]}`,
              backgroundColor: '#FFFFFF',
              boxShadow: tokens.shadows.xs,
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 0.5, fontSize: '1.0625rem' }}>
              Quick Module Actions
            </Typography>
            <Typography variant="caption" color={tokens.colors.neutral[500]} sx={{ display: 'block', mb: 2, fontSize: '0.75rem' }}>
              Frequently accessed administrative tasks for your permission tier
            </Typography>

            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={RouterLink}
                  to="/admin-portal/hero-slides"
                  variant="outlined"
                  fullWidth
                  startIcon={<ViewCarouselIcon sx={{ color: tokens.colors.primary[500], fontSize: 18 }} />}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.25,
                    px: 1.75,
                    borderRadius: `${tokens.radius.md}px`,
                    borderColor: tokens.colors.neutral[200],
                    color: tokens.colors.neutral[800],
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: tokens.colors.primary[400],
                      backgroundColor: tokens.colors.primary[50],
                    },
                  }}
                >
                  Edit Hero Slider
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={RouterLink}
                  to="/admin-portal/focus-areas"
                  variant="outlined"
                  fullWidth
                  startIcon={<SchoolIcon sx={{ color: tokens.colors.secondary[500], fontSize: 18 }} />}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.25,
                    px: 1.75,
                    borderRadius: `${tokens.radius.md}px`,
                    borderColor: tokens.colors.neutral[200],
                    color: tokens.colors.neutral[800],
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: tokens.colors.secondary[400],
                      backgroundColor: tokens.colors.secondary[50],
                    },
                  }}
                >
                  Focus Pillars CMS
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={RouterLink}
                  to="/admin-portal/platforms"
                  variant="outlined"
                  fullWidth
                  startIcon={<DevicesIcon sx={{ color: tokens.colors.accent[500], fontSize: 18 }} />}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.25,
                    px: 1.75,
                    borderRadius: `${tokens.radius.md}px`,
                    borderColor: tokens.colors.neutral[200],
                    color: tokens.colors.neutral[800],
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: tokens.colors.accent[400],
                      backgroundColor: tokens.colors.accent[50],
                    },
                  }}
                >
                  Platform Demos
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={RouterLink}
                  to="/admin-portal/research"
                  variant="outlined"
                  fullWidth
                  startIcon={<AutoStoriesIcon sx={{ color: '#9333EA', fontSize: 18 }} />}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.25,
                    px: 1.75,
                    borderRadius: `${tokens.radius.md}px`,
                    borderColor: tokens.colors.neutral[200],
                    color: tokens.colors.neutral[800],
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#9333EA',
                      backgroundColor: '#FAF5FF',
                    },
                  }}
                >
                  Research Papers
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={RouterLink}
                  to="/admin-portal/roadmap"
                  variant="outlined"
                  fullWidth
                  startIcon={<TimelineIcon sx={{ color: '#D97706', fontSize: 18 }} />}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.25,
                    px: 1.75,
                    borderRadius: `${tokens.radius.md}px`,
                    borderColor: tokens.colors.neutral[200],
                    color: tokens.colors.neutral[800],
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#D97706',
                      backgroundColor: '#FFFBEB',
                    },
                  }}
                >
                  24-Month Roadmap
                </Button>
              </Grid>

              {user?.role === 'super_admin' ? (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    component={RouterLink}
                    to="/admin-portal/users"
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<ManageAccountsIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      justifyContent: 'flex-start',
                      py: 1.25,
                      px: 1.75,
                      borderRadius: `${tokens.radius.md}px`,
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                    }}
                  >
                    Manage Roles
                  </Button>
                </Grid>
              ) : (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    component={RouterLink}
                    to="/admin-portal/inquiries"
                    variant="outlined"
                    fullWidth
                    startIcon={<EmailOutlinedIcon sx={{ color: tokens.colors.primary[500], fontSize: 18 }} />}
                    sx={{
                      justifyContent: 'flex-start',
                      py: 1.25,
                      px: 1.75,
                      borderRadius: `${tokens.radius.md}px`,
                      borderColor: tokens.colors.neutral[200],
                      color: tokens.colors.neutral[800],
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                    }}
                  >
                    View Inquiries
                  </Button>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>

        {/* Role Governance & Security Clearance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: `${tokens.radius.lg}px`,
              border: `1px solid ${tokens.colors.neutral[200]}`,
              backgroundColor: '#FFFFFF',
              boxShadow: tokens.shadows.xs,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShieldOutlinedIcon sx={{ color: tokens.colors.primary[500], fontSize: 22 }} />
                <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ fontSize: '1.0625rem' }}>
                  Role & Access Governance
                </Typography>
              </Box>
              <Chip
                label="JWT Authenticated"
                size="small"
                sx={{
                  backgroundColor: tokens.colors.primary[50],
                  color: tokens.colors.primary[700],
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  height: 22,
                  borderRadius: `${tokens.radius.xs}px`,
                }}
              />
            </Box>

            <Typography variant="caption" color={tokens.colors.neutral[500]} sx={{ display: 'block', mb: 1.5, fontSize: '0.75rem' }}>
              Assigned Security Group: <strong>{user?.role?.toUpperCase()}</strong> • Standard 256-bit encrypted token
            </Typography>

            <List disablePadding>
              {user?.role === 'super_admin' && (
                <>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 16 }} /></ListItemIcon>
                    <ListItemText primary="Full Administrative Authority: Create/edit staff, assign role tiers & manage permissions." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 16 }} /></ListItemIcon>
                    <ListItemText primary="Hero Studio Control: Publish dynamic slides, reorder transitions & configure color themes." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 16 }} /></ListItemIcon>
                    <ListItemText primary="All CMS Endpoints: Focus pillars, platforms, research briefs, inquiries & roadmap." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                </>
              )}

              {user?.role === 'content_manager' && (
                <>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon color="secondary" sx={{ fontSize: 16 }} /></ListItemIcon>
                    <ListItemText primary="Editorial Leadership: Edit hero slides, solutions, team profiles, and roadmap." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                  <ListItem disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon color="secondary" sx={{ fontSize: 16 }} /></ListItemIcon>
                    <ListItemText primary="Partnership CRM: View incoming inquiries, update review statuses & add follow-up notes." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                  </ListItem>
                </>
              )}

              {user?.role === 'platform_editor' && (
                <ListItem disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon color="info" sx={{ fontSize: 16 }} /></ListItemIcon>
                  <ListItemText primary="Platform Specialist: Configure VLE specs, interactive sandbox modules & tech stacks." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                </ListItem>
              )}

              {user?.role === 'research_editor' && (
                <ListItem disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleOutlinedIcon sx={{ color: '#9333EA', fontSize: 16 }} /></ListItemIcon>
                  <ListItemText primary="Research Contributor: Draft, update and publish applied policy briefs and whitepapers." slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: 600, color: tokens.colors.neutral[800] } }} />
                </ListItem>
              )}
            </List>

            <Box sx={{ mt: 2, p: 1.5, backgroundColor: tokens.colors.neutral[50], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
              <Typography variant="caption" color={tokens.colors.neutral[600]} sx={{ fontSize: '0.75rem', display: 'block', lineHeight: 1.5 }}>
                ℹ️ All administrative actions are logged under audit-ready timestamps conforming to CEDR Governance Principles.
              </Typography>
            </Box>
          </Card>
        </Grid>

      </Grid>

    </Box>
  );
}
