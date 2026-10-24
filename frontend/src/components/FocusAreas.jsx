import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Chip, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';
import api from '../services/api';

const defaultPillars = [
  {
    key_code: 'teacher_capacity',
    title_en: '1. Teacher and Educator Capacity',
    title_bn: '১. শিক্ষক ও শিক্ষাবিদদের সক্ষমতা বৃদ্ধি',
    tagline_en: 'Equipping teachers with digital pedagogy, instructional design, and AI classroom ethics.',
    tagline_bn: 'ডিজিটাল শিক্ষণপদ্ধতি, ইনস্ট্রাকশনাল ডিজাইন ও ক্লাসরুমে দায়িত্বশীল এআই ব্যবহারের প্রশিক্ষণ।',
    description_en: 'Courses and certificate programmes in educational technology for teachers and aspiring teachers: digital pedagogy, instructional design, online and blended teaching, assessment literacy, and responsible use of AI in the classroom. Delivered online, blended and in person.',
    description_bn: 'শিক্ষক ও প্রশিক্ষণার্থী শিক্ষকদের জন্য এডুকেশনাল টেকনোলজি ও সার্টিফিকেট কোর্স: ডিজিটাল শিক্ষণবিজ্ঞান, নির্দেশনামূলক নকশা, অনলাইন ও ব্লেন্ডেড শিক্ষাদান, মূল্যায়ন সাক্ষরতা এবং শ্রেণিকক্ষে এআই-এর দায়িত্বশীল ব্যবহার।',
    deliverables_en: [
      'Digital Pedagogy & Blended Learning Certificates',
      'Instructional Design for Modern Classrooms',
      'Assessment Literacy & Rubric Creation Workshops',
      'Practical & Ethical AI Adoption for Teachers'
    ],
    deliverables_bn: [
      'ডিজিটাল পেডাগোজি ও ব্লেন্ডেড লার্নিং সার্টিফিকেট',
      'আধুনিক শ্রেণিকক্ষের জন্য ইনস্ট্রাকশনাল ডিজাইন',
      'মূল্যায়ন সাক্ষরতা ও রুব্রিক্স প্রণয়ন কর্মশালা',
      'শিক্ষকদের জন্য কার্যকর ও দায়িত্বশীল এআই ব্যবহার'
    ],
    beneficiaries_en: 'Schools, Teacher-Training Institutes, Universities, NGOs',
    beneficiaries_bn: 'বিদ্যালয়, শিক্ষক প্রশিক্ষণ ইনস্টিটিউট, বিশ্ববিদ্যালয়, এনজিও',
    icon: SchoolIcon,
    accent: tokens.colors.primary[500],
    badge: 'Core Program',
  },
  {
    key_code: 'assessment_platforms',
    title_en: '2. Assessment Tools & Delivery Platforms',
    title_bn: '২. মূল্যায়ন টুল ও ডেলিভারি প্ল্যাটফর্ম',
    tagline_en: 'Scalable LMS platforms and assessment engines tailored for Bangladeshi curricula.',
    tagline_bn: 'বাংলাদেশের শিক্ষাক্রম ও বাস্তবতার উপযোগী স্কেলেবল এলএমএস ও অ্যাসেসমেন্ট ইঞ্জিন।',
    description_en: 'Technology tools for educational assessment (online tests, item banks, analytics, feedback) and online platforms for course delivery, built on proven learning-management systems (Moodle/Canvas architecture) with Bangla and English support.',
    description_bn: 'শিক্ষাগত মূল্যায়নের প্রযুক্তিগত টুল (অনলাইন পরীক্ষা, আইটেম ব্যাংক, অ্যানালিটিক্স, ফিডব্যাক) এবং কোর্স ডেলিভারির জন্য প্রমাণিত লার্নিং ম্যানেজমেন্ট সিস্টেম (মুডল/ক্যানভাস আর্কিটেকচার) যার সাথে রয়েছে পূর্ণাঙ্গ বাংলা ও ইংরেজি সমর্থন।',
    deliverables_en: [
      'Enterprise Moodle / Canvas LMS Customization & Hosting',
      'Automated Question Item Banks & Randomization',
      'Real-Time Student Learning Analytics & Dashboards',
      'Low-Bandwidth Mobile Friendly Web Application'
    ],
    deliverables_bn: [
      'মুডল ও ক্যানভাস এলএমএস কাস্টমাইজেশন ও হোস্টিং',
      'স্বয়ংক্রিয় প্রশ্নভাণ্ডার ও র‍্যান্ডমাইজড পরীক্ষা',
      'রিয়েল-টাইম শিক্ষার্থী অগ্রগতি পর্যবেক্ষণ ও অ্যানালিটিক্স',
      'কম ডেটা খরচে সহজে ব্যবহারযোগ্য ওয়েব অ্যাপ্লিকেশন'
    ],
    beneficiaries_en: 'Education Institutions, Training Providers, Education Programmes',
    beneficiaries_bn: 'শিক্ষা প্রতিষ্ঠান, প্রশিক্ষণ প্রদানকারী সংস্থা, শিক্ষা কর্মসূচি',
    icon: ComputerIcon,
    accent: tokens.colors.secondary[500],
    badge: 'Technology Stack',
  },
  {
    key_code: 'research_innovation',
    title_en: '3. Research and Innovation',
    title_bn: '৩. ফলিত গবেষণা ও উদ্ভাবনী উদ্যোগ',
    tagline_en: 'Evidence-based pilots, AI speech tools, and policy briefs that guide educational reform.',
    tagline_bn: 'প্রামাণ্য ক্লাসরুম পাইলট, এআই স্পিচ টুলস এবং নীতিনির্ধারণী গবেষণাপত্র প্রণয়ন।',
    description_en: 'Applied research on teaching, learning and technology use; rigorous pilots and evaluations; prototypes of new learning tools; and high-impact policy and practice briefs.',
    description_bn: 'শিক্ষণ, শিখন ও প্রযুক্তি ব্যবহারের ওপর ফলিত গবেষণা; ক্লাসরুম পাইলট ও মূল্যায়ন; নতুন লার্নিং টুলের প্রোটোটাইপিং; এবং নীতিনির্ধারকদের জন্য পলিসি ও প্র্যাকটিস ব্রিফ।',
    deliverables_en: [
      'Applied Research on Classroom Learning & Tech Impact',
      'Bengali & English Speech-to-Text Transcription for Classrooms',
      'Interactive Game-Based Learning Modules & Simulations',
      'Policy Briefs & Independent Programme Evaluation'
    ],
    deliverables_bn: [
      'ক্লাসরুমে প্রযুক্তির সঠিক প্রয়োগ ও ফলাফলের ওপর ফলিত গবেষণা',
      'শ্রেণিকক্ষের জন্য বাংলা ও ইংরেজি স্পিচ-টু-টেক্সট রূপান্তর',
      'গেমিফাইড শিখন মডিউল ও ইন্টারেক্টিভ সিমুলেশন',
      'পলিসি ব্রিফ এবং এডুটেক কর্মসূচির স্বাধীন মূল্যায়ন'
    ],
    beneficiaries_en: 'Policy-Makers, Donors, Institutions, Education Community',
    beneficiaries_bn: 'নীতি-নির্ধারক, দাতা সংস্থা, শিক্ষা প্রতিষ্ঠান ও গবেষক সমাজ',
    icon: PsychologyIcon,
    accent: tokens.colors.accent[500],
    badge: 'Evidence & AI',
  }
];

