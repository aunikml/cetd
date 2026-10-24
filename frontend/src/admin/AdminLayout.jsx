import React, { useState } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography,
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Chip, Button, useTheme, useMediaQuery
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import LaunchIcon from '@mui/icons-material/Launch';
import { Outlet, Navigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tokens } from '../theme/tokens';

const drawerWidth = 264;

export default function AdminLayout() {
  const { user, logout, canAccess } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  // If not logged in, redirect
  if (!user) {
    return <Navigate to="/admin-portal/login" replace />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navMenuItems = [
    { text: 'Dashboard', icon: DashboardIcon, path: '/admin-portal/dashboard', allowed: ['super_admin', 'content_manager', 'platform_editor', 'research_editor'] },
    { text: 'Hero Slides CMS', icon: ViewCarouselIcon, path: '/admin-portal/hero-slides', allowed: ['super_admin', 'content_manager'] },
    { text: 'Focus Areas & Solutions', icon: SchoolIcon, path: '/admin-portal/focus-areas', allowed: ['super_admin', 'content_manager', 'platform_editor'] },
    { text: 'Platforms & Tools Showcase', icon: DevicesIcon, path: '/admin-portal/platforms', allowed: ['super_admin', 'content_manager', 'platform_editor'] },
    { text: 'Research Hub & Briefs', icon: AutoStoriesIcon, path: '/admin-portal/research', allowed: ['super_admin', 'content_manager', 'research_editor'] },
    { text: 'Partnership Inquiries', icon: EmailOutlinedIcon, path: '/admin-portal/inquiries', allowed: ['super_admin', 'content_manager'] },
    { text: 'Team & Leadership', icon: GroupsIcon, path: '/admin-portal/team', allowed: ['super_admin', 'content_manager'] },
    { text: 'Roadmap Phases', icon: TimelineIcon, path: '/admin-portal/roadmap', allowed: ['super_admin', 'content_manager'] },
    { text: 'User & Role Management', icon: ManageAccountsIcon, path: '/admin-portal/users', allowed: ['super_admin'] },
  ];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', color: 'error' };
      case 'content_manager':
        return { label: 'Senior Content Lead', color: 'success' };
      case 'platform_editor':
        return { label: 'Platform Editor', color: 'info' };
      case 'research_editor':
        return { label: 'Research Contributor', color: 'warning' };
      default:
        return { label: role, color: 'default' };
    }
  };

  const roleInfo = getRoleBadge(user.role);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: tokens.colors.primary[500], color: '#FFFFFF' }}>
      
      {/* Brand Header */}
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Typography variant="h6" fontWeight={800} sx={{ color: '#FFFFFF', letterSpacing: '-0.5px', fontSize: '1.125rem' }}>
          CEDR <span style={{ color: tokens.colors.accent[300] }}>CMS Studio</span>
        </Typography>
        <Typography variant="caption" sx={{ color: tokens.colors.neutral[300], fontSize: '0.75rem' }}>
          Content & Permission Management
        </Typography>
      </Box>

      {/* User Info & Role Badge */}
      <Box sx={{ p: 2, backgroundColor: 'rgba(0, 0, 0, 0.18)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#FFFFFF', fontSize: '0.875rem' }}>
          {user.username}
        </Typography>
        <Chip
          label={roleInfo.label}
          size="small"
          color={roleInfo.color}
          sx={{ mt: 0.5, fontWeight: 700, fontSize: '0.6875rem', height: 22, borderRadius: `${tokens.radius.xs}px` }}
        />
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 1.25, py: 1.5, flexGrow: 1 }}>
        {navMenuItems.map((item) => {
          const Icon = item.icon;
          const isAllowed = canAccess(item.allowed);
          const isSelected = location.pathname === item.path;

          if (!isAllowed) {
            return null;
          }

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={isSelected}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: `${tokens.radius.md}px`,
                  py: 0.85,
                  px: 1.5,
                  color: isSelected ? '#FFFFFF' : tokens.colors.neutral[200],
                  backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.35) !important' : 'transparent',
                  border: isSelected ? `1px solid ${tokens.colors.accent[400]}` : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: isSelected ? tokens.colors.accent[300] : tokens.colors.neutral[300] }}>
                  <Icon sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{ primary: { fontSize: '0.8125rem', fontWeight: isSelected ? 700 : 500 } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout & View Live Site */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Button
          fullWidth
          component={RouterLink}
          to="/"
          target="_blank"
          variant="outlined"
          size="small"
          startIcon={<LaunchIcon sx={{ fontSize: 15 }} />}
          sx={{
            mb: 1.25,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            height: 32,
            borderRadius: `${tokens.radius.md}px`,
            '&:hover': { borderColor: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          View Public Site
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          size="small"
          startIcon={<LogoutIcon sx={{ fontSize: 15 }} />}
          onClick={logout}
          sx={{ fontSize: '0.75rem', fontWeight: 700, height: 32, borderRadius: `${tokens.radius.md}px` }}
        >
          Log Out
        </Button>
      </Box>

    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: tokens.colors.neutral[50] }}>
      
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: '#FFFFFF',
          color: tokens.colors.neutral[900],
          boxShadow: tokens.shadows.xs,
          borderBottom: `1px solid ${tokens.colors.neutral[200]}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="subtitle1" fontWeight={700} color={tokens.colors.primary[500]} sx={{ fontSize: '0.9375rem' }}>
            CEDR Content Management System
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Chip
              label={`Logged in as: ${user.username}`}
              size="small"
              sx={{ backgroundColor: tokens.colors.neutral[100], color: tokens.colors.neutral[700], fontWeight: 600, fontSize: '0.75rem', borderRadius: `${tokens.radius.sm}px` }}
            />
            <Button
              variant="outlined"
              size="small"
              color="primary"
              component={RouterLink}
              to="/"
              startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, height: 32, fontSize: '0.75rem', borderRadius: `${tokens.radius.md}px` }}
            >
              Public Site
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, md: 3.5 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: tokens.colors.neutral[50],
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
}
