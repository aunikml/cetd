import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Container, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { tokens } from '../theme/tokens';

const navItems = [
  { labelEn: 'Solutions', labelBn: 'সেবাসমূহ', href: '#solutions' },
  { labelEn: 'Platforms & Tools', labelBn: 'প্ল্যাটফর্ম ও টুল', href: '#platforms' },
  { labelEn: 'Research', labelBn: 'গবেষণা', href: '#research' },
  { labelEn: 'Why CEDR', labelBn: 'কেন সিইডিআর', href: '#why-cedr' },
  { labelEn: 'Founding Team', labelBn: 'নেতৃত্ব', href: '#team' },
  { labelEn: 'Roadmap', labelBn: 'রোডম্যাপ', href: '#roadmap' },
];

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid',
          borderColor: scrolled ? tokens.colors.neutral[200] : 'rgba(226, 232, 240, 0.6)',
          boxShadow: scrolled ? tokens.shadows.sm : 'none',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          top: 0,
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 }, display: 'flex', justifyContent: 'space-between' }}>
            
            {/* Logo */}
            <Box
              component="a"
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                borderRadius: `${tokens.radius.md}px`,
                p: 0.5,
                '&:focus-visible': {
                  outline: `2px solid ${tokens.colors.primary[500]}`,
                },
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="CEDR Logo"
                sx={{
                  height: { xs: 42, md: 50 },
                  width: 'auto',
                  display: 'block',
                }}
              />
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  size="small"
                  sx={{
                    color: tokens.colors.neutral[700],
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    px: 1.75,
                    py: 1,
                    borderRadius: `${tokens.radius.md}px`,
                    '&:hover': {
                      backgroundColor: tokens.colors.primary[50],
                      color: tokens.colors.primary[600],
                    },
                  }}
                >
                  {t(item.labelEn, item.labelBn)}
                </Button>
              ))}
            </Box>

            {/* Right Action Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              
              {/* Bilingual Switcher */}
              <Button
                variant="outlined"
                size="small"
                onClick={toggleLanguage}
                startIcon={<LanguageIcon sx={{ fontSize: 16 }} />}
                sx={{
                  borderColor: tokens.colors.neutral[300],
                  color: tokens.colors.primary[500],
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  borderRadius: `${tokens.radius.pill}px`,
                  px: 1.75,
                  py: 0.75,
                  '&:hover': {
                    borderColor: tokens.colors.primary[500],
                    backgroundColor: tokens.colors.primary[50],
                  },
                }}
              >
                {lang === 'en' ? 'বাংলা' : 'English'}
              </Button>

              {/* CMS Portal Link */}
              <Button
                component={RouterLink}
                to="/admin-portal"
                variant="text"
                size="small"
                startIcon={<AdminPanelSettingsIcon sx={{ fontSize: 18, color: tokens.colors.accent[500] }} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  color: tokens.colors.neutral[700],
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  borderRadius: `${tokens.radius.md}px`,
                  px: 1.5,
                  '&:hover': {
                    backgroundColor: tokens.colors.accent[50],
                    color: tokens.colors.accent[600],
                  },
                }}
              >
                {user ? `CMS (${user.role})` : 'Admin CMS'}
              </Button>

              {/* Partner CTA Button */}
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={() => handleNavClick('#partnership')}
                startIcon={<HandshakeIcon />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  borderRadius: `${tokens.radius.md}px`,
                  boxShadow: tokens.shadows.emeraldGlow,
                }}
              >
                {t('Partner With Us', 'অংশীদার হোন')}
              </Button>

              {/* Mobile Menu Icon */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { lg: 'none' }, color: tokens.colors.primary[500], ml: 0.5 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              p: 3,
              backgroundColor: '#FFFFFF',
              boxShadow: tokens.shadows['2xl'],
            }
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="CEDR Logo"
            sx={{ height: 38, width: 'auto' }}
          />
          <IconButton onClick={handleDrawerToggle} size="small" sx={{ color: tokens.colors.neutral[600] }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                onClick={() => handleNavClick(item.href)}
                sx={{
                  borderRadius: `${tokens.radius.md}px`,
                  py: 1,
                  '&:hover': { backgroundColor: tokens.colors.primary[50] }
                }}
              >
                <ListItemText
                  primary={t(item.labelEn, item.labelBn)}
                  slotProps={{ primary: { fontWeight: 600, color: tokens.colors.neutral[800], fontSize: '0.9375rem' } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          
          <ListItem disablePadding sx={{ mt: 2, mb: 1.5 }}>
            <ListItemButton
              component={RouterLink}
              to="/admin-portal"
              sx={{
                borderRadius: `${tokens.radius.md}px`,
                backgroundColor: tokens.colors.accent[50],
                py: 1,
              }}
            >
              <AdminPanelSettingsIcon sx={{ mr: 1.5, color: tokens.colors.accent[600], fontSize: 20 }} />
              <ListItemText
                primary="Admin / CMS Panel"
                slotProps={{ primary: { fontWeight: 700, color: tokens.colors.accent[700], fontSize: '0.875rem' } }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleNavClick('#partnership')}
              startIcon={<HandshakeIcon />}
              sx={{ borderRadius: `${tokens.radius.md}px` }}
            >
              {t('Partner With Us', 'অংশীদার হোন')}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
