import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, IconButton, Chip,
  Grid, Card, useTheme, useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TerminalIcon from '@mui/icons-material/Terminal';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';
import api from '../services/api';

const defaultSlides = [
  {
    id: 1,
    title_en: "Empowering Educators, Engineering Scalable Platforms, Grounded in Research",
    title_bn: "শিক্ষক সক্ষমতা বৃদ্ধি, আধুনিক লার্নিং প্ল্যাটফর্ম এবং বাস্তবমুখী গবেষণা",
    subtitle_en: "The Center works where pedagogy and technology meet: training teachers, building robust assessment tools and online platforms that support them, and researching what works.",
    subtitle_bn: "যেখানে শিক্ষণপদ্ধতি ও প্রযুক্তির মেলবন্ধন: শিক্ষকদের প্রশিক্ষণ, মূল্যায়নের উপযোগী টুল ও অনলাইন প্ল্যাটফর্ম নির্মাণ এবং কার্যকর শিক্ষাব্যবস্থার বাস্তবমুখী গবেষণা।",
    badge_en: "PRACTITIONER-FOUNDED EDTECH",
    badge_bn: "অভিজ্ঞ শিক্ষাবিদ ও প্রযুক্তিবিদদের উদ্যোগে প্রতিষ্ঠিত",
    cta_primary_text_en: "Explore Our Solutions",
    cta_primary_text_bn: "আমাদের সেবাসমূহ",
    cta_primary_link: "#solutions",
    cta_secondary_text_en: "Partner With Us",
    cta_secondary_text_bn: "অংশীদার হোন",
    cta_secondary_link: "#partnership",
    stat_number: "100%",
    stat_label_en: "Curriculum & Classroom Grounded",
    stat_label_bn: "জাতীয় শিক্ষাক্রম ও শ্রেণিকক্ষ উপযোগী",
    theme_gradient: "blue",
  },
  {
    id: 2,
    title_en: "Scalable Assessment Tools & VLE Learning Platforms",
    title_bn: "উন্নত মূল্যায়ন টুল এবং আধুনিক ভার্চুয়াল লার্নিং এনভায়রনমেন্ট",
    subtitle_en: "Deploying Moodle & Canvas-grade delivery platforms with complete Bangla and English bilingual support, automated item banks, secure testing, and deep learning analytics.",
    subtitle_bn: "মুডল ও ক্যানভাস সমমানের প্ল্যাটফর্ম, বাংলা ও ইংরেজি দ্বিভাষিক ইন্টারফেস, স্বয়ংক্রিয় প্রশ্নভাণ্ডার এবং ডাটা-চালিত শিখন অ্যানালিটিক্স।",
    badge_en: "NEXT-GEN PLATFORMS",
    badge_bn: "পরবর্তী প্রজন্মের প্ল্যাটফর্ম",
    cta_primary_text_en: "Interactive Platform Demo",
    cta_primary_text_bn: "প্ল্যাটফর্ম ডেমো দেখুন",
    cta_primary_link: "#platforms",
    cta_secondary_text_en: "Technical Capabilities",
    cta_secondary_text_bn: "কারিগরি সক্ষমতা",
    cta_secondary_link: "#platforms",
    stat_number: "Bilingual",
    stat_label_en: "Bangla & English Ready",
    stat_label_bn: "বাংলা ও ইংরেজি উভয়ে কার্যকর",
    theme_gradient: "emerald",
  },
  {
    id: 3,
    title_en: "Pioneering AI & NLP Innovations for Inclusive Education",
    title_bn: "অন্তর্ভুক্তিমূলক শিক্ষার জন্য এআই ও এনএলপি প্রযুক্তির উদ্ভাবন",
    subtitle_en: "Integrating Bengali speech-to-text transcription, interactive gamified modules, and adaptive learning algorithms to bridge educational equity across Bangladesh.",
    subtitle_bn: "বাংলা স্পিচ-টু-টেক্সট রূপান্তর, ইন্টারঅ্যাক্টিভ গেমিফাইড পাঠ এবং অভিযোজিত শিখন অ্যালগরিদমের মাধ্যমে সর্বস্তরে মানসম্মত শিক্ষা নিশ্চিতকরণ।",
    badge_en: "AI & RESEARCH INNOVATION",
    badge_bn: "এআই ও গবেষণা উদ্ভাবন",
    cta_primary_text_en: "View Research & Innovations",
    cta_primary_text_bn: "গবেষণা ও উদ্ভাবন",
    cta_primary_link: "#research",
    cta_secondary_text_en: "Explore Roadmap",
    cta_secondary_text_bn: "রোডম্যাপ দেখুন",
    cta_secondary_link: "#roadmap",
    stat_number: "4-Step",
    stat_label_en: "Design • Pilot • Evaluate • Scale",
    stat_label_bn: "পরিকল্পনা • পাইলট • মূল্যায়ন • বিস্তার",
    theme_gradient: "cyan",
  }
];

