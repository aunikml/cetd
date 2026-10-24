import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card,
  Chip, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';
import api from '../services/api';

const defaultPhases = [
  {
    phase_number: 1,
    phase_title_en: "Foundation & Legal Setup",
    phase_title_bn: "ভিত্তি স্থাপন ও আইনি প্রস্তুতি",
    timeline_en: "Months 0 to 6",
    timeline_bn: "০ থেকে ৬ মাস",
    status: "active",
    milestones_en: [
      "Register the Private Limited Company in Bangladesh",
      "Formalize Shareholders' Agreement & Governance Principles",
      "Launch Brand Identity, Website & Digital Platforms",
      "Convene Expert Advisory Council & Seed Partner Dialogues"
    ],
    milestones_bn: [
      "বাংলাদেশে প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন সম্পন্নকরণ",
      "অংশীদার চুক্তি ও সুশাসন নীতিমালা আনুষ্ঠানিকভাবে কার্যকর",
      "ব্র্যান্ড আইডেন্টিটি, ওয়েবসাইট ও ডিজিটাল প্ল্যাটফর্ম চালু",
      "বিশেষজ্ঞ উপদেষ্টা পর্ষদ গঠন ও অংশীদারদের সাথে প্রাথমিক সংলাপ"
    ],
    accent: tokens.colors.primary[500],
  },
  {
    phase_number: 2,
    phase_title_en: "Classroom Pilots & Tool Deployment",
    phase_title_bn: "ক্লাসরুম পাইলট ও টুল উন্মোচন",
    timeline_en: "Months 6 to 12",
    timeline_bn: "৬ থেকে ১২ মাস",
    status: "upcoming",
    milestones_en: [
      "Pilot Teacher EduTech Capacity Course with Partner School Network",
      "Launch Assessment Tool & Item Bank Prototype",
      "Deploy Enterprise Course-Delivery Platform Live (Moodle VLE)",
      "Publish First Applied Classroom Research Study"
    ],
    milestones_bn: [
      "অংশীদার বিদ্যালয় নেটওয়ার্কে শিক্ষক এডুটেক কোর্স পাইলট",
      "অ্যাসেসমেন্ট টুল ও প্রশ্নভাণ্ডার প্রোটোটাইপ উন্মোচন",
      "লাইভ কোর্স ডেলিভারি প্ল্যাটফর্ম (মুডল ভিএলই) চালু",
      "প্রথম প্রায়োগিক শ্রেণিকক্ষ গবেষণাপত্র প্রকাশ ও বিতরণ"
    ],
    accent: tokens.colors.accent[500],
  },
  {
    phase_number: 3,
    phase_title_en: "Scale, Expansion & Startup Sandbox",
    phase_title_bn: "দেশব্যাপী সম্প্রসারণ ও স্টার্টআপ স্যান্ডবক্স",
    timeline_en: "Months 12 to 24",
    timeline_bn: "১২ থেকে ২৪ মাস",
    status: "upcoming",
    milestones_en: [
      "Scale Teacher Professional Development across Multiple Districts",
      "Commercial Launch of Assessment & Analytics Platform",
      "Apply to Government of Bangladesh Startup Sandbox",
      "Open Equity Provision Pool for Strategic Investors & Partners"
    ],
    milestones_bn: [
      "বিভিন্ন জেলায় শিক্ষক পেশাগত উন্নয়ন কোর্স সম্প্রসারণ",
      "অ্যাসেসমেন্ট ও শিখন অ্যানালিটিক্স প্ল্যাটফর্মের বাণিজ্যিক উন্মোচন",
      "বাংলাদেশ সরকারের স্টার্টআপ স্যান্ডবক্স নীতিমালায় আবেদন",
      "কৌশলগত অংশীদার ও বিনিয়োগকারীদের জন্য ইকুইটি পুল উন্মুক্তকরণ"
    ],
    accent: tokens.colors.secondary[500],
  }
];

