import React from 'react';
import {
  Box, Container, Typography, Grid, Link, Divider,
  Stack, Chip
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';

export default function Footer() {
  const { toggleLanguage, t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ backgroundColor: tokens.colors.surface.darkNavy, color: '#F1F5F9', pt: 8, pb: 5, borderTop: `4px solid ${tokens.colors.secondary[500]}` }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} sx={{ mb: 6 }}>
          
          {/* Col 1: Logo & Vision */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src="/logo.svg"
                alt="CEDR Logo"
                sx={{
                  height: 46,
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: tokens.colors.neutral[400], lineHeight: 1.7, mb: 2.5, fontSize: '0.8125rem' }}>
              {t(
                'A founder-led educational technology organisation building teacher capacity, scalable learning platforms and empirical research for education transformation in Bangladesh.',
                'শিক্ষক সক্ষমতা বৃদ্ধি, আধুনিক লার্নিং প্ল্যাটফর্ম ও প্রায়োগিক গবেষণার মাধ্যমে বাংলাদেশের শিক্ষাব্যবস্থার ইতিবাচক রূপান্তরে প্রতিশ্রুতিবদ্ধ একটি এডুটেক প্রতিষ্ঠান।'
              )}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ color: tokens.colors.secondary[400], fontSize: 18 }} />
              <Typography variant="caption" sx={{ color: tokens.colors.neutral[300], fontSize: '0.75rem' }}>
                Dhaka, Bangladesh • Private Limited Company (Registration in progress)
              </Typography>
            </Box>
          </Grid>

          {/* Col 2: Core Focus Areas */}
          <Grid size={{ xs: 12, sm: 6, lg: 2.5 }}>
            <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" sx={{ mb: 2, fontSize: '0.9375rem' }}>
              {t('Three Focus Areas', 'প্রধান তিনটি কর্মক্ষেত্র')}
            </Typography>
            <Stack spacing={1.25}>
              <Link onClick={() => scrollTo('#solutions')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                1. {t('Teacher Capacity', 'শিক্ষক সক্ষমতা বৃদ্ধি')}
              </Link>
              <Link onClick={() => scrollTo('#platforms')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                2. {t('Assessment Platforms', 'মূল্যায়ন ও ডেলিভারি প্ল্যাটফর্ম')}
              </Link>
              <Link onClick={() => scrollTo('#research')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                3. {t('Applied Research & AI', 'ফলিত গবেষণা ও এআই')}
              </Link>
              <Link onClick={() => scrollTo('#platforms')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                • {t('Bangla Speech-to-Text NLP', 'বাংলা স্পিচ-টু-টেক্সট এআই')}
              </Link>
              <Link onClick={() => scrollTo('#platforms')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                • {t('Gamified Learning Modules', 'গেমিফাইড লার্নিং মডিউল')}
              </Link>
            </Stack>
          </Grid>

          {/* Col 3: Organization & Governance */}
          <Grid size={{ xs: 12, sm: 6, lg: 2.5 }}>
            <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" sx={{ mb: 2, fontSize: '0.9375rem' }}>
              {t('Organization', 'প্রতিষ্ঠান ও রূপরেখা')}
            </Typography>
            <Stack spacing={1.25}>
              <Link onClick={() => scrollTo('#why-cedr')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                {t('Why CEDR (4-Step Loop)', 'কেন সিইডিআর (৪-ধাপ কর্মপদ্ধতি)')}
              </Link>
              <Link onClick={() => scrollTo('#team')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                {t('Founding Leadership', 'প্রতিষ্ঠাতা পর্ষদ')}
              </Link>
              <Link onClick={() => scrollTo('#roadmap')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                {t('24-Month Roadmap', '২৪ মাসের রোডম্যাপ')}
              </Link>
              <Link onClick={() => scrollTo('#partnership')} sx={{ color: tokens.colors.neutral[400], cursor: 'pointer', textDecoration: 'none', fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[300] } }}>
                {t('Partnership Engagement', 'অংশীদারিত্বের সুযোগ')}
              </Link>
              <Link component={RouterLink} to="/admin-portal" sx={{ color: tokens.colors.accent[300], fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8125rem', '&:hover': { color: tokens.colors.accent[200] } }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 16 }} /> Admin & CMS Portal
              </Link>
            </Stack>
          </Grid>

          {/* Col 4: Vision & Sandbox Statement */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" sx={{ mb: 2, fontSize: '0.9375rem' }}>
              {t('National Vision', 'জাতীয় লক্ষ্য')}
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.colors.neutral[400], lineHeight: 1.65, mb: 2, fontSize: '0.8125rem' }}>
              "{t(
                'A Bangladesh where every teacher is digitally confident and every learner benefits from evidence-based, technology-enabled education.',
                'এমন একটি বাংলাদেশ যেখানে প্রতিটি শিক্ষক ডিজিটালভাবে আত্মবিশ্বাসী এবং প্রতিটি শিক্ষার্থী প্রমাণ-ভিত্তিক, প্রযুক্তি-সমর্থিত শিক্ষার সুফল পায়।'
              )}"
            </Typography>
            <Chip
              label="Startup Sandbox Candidate"
              size="small"
              sx={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                color: '#4ADE80',
                fontWeight: 700,
                fontSize: '0.6875rem',
                borderRadius: `${tokens.radius.xs}px`
              }}
            />
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

        {/* Bottom Bar */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: tokens.colors.neutral[500], fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} Center for EduTech Development and Research (CEDR). All Rights Reserved. Dhaka, Bangladesh.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              onClick={toggleLanguage}
              sx={{
                color: tokens.colors.accent[300],
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { color: '#FFFFFF' },
              }}
            >
              <LanguageIcon sx={{ fontSize: 16 }} />
              Switch to English / বাংলা
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