const futureDirections = [
  { en: 'Curriculum & learning-content development, including teacher guides', bn: 'শিক্ষক সহায়িকাসহ শিক্ষাক্রম ও শিখন সামগ্রী উন্নয়ন' },
  { en: 'School and head-teacher leadership programmes', bn: 'বিদ্যালয় প্রধান ও শিক্ষা নেতৃত্ব বিকাশ কর্মসূচি' },
  { en: 'AI-enabled learning tools (Bangla & English speech-to-text)', bn: 'এআই-চালিত শিখন টুল (বাংলা ও ইংরেজি স্পিচ-টু-টেক্সট)' },
  { en: 'Advisory services for institutions adopting educational technology', bn: 'শিক্ষা প্রতিষ্ঠানসমূহে এডুটেক গ্রহণে বিশেষায়িত পরামর্শ সেবা' },
  { en: 'Independent evaluation of EduTech and teacher-training programmes', bn: 'এডুটেক ও শিক্ষক প্রশিক্ষণ কর্মসূচির স্বাধীন মূল্যায়ন' },
  { en: 'A community of practice and events for educators and EdTech builders', bn: 'শিক্ষাবিদ ও এডুটেক নির্মাতাদের সমন্বিত প্র্যাকটিস কমিউনিটি ও সম্মেলন' },
];

