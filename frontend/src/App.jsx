import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Pages & Components
import HomePage from './pages/HomePage';

// Admin CMS Components
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import HeroSlidesCMS from './admin/HeroSlidesCMS';
import FocusAreasCMS from './admin/FocusAreasCMS';
import PlatformsCMS from './admin/PlatformsCMS';
import ResearchCMS from './admin/ResearchCMS';
import InquiriesCMS from './admin/InquiriesCMS';
import TeamCMS from './admin/TeamCMS';
import RoadmapCMS from './admin/RoadmapCMS';
import UsersCMS from './admin/UsersCMS';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Portal Route */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated Admin / CMS Routes */}
              <Route path="/admin-portal/login" element={<AdminLogin />} />
              <Route path="/admin-portal" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="hero-slides" element={<HeroSlidesCMS />} />
                <Route path="focus-areas" element={<FocusAreasCMS />} />
                <Route path="platforms" element={<PlatformsCMS />} />
                <Route path="research" element={<ResearchCMS />} />
                <Route path="inquiries" element={<InquiriesCMS />} />
                <Route path="team" element={<TeamCMS />} />
                <Route path="roadmap" element={<RoadmapCMS />} />
                <Route path="users" element={<UsersCMS />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