export default function HeroSlider() {
  const { lang, t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [slides, setSlides] = useState(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  // Fetch dynamic slides from Django REST endpoint
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await api.get('/cms/hero-slides/');
        if (res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      } catch (err) {
        console.log('Using default hero slides fallback');
      }
    };
    fetchSlides();
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, slides.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || defaultSlides[0];

  // Visual gradients based on theme tokens
  const getGradientStyle = (type) => {
    switch (type) {
      case 'emerald':
        return {
          bg: 'linear-gradient(135deg, #064E3B 0%, #0D3B75 100%)',
          accent: tokens.colors.secondary[300],
          chipBg: 'rgba(16, 185, 129, 0.18)',
          glow: 'rgba(16, 185, 129, 0.28)',
        };
      case 'cyan':
        return {
          bg: 'linear-gradient(135deg, #075985 0%, #0D3B75 100%)',
          accent: tokens.colors.accent[300],
          chipBg: 'rgba(56, 189, 248, 0.18)',
          glow: 'rgba(56, 189, 248, 0.28)',
        };
      case 'blue':
      default:
        return {
          bg: 'linear-gradient(135deg, #0D3B75 0%, #030F20 100%)',
          accent: tokens.colors.secondary[400],
          chipBg: 'rgba(34, 197, 94, 0.18)',
          glow: 'rgba(2, 132, 199, 0.28)',
        };
    }
  };

  const currentTheme = getGradientStyle(currentSlide.theme_gradient);

  // Framer motion variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 240, damping: 26 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      transition: { duration: 0.25 },
    }),
  };

  const handleAction = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        position: 'relative',
        background: currentTheme.bg,
        color: '#FFFFFF',
        overflow: 'hidden',
        minHeight: { xs: 660, md: 720 },
        display: 'flex',
        alignItems: 'center',
        transition: 'background 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        py: { xs: 7, md: 9 },
      }}
    >
      {/* Background Tech Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${currentTheme.glow} 0%, rgba(0,0,0,0) 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: -120,
          width: 440,
          height: 440,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id || currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Grid container spacing={5} sx={{ alignItems: 'center' }}>
              
              {/* Left Column: Headline, Subtitle, Badges & CTAs */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box>
                  
                  {/* Badge */}
                  <motion.div
                    initial={{ y: -16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12, duration: 0.35 }}
                  >
                    <Chip
                      icon={<AutoAwesomeIcon sx={{ color: `${currentTheme.accent} !important`, fontSize: 16 }} />}
                      label={t(currentSlide.badge_en, currentSlide.badge_bn)}
                      sx={{
                        backgroundColor: currentTheme.chipBg,
                        color: '#FFFFFF',
                        border: `1px solid ${currentTheme.accent}55`,
                        backdropFilter: 'blur(10px)',
                        px: 1,
                        py: 0.5,
                        mb: 2.5,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        fontSize: '0.75rem',
                        borderRadius: `${tokens.radius.sm}px`,
                      }}
                    />
                  </motion.div>

                  {/* Headline */}
                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Typography
                      variant={isMobile ? 'h3' : 'h2'}
                      component="h1"
                      sx={{
                        fontWeight: 800,
                        color: '#FFFFFF',
                        lineHeight: 1.18,
                        mb: 2.5,
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {t(currentSlide.title_en, currentSlide.title_bn)}
                    </Typography>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.28, duration: 0.4 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(241, 245, 249, 0.92)',
                        fontWeight: 400,
                        lineHeight: 1.65,
                        mb: 3.5,
                        maxWidth: 620,
                        fontSize: { xs: '0.9375rem', md: '1.0625rem' },
                      }}
                    >
                      {t(currentSlide.subtitle_en, currentSlide.subtitle_bn)}
                    </Typography>
                  </motion.div>

                  {/* Highlight Stat Pill */}
                  {currentSlide.stat_number && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.36, duration: 0.35 }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1.5,
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: `${tokens.radius.md}px`,
                          px: 2,
                          py: 1,
                          mb: 3.5,
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight={800}
                          sx={{ color: currentTheme.accent, lineHeight: 1 }}
                        >
                          {currentSlide.stat_number}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.8125rem' }}>
                          {t(currentSlide.stat_label_en, currentSlide.stat_label_bn)}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}

                  {/* CTAs */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => handleAction(currentSlide.cta_primary_link)}
                      sx={{
                        backgroundColor: tokens.colors.secondary[500],
                        color: '#FFFFFF',
                        fontWeight: 700,
                        height: 48,
                        px: 3,
                        fontSize: '0.9375rem',
                        borderRadius: `${tokens.radius.md}px`,
                        boxShadow: tokens.shadows.emeraldGlow,
                        '&:hover': {
                          backgroundColor: tokens.colors.secondary[600],
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {t(currentSlide.cta_primary_text_en, currentSlide.cta_primary_text_bn)}
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => handleAction(currentSlide.cta_secondary_link)}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        height: 48,
                        px: 2.75,
                        fontSize: '0.9375rem',
                        borderRadius: `${tokens.radius.md}px`,
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                          borderColor: '#FFFFFF',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {t(currentSlide.cta_secondary_text_en, currentSlide.cta_secondary_text_bn)}
                    </Button>
                  </Box>

                </Box>
              </Grid>

              {/* Right Column: Dynamic Interactive Card Simulator */}
              <Grid size={{ xs: 12, md: 5 }}>
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <Card
                    sx={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: `${tokens.radius.xl}px`,
                      p: 3,
                      boxShadow: tokens.shadows['2xl'],
                      color: '#FFFFFF',
                    }}
                  >
                    {/* Header inside card */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <Typography variant="caption" sx={{ color: '#94A3B8', ml: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          cedr-preview.vle
                        </Typography>
                      </Box>
                      <Chip
                        label="LIVE DEMO"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          color: '#4ADE80',
                          fontWeight: 700,
                          fontSize: '0.6875rem',
                          height: 22,
                          borderRadius: `${tokens.radius.xs}px`,
                        }}
                      />
                    </Box>

                    {/* Contextual Visual based on slide */}
                    {currentIndex === 0 && (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ p: 1.25, borderRadius: `${tokens.radius.md}px`, backgroundColor: 'rgba(2, 132, 199, 0.2)' }}>
                            <SchoolIcon sx={{ color: '#38BDF8', fontSize: 26 }} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', color: '#FFFFFF' }}>
                              Pedagogy & Tech Convergence
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                              Co-designed with NCTB & BRAC Curriculum Veterans
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: `${tokens.radius.md}px`, mb: 2 }}>
                          <Typography variant="body2" sx={{ color: '#CBD5E1', fontSize: '0.8125rem', lineHeight: 1.7 }}>
                            ✓ Digital Pedagogy Certificate Modules<br />
                            ✓ Responsible AI in Classroom Literacy<br />
                            ✓ Formative Assessment Analytics
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                            Target Cohort: School Networks & Universities
                          </Typography>
                          <Chip label="Ready to Pilot" size="small" color="secondary" sx={{ borderRadius: `${tokens.radius.xs}px`, height: 22 }} />
                        </Box>
                      </Box>
                    )}

                    {currentIndex === 1 && (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ p: 1.25, borderRadius: `${tokens.radius.md}px`, backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                            <TerminalIcon sx={{ color: '#34D399', fontSize: 26 }} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', color: '#FFFFFF' }}>
                              Bilingual VLE & LMS Engine
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                              Moodle / Canvas Powered Architecture
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: `${tokens.radius.md}px`, mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                            <Typography variant="caption" sx={{ color: '#38BDF8', fontSize: '0.75rem' }}>Course Completion Rate</Typography>
                            <Typography variant="caption" sx={{ color: '#34D399', fontWeight: 700, fontSize: '0.75rem' }}>94.2%</Typography>
                          </Box>
                          <Box sx={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: `${tokens.radius.xs}px` }}>
                            <Box sx={{ width: '94%', height: '100%', backgroundColor: '#10B981', borderRadius: `${tokens.radius.xs}px` }} />
                          </Box>
                          <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 1.5, fontSize: '0.75rem', lineHeight: 1.6 }}>
                            • Full Bangla & English Unicode Interface<br />
                            • Automated Item Banking & Rubric Scoring
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                            Scalable for 100K+ concurrent learners
                          </Typography>
                          <Chip label="Enterprise Ready" size="small" sx={{ backgroundColor: tokens.colors.accent[500], color: '#FFF', borderRadius: `${tokens.radius.xs}px`, height: 22 }} />
                        </Box>
                      </Box>
                    )}

                    {currentIndex === 2 && (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ p: 1.25, borderRadius: `${tokens.radius.md}px`, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}>
                            <RecordVoiceOverIcon sx={{ color: '#38BDF8', fontSize: 26 }} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', color: '#FFFFFF' }}>
                              Bangla Speech-to-Text Transcriber
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                              Classroom AI & Natural Language Processing
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: `${tokens.radius.md}px`, mb: 2 }}>
                          <Typography variant="caption" sx={{ color: '#38BDF8', fontWeight: 700, display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                            🎙️ Live Classroom Speech Capture (Bengali):
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#E2E8F0', fontStyle: 'italic', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                            "আজকের পাঠে আমরা পরিবেশ বিজ্ঞানের মৌলিক ধারণাগুলো বাস্তব প্রমাণের মাধ্যমে বিশ্লেষণ করব..."
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                            <Chip label="Accuracy: 96.8%" size="small" sx={{ backgroundColor: 'rgba(16,185,129,0.2)', color: '#4ADE80', fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />
                            <Chip label="Realtime NLP" size="small" sx={{ backgroundColor: 'rgba(56,189,248,0.2)', color: '#38BDF8', fontSize: '0.6875rem', height: 20, borderRadius: `${tokens.radius.xs}px` }} />
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                            Published under CEDR Innovation Lab
                          </Typography>
                          <Chip label="Pilot Stage" size="small" color="secondary" sx={{ borderRadius: `${tokens.radius.xs}px`, height: 22 }} />
                        </Box>
                      </Box>
                    )}

                  </Card>
                </motion.div>
              </Grid>

            </Grid>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls & Navigation */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: { xs: 4, md: 6 },
            pt: 2.5,
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* Pagination Indicators */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {slides.map((s, idx) => (
              <Box
                key={s.id || idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                sx={{
                  width: idx === currentIndex ? 32 : 8,
                  height: 8,
                  borderRadius: `${tokens.radius.xs}px`,
                  backgroundColor: idx === currentIndex ? currentTheme.accent : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  '&:hover': {
                    backgroundColor: idx === currentIndex ? currentTheme.accent : 'rgba(255, 255, 255, 0.6)',
                  },
                }}
              />
            ))}
            <Typography variant="caption" sx={{ color: '#94A3B8', ml: 1, fontWeight: 600, fontSize: '0.75rem' }}>
              0{currentIndex + 1} / 0{slides.length}
            </Typography>
          </Box>

          {/* Previous / Next Arrow Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={handlePrev}
              size="small"
              aria-label="Previous Slide"
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: `${tokens.radius.md}px`,
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: '#FFFFFF',
                },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
            </IconButton>

            <IconButton
              onClick={handleNext}
              size="small"
              aria-label="Next Slide"
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: `${tokens.radius.md}px`,
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: '#FFFFFF',
                },
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>

        </Box>

      </Container>
    </Box>
  );
}