export default function RoadmapSection() {
  const { lang, t } = useLanguage();
  const [phases, setPhases] = useState(defaultPhases);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await api.get('/cms/roadmap/');
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((r, idx) => ({
            ...r,
            milestones_en: typeof r.milestones_en === 'string' ? r.milestones_en.split('\n').filter(Boolean) : r.milestones_en,
            milestones_bn: typeof r.milestones_bn === 'string' ? r.milestones_bn.split('\n').filter(Boolean) : r.milestones_bn,
            accent: idx === 0 ? tokens.colors.primary[500] : idx === 1 ? tokens.colors.accent[500] : tokens.colors.secondary[500],
          }));
          setPhases(merged);
        }
      } catch (err) {
        console.log('Using default roadmap phases');
      }
    };
    fetchRoadmap();
  }, []);

  return (
    <Box id="roadmap" sx={{ py: { xs: 7, md: 11 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            label={t('24-MONTH STRATEGIC TRAJECTORY', '২৪ মাসের কৌশলগত কর্মপরিকল্পনা')}
            sx={{
              backgroundColor: tokens.colors.secondary[50],
              color: tokens.colors.secondary[700],
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              mb: 2,
              borderRadius: `${tokens.radius.sm}px`
            }}
          />
          <Typography variant="h2" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 2, letterSpacing: '-0.025em' }}>
            {t('The CEDR Growth Roadmap', 'সিইডিআর এর অগ্রযাত্রার রূপরেখা')}
          </Typography>
          <Typography variant="body1" color={tokens.colors.neutral[600]} sx={{ fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'The first 24 months move from legal and governance setup, through piloting the first course and tools, to scaling with partners and preparing for investors and the Startup Sandbox.',
              'প্রথম ২৪ মাসের লক্ষ্য আইনি ও সুশাসন কাঠামো তৈরি থেকে শুরু করে পরীক্ষামূলক কোর্স পাইলটিং, অংশীদারদের সাথে প্ল্যাটফর্ম সম্প্রসারণ এবং স্টার্টআপ স্যান্ডবক্সে অন্তর্ভুক্তি।'
            )}
          </Typography>
        </Box>

        {/* 3-Phase Roadmap Timeline Cards */}
        <Grid container spacing={3.5} sx={{ mb: 6 }}>
          {phases.map((phase, index) => (
            <Grid size={{ xs: 12, lg: 4 }} key={phase.phase_number || index}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.4 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    p: 3.5,
                    borderRadius: `${tokens.radius.xl}px`,
                    border: `1px solid ${tokens.colors.neutral[200]}`,
                    backgroundColor: tokens.colors.neutral[50],
                    boxShadow: tokens.shadows.sm,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: phase.accent,
                      transform: 'translateY(-3px)',
                      boxShadow: tokens.shadows.lg,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip
                      label={t(phase.timeline_en, phase.timeline_bn)}
                      sx={{
                        backgroundColor: phase.status === 'active' ? tokens.colors.primary[50] : tokens.colors.neutral[200],
                        color: phase.status === 'active' ? tokens.colors.primary[700] : tokens.colors.neutral[700],
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        borderRadius: `${tokens.radius.sm}px`
                      }}
                    />
                    <Chip
                      label={phase.status === 'active' ? 'IN PROGRESS' : 'PLANNED'}
                      size="small"
                      color={phase.status === 'active' ? 'primary' : 'default'}
                      sx={{ fontWeight: 700, fontSize: '0.6875rem', height: 22, borderRadius: `${tokens.radius.xs}px` }}
                    />
                  </Box>

                  <Typography variant="h5" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 1.5, fontSize: '1.1875rem' }}>
                    {phase.phase_number}. {t(phase.phase_title_en, phase.phase_title_bn)}
                  </Typography>

                  <Divider sx={{ my: 1.5, borderColor: tokens.colors.neutral[200] }} />

                  <Typography variant="caption" fontWeight={700} color={tokens.colors.neutral[500]} display="block" sx={{ mb: 1, fontSize: '0.75rem' }}>
                    {t('STRATEGIC MILESTONES:', 'কৌশলগত মাইলফলক:')}
                  </Typography>

                  <List disablePadding sx={{ flexGrow: 1 }}>
                    {(lang === 'bn' ? phase.milestones_bn : phase.milestones_en).map((ms, mIdx) => (
                      <ListItem key={mIdx} disableGutters sx={{ py: 0.5, alignItems: 'flex-start' }}>
                        <ListItemIcon sx={{ minWidth: 22, mt: 0.4 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: phase.status === 'active' ? tokens.colors.secondary[500] : tokens.colors.neutral[400] }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={ms.replace(/^•\s*/, '')}
                          slotProps={{ primary: { fontSize: '0.8125rem', color: tokens.colors.neutral[700], lineHeight: 1.5, fontWeight: 500 } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Governance & Startup Sandbox Callout */}
        <Box
          sx={{
            p: 3.5,
            borderRadius: `${tokens.radius.xl}px`,
            backgroundColor: tokens.colors.neutral[50],
            border: `1px solid ${tokens.colors.neutral[200]}`,
            boxShadow: tokens.shadows.xs,
          }}
        >
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <SecurityIcon sx={{ color: tokens.colors.primary[500], fontSize: 22 }} />
                <Typography variant="h6" fontWeight={800} color={tokens.colors.primary[500]} sx={{ fontSize: '1rem' }}>
                  {t('Transparent Governance & Ethics', 'স্বচ্ছ সুশাসন ও নৈতিক নীতিমালা')}
                </Typography>
              </Box>
              <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ lineHeight: 1.6, fontSize: '0.8125rem' }}>
                {t(
                  'Governance principles include a formal founders\' and shareholders\' agreement defining decision rights, a written conflict-of-interest and ethics policy, and transparent financial reporting to shareholders.',
                  'সুশাসন কাঠামোর মধ্যে রয়েছে সিদ্ধান্ত গ্রহণের স্পষ্ট অধিকার সম্বলিত অংশীদার চুক্তি, স্বার্থের সংঘাত ও তথ্য সুরক্ষা নীতি এবং অংশীদারদের প্রতি স্বচ্ছ আর্থিক প্রতিবেদন প্রদান।'
                )}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <AccountBalanceIcon sx={{ color: tokens.colors.secondary[600], fontSize: 22 }} />
                <Typography variant="h6" fontWeight={800} color={tokens.colors.secondary[600]} sx={{ fontSize: '1rem' }}>
                  {t('Startup Sandbox & Strategic Equity Pool', 'স্টার্টআপ স্যান্ডবক্স ও কৌশলগত বিনিয়োগ')}
                </Typography>
              </Box>
              <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ lineHeight: 1.6, fontSize: '0.8125rem' }}>
                {t(
                  'An equity stock option pool is reserved for future institutional investors and expert partners. Structured application planned under the Government of Bangladesh Startup Sandbox framework.',
                  'ভবিষ্যতের প্রাতিষ্ঠানিক বিনিয়োগকারী ও বিশেষজ্ঞ অংশীদারদের জন্য একটি সংরক্ষিত স্টক অপশন পুল রয়েছে। বাংলাদেশ সরকারের স্টার্টআপ স্যান্ডবক্স নীতিমালার অধীনে স্বীকৃতির পরিকল্পনা রয়েছে।'
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
