import React from 'react';
import {
  Box, Container, Typography, Grid, Card,
  Chip
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HubIcon from '@mui/icons-material/Hub';
import PublicIcon from '@mui/icons-material/Public';
import LoopIcon from '@mui/icons-material/Loop';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';

const steps = [
  {
    step: '1',
    title_en: 'Design',
    title_bn: '১. পরিকল্পনা ও ডিজাইন',
    desc_en: 'Co-design with teachers and institutions around a clear, authentic learning need.',
    desc_bn: 'সুনির্দিষ্ট শিখন চাহিদার ভিত্তিতে শিক্ষক ও শিক্ষা প্রতিষ্ঠানের সাথে যৌথ পরিকল্পনা।',
    color: tokens.colors.primary[500],
  },
  {
    step: '2',
    title_en: 'Pilot',
    title_bn: '২. প্রায়োগিক পাইলট',
    desc_en: 'Test at small scale with a committed partner in actual classroom conditions.',
    desc_bn: 'বাস্তব শ্রেণিকক্ষে প্রতিশ্রুতিবদ্ধ অংশীদারদের সাথে ক্ষুদ্র পরিসরে পাইলটিং।',
    color: tokens.colors.accent[500],
  },
  {
    step: '3',
    title_en: 'Evaluate',
    title_bn: '৩. প্রমাণভিত্তিক মূল্যায়ন',
    desc_en: 'Measure against agreed learning outcomes and rigorous usability goals.',
    desc_bn: 'শিক্ষার্থীদের শিখন ফলাফল ও প্রযুক্তি ব্যবহারের সুবিধার বস্তুনিষ্ঠ মূল্যায়ন।',
    color: tokens.colors.secondary[500],
  },
  {
    step: '4',
    title_en: 'Scale',
    title_bn: '৪. কার্যকর সম্প্রসারণ',
    desc_en: 'Expand and institutionalize only what the empirical evidence supports.',
    desc_bn: 'কেবলমাত্র প্রমাণিত ও কার্যকর সমাধানগুলো বৃহৎ পরিসরে বাস্তবায়ন।',
    color: tokens.colors.secondary[700],
  },
];

const differentiators = [
  {
    icon: VerifiedUserIcon,
    title_en: 'Practitioner-Founded',
    title_bn: 'অভিজ্ঞ শিক্ষাবিদ ও প্রযুক্তিবিদদের উদ্যোগ',
    desc_en: 'The founders have worked hands-on in teacher education, NCTB national curriculum development, enterprise LMS platforms, and institutional strategy.',
    desc_bn: 'প্রতিষ্ঠাতাদের রয়েছে শিক্ষক প্রশিক্ষণ, জাতীয় শিক্ষাক্রম (এনসিটিবি) প্রণয়ন, এলএমএস ব্যবস্থাপনা ও প্রাতিষ্ঠানিক নেতৃত্বে দীর্ঘ বাস্তব অভিজ্ঞতা।',
  },
  {
    icon: HubIcon,
    title_en: 'Pedagogy & Technology Together',
    title_bn: 'শিক্ষণপদ্ধতি ও প্রযুক্তির সহাবস্থান',
    desc_en: 'Courses and digital tools are designed side by side, ensuring teachers receive intuitive technology that fits how they actually teach.',
    desc_bn: 'কোর্স এবং ডিজিটাল টুলস যুগপৎভাবে তৈরি করা হয়, ফলে শিক্ষকরা এমন প্রযুক্তি পান যা তাদের পাঠদানের সাথে সম্পূর্ণ মানানসই।',
  },
  {
    icon: PublicIcon,
    title_en: 'Local Context & Bangla Equity',
    title_bn: 'স্থানীয় প্রেক্ষাপট ও বাংলা ভাষার গুরুত্ব',
    desc_en: 'Deep familiarity with the national curriculum landscape, Bangla-language linguistic nuances, and the realities of Bangladeshi classrooms.',
    desc_bn: 'জাতীয় শিক্ষাক্রমের রূপরেখা, বাংলা ভাষার সঠিক প্রয়োগ এবং বাংলাদেশি শ্রেণিকক্ষের বাস্তব সীমাবদ্ধতা বিষয়ে গভীর পরিচিতি।',
  },
  {
    icon: LoopIcon,
    title_en: 'Continuous Research Feedback Loop',
    title_bn: 'নিরবচ্ছিন্ন গবেষণা ও ফিডব্যাক চক্র',
    desc_en: 'Evidence from classroom pilots and empirical evaluations feeds directly back into course refinement and software engineering.',
    desc_bn: 'মাঠপর্যায়ের পাইলট ও পরীক্ষার তথ্য সরাসরি কোর্স উন্নয়ন ও সফটওয়্যার পরিমার্জনে ব্যবহৃত হয়।',
  },
  {
    icon: HandshakeIcon,
    title_en: 'Open & Partnership-Minded',
    title_bn: 'উন্মুক্ত ও অংশীদারিত্বমুখী দৃষ্টিভঙ্গি',
    desc_en: 'An expanding ecosystem of industry experts, government agencies, NGOs, and impact investors who share the transformative mission.',
    desc_bn: 'শিক্ষা রূপান্তরে বিশ্বাসী সরকারি সংস্থা, বিশ্ববিদ্যালয়, দাতা সংস্থা ও বিশেষজ্ঞদের নিয়ে একটি সমন্বিত নেটওয়ার্ক।',
  },
];

export default function WhyCEDR() {
  const { lang, t } = useLanguage();

  return (
    <Box id="why-cedr" sx={{ py: { xs: 7, md: 11 }, backgroundColor: tokens.colors.neutral[50] }}>
      <Container maxWidth="xl">
        
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            label={t('THE CEDR ADVANTAGE', 'সিইডিআর এর স্বাতন্ত্র্য')}
            sx={{
              backgroundColor: tokens.colors.secondary[50],
              color: tokens.colors.secondary[600],
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              mb: 2,
              borderRadius: `${tokens.radius.sm}px`,
            }}
          />
          <Typography variant="h2" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 2, letterSpacing: '-0.025em' }}>
            {t('Why the Center? Grounded in Evidence, Built for Impact', 'কেন সিইডিআর? প্রমাণের ভিত্তি, দীর্ঘস্থায়ী প্রভাব')}
          </Typography>
          <Typography variant="body1" color={tokens.colors.neutral[600]} sx={{ fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'The Center combines classroom-grounded pedagogy with practical engineering skills, which few new organisations offer together.',
              'কেন্দ্রটি শ্রেণিকক্ষ-ভিত্তিক শিক্ষাদান পদ্ধতির সাথে বাস্তব প্রযুক্তিগত দক্ষতার সমন্বয় ঘটায়—যা খুব কম প্রতিষ্ঠানের রয়েছে।'
            )}
          </Typography>
        </Box>

        {/* 4-Step Approach Lifecycle */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h4" fontWeight={800} color={tokens.colors.primary[500]} sx={{ textAlign: 'center', mb: 4, letterSpacing: '-0.015em' }}>
            {t('Our 4-Step Evidence-Led Approach', 'আমাদের ৪-ধাপের প্রমাণ-ভিত্তিক কর্মপদ্ধতি')}
          </Typography>

          <Grid container spacing={3}>
            {steps.map((st, i) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={st.step}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: `${tokens.radius.lg}px`,
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${tokens.colors.neutral[200]}`,
                      boxShadow: tokens.shadows.sm,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 200ms ease',
                      '&:hover': {
                        boxShadow: tokens.shadows.md,
                        borderColor: st.color,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: `${tokens.radius.md}px`,
                        backgroundColor: st.color,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.125rem',
                        mb: 2,
                      }}
                    >
                      {st.step}
                    </Box>
                    <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 1, fontSize: '1.0625rem' }}>
                      {t(st.title_en, st.title_bn)}
                    </Typography>
                    <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                      {t(st.desc_en, st.desc_bn)}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 5 Distinctive Pillars */}
        <Grid container spacing={3.5}>
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <Grid size={{ xs: 12, md: index < 2 ? 6 : 4 }} key={index}>
                <Card
                  sx={{
                    p: 3.5,
                    height: '100%',
                    borderRadius: `${tokens.radius.lg}px`,
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${tokens.colors.neutral[200]}`,
                    boxShadow: tokens.shadows.sm,
                    transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: tokens.colors.accent[300],
                      transform: 'translateY(-3px)',
                      boxShadow: tokens.shadows.lg,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: `${tokens.radius.md}px`,
                      backgroundColor: `${tokens.colors.primary[500]}12`,
                      color: tokens.colors.primary[500],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 1, fontSize: '1.0625rem' }}>
                    {t(diff.title_en, diff.title_bn)}
                  </Typography>
                  <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ lineHeight: 1.65, fontSize: '0.875rem' }}>
                    {t(diff.desc_en, diff.desc_bn)}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>

      </Container>
    </Box>
  );
}