export default function FocusAreas() {
  const { lang, t } = useLanguage();
  const [focusAreas, setFocusAreas] = useState(defaultPillars);

  useEffect(() => {
    const fetchFocus = async () => {
      try {
        const res = await api.get('/cms/focus-areas/');
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((item, idx) => ({
            ...item,
            deliverables_en: typeof item.deliverables_en === 'string' ? item.deliverables_en.split('\n').filter(Boolean) : item.deliverables_en,
            deliverables_bn: typeof item.deliverables_bn === 'string' ? item.deliverables_bn.split('\n').filter(Boolean) : item.deliverables_bn,
            icon: idx === 0 ? SchoolIcon : idx === 1 ? ComputerIcon : PsychologyIcon,
            accent: idx === 0 ? tokens.colors.primary[500] : idx === 1 ? tokens.colors.secondary[500] : tokens.colors.accent[500],
            badge: idx === 0 ? 'Core Program' : idx === 1 ? 'Technology Stack' : 'Evidence & AI',
          }));
          setFocusAreas(merged);
        }
      } catch (err) {
        console.log('Using default focus areas fallback');
      }
    };
    fetchFocus();
  }, []);

  return (
    <Box id="solutions" sx={{ py: { xs: 7, md: 11 }, backgroundColor: tokens.colors.neutral[50] }}>
      <Container maxWidth="xl">
        
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            label={t('THREE CONNECTED FOCUS AREAS', 'তিনটি সমন্বিত কর্মক্ষেত্র')}
            sx={{
              backgroundColor: tokens.colors.primary[50],
              color: tokens.colors.primary[600],
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              mb: 2,
              borderRadius: `${tokens.radius.sm}px`,
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              color: tokens.colors.neutral[900],
              mb: 2,
              letterSpacing: '-0.025em',
            }}
          >
            {t('What We Do at CEDR', 'সিইডিআর যেভাবে কাজ করে')}
          </Typography>
          <Typography variant="body1" sx={{ color: tokens.colors.neutral[600], fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'The Center works across three connected focus areas, so that courses, tools and research continuously reinforce and strengthen one another.',
              'কেন্দ্রটি তিনটি আন্তঃসংযুক্ত ক্ষেত্রে কাজ করে, যাতে প্রশিক্ষণ কোর্স, প্রযুক্তিগত টুলস এবং ফলিত গবেষণা একে অপরকে সমৃদ্ধ ও শক্তিশালী করতে পারে।'
            )}
          </Typography>
        </Box>

        {/* 3 Core Pillars Cards */}
        <Grid container spacing={4}>
          {focusAreas.map((area, index) => {
            const IconComponent = area.icon || SchoolIcon;
            return (
              <Grid size={{ xs: 12, lg: 4 }} key={area.key_code || index}>
                <motion.div
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: `${tokens.radius.xl}px`,
                      border: `1px solid ${tokens.colors.neutral[200]}`,
                      backgroundColor: '#FFFFFF',
                      boxShadow: tokens.shadows.sm,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: tokens.shadows.lg,
                        borderColor: area.accent,
                      },
                    }}
                  >
                    {/* Top Accent Strip */}
                    <Box sx={{ height: 5, backgroundColor: area.accent, width: '100%' }} />

                    <CardContent sx={{ p: { xs: 3, md: 3.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Top Row: Icon + Badge */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: `${tokens.radius.md}px`,
                            backgroundColor: `${area.accent}14`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: area.accent,
                          }}
                        >
                          <IconComponent sx={{ fontSize: 28 }} />
                        </Box>
                        <Chip
                          label={area.badge}
                          size="small"
                          sx={{
                            backgroundColor: `${area.accent}12`,
                            color: area.accent,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            borderRadius: `${tokens.radius.sm}px`,
                          }}
                        />
                      </Box>

                      {/* Title & Tagline */}
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 800, color: tokens.colors.neutral[900], mb: 1, lineHeight: 1.3, fontSize: '1.2rem' }}
                      >
                        {t(area.title_en, area.title_bn)}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: tokens.colors.accent[600], fontWeight: 600, mb: 1.5, minHeight: 38, fontSize: '0.875rem' }}
                      >
                        {t(area.tagline_en, area.tagline_bn)}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: tokens.colors.neutral[600], lineHeight: 1.6, mb: 2.5, flexGrow: 1, fontSize: '0.875rem' }}
                      >
                        {t(area.description_en, area.description_bn)}
                      </Typography>

                      <Divider sx={{ my: 1.5, borderColor: tokens.colors.neutral[200] }} />

                      {/* Deliverables List */}
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.colors.neutral[800], mb: 1, fontSize: '0.8125rem' }}>
                        {t('Key Deliverables:', 'মূল সেবাসমূহ:')}
                      </Typography>

                      <List disablePadding sx={{ mb: 2.5 }}>
                        {(lang === 'bn' ? area.deliverables_bn : area.deliverables_en).map((del, dIdx) => (
                          <ListItem key={dIdx} disableGutters sx={{ py: 0.35 }}>
                            <ListItemIcon sx={{ minWidth: 26 }}>
                              <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: tokens.colors.secondary[500] }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={del.replace(/^•\s*/, '')}
                              slotProps={{ primary: { fontSize: '0.8125rem', color: tokens.colors.neutral[700], fontWeight: 500 } }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      {/* Who Benefits */}
                      <Box
                        sx={{
                          backgroundColor: tokens.colors.neutral[100],
                          borderRadius: `${tokens.radius.md}px`,
                          p: 1.75,
                          mt: 'auto',
                        }}
                      >
                        <Typography variant="caption" sx={{ color: tokens.colors.neutral[500], fontWeight: 700, display: 'block', mb: 0.25, fontSize: '0.6875rem' }}>
                          {t('WHO BENEFITS', 'সুবিধাভোগী')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: tokens.colors.neutral[900], fontWeight: 600, fontSize: '0.8125rem' }}>
                          {t(area.beneficiaries_en, area.beneficiaries_bn)}
                        </Typography>
                      </Box>

                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Planned Future Directions Banner */}
        <Box
          sx={{
            mt: 7,
            backgroundColor: tokens.colors.primary[500],
            color: '#FFFFFF',
            borderRadius: `${tokens.radius.xl}px`,
            p: { xs: 3.5, md: 5 },
            position: 'relative',
            overflow: 'hidden',
            boxShadow: tokens.shadows.brandGlow,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: -60,
              top: -60,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.35) 0%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Chip
                label={t('ROADMAP HORIZONS', 'ভবিষ্যৎ কর্মপরিকল্পনা')}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: tokens.colors.accent[300],
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  mb: 1.5,
                  borderRadius: `${tokens.radius.sm}px`
                }}
              />
              <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5, color: '#FFFFFF', fontSize: { xs: '1.5rem', md: '1.875rem' } }}>
                {t('Planned Future Directions', 'আসন্ন সম্প্রসারণ ও কর্মসূচি')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(241, 245, 249, 0.88)', lineHeight: 1.65, fontSize: '0.875rem' }}>
                {t(
                  'As organizational capacity expands, CEDR will systematically phase in these high-impact initiatives to transform educational outcomes nationally.',
                  'প্রাতিষ্ঠানিক সক্ষমতা বৃদ্ধির সাথে সাথে সিইডিআর দেশব্যাপী শিক্ষাব্যবস্থার মানোন্নয়নে এই অগ্রাধিকারমূলক উদ্যোগগুলো ধাপে ধাপে বাস্তবায়ন করবে।'
                )}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }}>
              <Grid container spacing={2}>
                {futureDirections.map((item, idx) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        borderRadius: `${tokens.radius.md}px`,
                        p: 1.75,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: tokens.colors.secondary[400],
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 500, fontSize: '0.8125rem' }}>
                        {t(item.en, item.bn)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
