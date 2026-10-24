import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Tabs, Tab, Card,
  CardContent, Button, Chip, LinearProgress, Stack,
  Radio, RadioGroup, FormControlLabel, FormControl, Alert, Paper, IconButton
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LanguageIcon from '@mui/icons-material/Language';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';

export default function PlatformShowcase() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  // Demo 1 State (LMS)
  const [completedLessons, setCompletedLessons] = useState([true, true, false, false]);
  const [vleLang, setVleLang] = useState('en');

  // Demo 2 State (Assessment)
  const [selectedBloom, setSelectedBloom] = useState('Applying');
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Demo 3 State (Bangla Speech-to-Text)
  const [transcribing, setTranscribing] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [sampleAudioPlaying, setSampleAudioPlaying] = useState(false);

  // Demo 4 State (Gamified Simulation)
  const [simStep, setSimStep] = useState(0);
  const [simScore, setSimScore] = useState(0);

  // Speech-to-text simulation
  useEffect(() => {
    let timer;
    if (transcribing) {
      const fullText = "আজকের পাঠে আমরা পরিবেশ বিজ্ঞানের মৌলিক ধারণাগুলো বাস্তব প্রমাণের মাধ্যমে শ্রেণিকক্ষে বিশ্লেষণ করব। শিক্ষার্থীরা দলগতভাবে স্থানীয় বাস্তুতন্ত্রের উপাত্ত সংগ্রহ করবে...";
      let i = 0;
      setTranscriptText('');
      timer = setInterval(() => {
        if (i < fullText.length) {
          setTranscriptText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          setTranscribing(false);
          clearInterval(timer);
        }
      }, 40);
    }
    return () => clearInterval(timer);
  }, [transcribing]);

  const toggleLesson = (idx) => {
    const next = [...completedLessons];
    next[idx] = !next[idx];
    setCompletedLessons(next);
  };

  const lmsLessons = [
    { en: 'Module 1: Principles of Constructivist Pedagogy', bn: 'মডিউল ১: গঠনমূলক পেডাগোজির মূলনীতি' },
    { en: 'Module 2: Aligning Assessments with Bloom\'s Taxonomy', bn: 'মডিউল ২: ব্লুমস ট্যাক্সোনমির সাথে মূল্যায়নের সমন্বয়' },
    { en: 'Module 3: Designing Formative Feedback in Moodle', bn: 'মডিউল ৩: মুডলে গঠনমূলক ফিডব্যাক প্রণয়ন' },
    { en: 'Module 4: Generative AI for Bangladeshi Educators', bn: 'মডিউল ৪: বাংলাদেশি শিক্ষকদের জন্য জেনারেটিভ এআই' },
  ];

  const completionPercent = Math.round((completedLessons.filter(Boolean).length / completedLessons.length) * 100);

  return (
    <Box id="platforms" sx={{ py: { xs: 7, md: 11 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto', mb: 5 }}>
          <Chip
            label={t('INTERACTIVE TECHNOLOGY LAB', 'ইন্টারঅ্যাক্টিভ প্রযুক্তি ল্যাব')}
            sx={{
              backgroundColor: tokens.colors.accent[50],
              color: tokens.colors.accent[700],
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
            sx={{ fontWeight: 800, color: tokens.colors.neutral[900], mb: 2, letterSpacing: '-0.025em' }}
          >
            {t('Platforms, Interactive Tools & NLP Innovations', 'প্ল্যাটফর্ম, ইন্টারঅ্যাক্টিভ টুল ও এআই উদ্ভাবন')}
          </Typography>
          <Typography variant="body1" sx={{ color: tokens.colors.neutral[600], fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'Experience live simulations of our Canvas/Moodle-grade LMS architecture, automated assessment engines, Bangla speech recognition, and gamified pedagogical modules.',
              'আমাদের ক্যানভাস/মুডল সমমানের এলএমএস, স্বয়ংক্রিয় মূল্যায়ন ইঞ্জিন, বাংলা ভয়েস রিকগনিশন এবং গেমিফাইড শিখন মডিউলের বাস্তব অভিজ্ঞতা নিন।'
            )}
          </Typography>
        </Box>

        {/* Navigation Tabs styled per UI design system */}
        <Box sx={{ borderBottom: 1, borderColor: tokens.colors.neutral[200], mb: 4.5 }}>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: tokens.colors.primary[500],
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: { xs: '0.8125rem', md: '0.9375rem' },
                py: 1.75,
                px: 2.5,
                textTransform: 'none',
                color: tokens.colors.neutral[600],
                transition: 'all 150ms ease',
                '&.Mui-selected': {
                  color: tokens.colors.primary[500],
                },
              },
            }}
          >
            <Tab icon={<SchoolIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t('1. Virtual Learning VLE (Moodle/Canvas)', '১. ভার্চুয়াল লার্নিং প্ল্যাটফর্ম (মুডল)')} />
            <Tab icon={<AssessmentIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t('2. Smart Assessment & Item Bank', '২. স্মার্ট মূল্যায়ন ও প্রশ্নভাণ্ডার')} />
            <Tab icon={<MicIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t('3. Bangla Speech-to-Text NLP', '৩. বাংলা স্পিচ-টু-টেক্সট এআই')} />
            <Tab icon={<SportsEsportsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={t('4. Gamified Pedagogical Modules', '৪. গেমিফাইড লার্নিং মডিউল')} />
          </Tabs>
        </Box>

        {/* Interactive Sandbox Panels */}
        <AnimatePresence mode="wait">
          
          {/* TAB 0: VLE LMS Architecture */}
          {activeTab === 0 && (
            <motion.div
              key="tab0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <Box sx={{ pr: { lg: 2 } }}>
                    <Chip label="ENTERPRISE READY" size="small" color="primary" sx={{ mb: 1.5, fontWeight: 700, borderRadius: `${tokens.radius.sm}px` }} />
                    <Typography variant="h5" fontWeight={800} color={tokens.colors.primary[500]} sx={{ mb: 1.5 }}>
                      CEDR Virtual Learning Environment (VLE)
                    </Typography>
                    <Typography variant="body2" sx={{ color: tokens.colors.neutral[600], lineHeight: 1.65, mb: 2, fontSize: '0.875rem' }}>
                      {t(
                        'Tailored for Bangladeshi institutions and school networks. Delivers asynchronous video lectures, graded discussions, automated rubrics, and micro-credential certifications with full Bangla Unicode support.',
                        'বাংলাদেশের শিক্ষাপ্রতিষ্ঠানের উপযোগী করে নির্মিত। সম্পূর্ণ বাংলা ও ইংরেজি সমর্থনসহ ভিডিও লেকচার, গ্রেডেড আলোচনা, এবং মাইক্রো-সার্টিফিকেশন প্রদানের নির্ভরযোগ্য ব্যবস্থা।'
                      )}
                    </Typography>
                    <Box sx={{ mt: 2.5, p: 2, backgroundColor: tokens.colors.neutral[50], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
                      <Typography variant="caption" fontWeight={700} color={tokens.colors.primary[500]} display="block" gutterBottom sx={{ fontSize: '0.75rem' }}>
                        TECH SPECIFICATIONS:
                      </Typography>
                      <Typography variant="body2" color={tokens.colors.neutral[700]} sx={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                        • Core: Moodle 4.x / Canvas Architecture<br />
                        • Database: PostgreSQL with Redis Caching<br />
                        • Mobile: Responsive PWA (Low Data Mode)<br />
                        • Analytics: xAPI & LTI 1.3 Certified
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                  {/* Interactive LMS Simulator */}
                  <Card sx={{ border: `1px solid ${tokens.colors.neutral[200]}`, borderRadius: `${tokens.radius.lg}px`, overflow: 'hidden', boxShadow: tokens.shadows.md }}>
                    {/* Top Browser Bar */}
                    <Box sx={{ backgroundColor: tokens.colors.primary[500], color: '#FFFFFF', p: 1.75, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <SchoolIcon sx={{ color: tokens.colors.secondary[400], fontSize: 20 }} />
                        <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                          CEDR Learning Portal • Course: Digital Pedagogy Mastery
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        onClick={() => setVleLang(vleLang === 'en' ? 'bn' : 'en')}
                        startIcon={<LanguageIcon sx={{ fontSize: 14 }} />}
                        sx={{ color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', height: 28, borderRadius: `${tokens.radius.sm}px` }}
                      >
                        {vleLang === 'en' ? 'বাংলা রূপান্তর' : 'Switch English'}
                      </Button>
                    </Box>

                    <CardContent sx={{ p: 3, backgroundColor: tokens.colors.neutral[50] }}>
                      {/* Course Progress Bar */}
                      <Box sx={{ mb: 3, backgroundColor: '#FFFFFF', p: 2, borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                          <Typography variant="body2" fontWeight={700} color={tokens.colors.neutral[800]} sx={{ fontSize: '0.8125rem' }}>
                            {vleLang === 'en' ? 'Your Certification Progress' : 'আপনার সার্টিফিকেশন অগ্রগতি'}
                          </Typography>
                          <Typography variant="body2" fontWeight={800} color={tokens.colors.secondary[600]} sx={{ fontSize: '0.8125rem' }}>
                            {completionPercent}% Completed
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={completionPercent}
                          sx={{
                            height: 7,
                            borderRadius: `${tokens.radius.xs}px`,
                            backgroundColor: tokens.colors.neutral[200],
                            '& .MuiLinearProgress-bar': { backgroundColor: tokens.colors.secondary[500] }
                          }}
                        />
                      </Box>

                      {/* Interactive Lesson Checklist */}
                      <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                        {vleLang === 'en' ? 'Syllabus & Interactive Micro-Lessons (Click to toggle completion):' : 'সিলেবাস ও ইন্টারেক্টিভ পাঠ (ক্লিক করে সম্পন্ন চিহ্নিত করুন):'}
                      </Typography>

                      <Stack spacing={1.25}>
                        {lmsLessons.map((item, idx) => {
                          const isDone = completedLessons[idx];
                          return (
                            <Paper
                              key={idx}
                              onClick={() => toggleLesson(idx)}
                              sx={{
                                p: 1.75,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                borderRadius: `${tokens.radius.md}px`,
                                border: '1px solid',
                                borderColor: isDone ? tokens.colors.secondary[200] : tokens.colors.neutral[200],
                                backgroundColor: isDone ? tokens.colors.secondary[50] : '#FFFFFF',
                                transition: 'all 150ms ease',
                                '&:hover': {
                                  borderColor: tokens.colors.primary[300],
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <IconButton size="small" sx={{ color: isDone ? tokens.colors.secondary[500] : tokens.colors.neutral[400] }}>
                                  <CheckCircleIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                                <Typography
                                  variant="body2"
                                  fontWeight={isDone ? 700 : 500}
                                  sx={{
                                    color: isDone ? tokens.colors.neutral[900] : tokens.colors.neutral[700],
                                    textDecoration: isDone ? 'none' : 'none',
                                    fontSize: '0.8125rem',
                                  }}
                                >
                                  {vleLang === 'en' ? item.en : item.bn}
                                </Typography>
                              </Box>
                              <Chip
                                label={isDone ? 'Completed' : 'Pending'}
                                size="small"
                                sx={{
                                  backgroundColor: isDone ? tokens.colors.secondary[500] : tokens.colors.neutral[200],
                                  color: isDone ? '#FFFFFF' : tokens.colors.neutral[700],
                                  fontWeight: 700,
                                  fontSize: '0.6875rem',
                                  height: 22,
                                  borderRadius: `${tokens.radius.xs}px`,
                                }}
                              />
                            </Paper>
                          );
                        })}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* TAB 1: Smart Assessment & Item Bank */}
          {activeTab === 1 && (
            <motion.div
              key="tab1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <Box sx={{ pr: { lg: 2 } }}>
                    <Chip label="ASSESSMENT INNOVATION" size="small" color="secondary" sx={{ mb: 1.5, fontWeight: 700, borderRadius: `${tokens.radius.sm}px` }} />
                    <Typography variant="h5" fontWeight={800} color={tokens.colors.primary[500]} sx={{ mb: 1.5 }}>
                      Automated Item Bank & Rubrics
                    </Typography>
                    <Typography variant="body2" sx={{ color: tokens.colors.neutral[600], lineHeight: 1.65, mb: 2, fontSize: '0.875rem' }}>
                      {t(
                        'Classroom teachers and institutions can generate randomized tests calibrated against Bloom\'s Taxonomy. Supports both formative feedback and summative high-stakes assessment.',
                        'ব্লুমস ট্যাক্সোনমির সাথে সঙ্গতি রেখে প্রশ্নপত্র ও স্বয়ংক্রিয় রুব্রিক্স তৈরি করুন। গঠনমূলক ও সমাপনী পরীক্ষার জন্য সম্পূর্ণ নিরাপদ ও কার্যকর।'
                      )}
                    </Typography>
                    <Box sx={{ mt: 2.5, p: 2, backgroundColor: tokens.colors.neutral[50], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
                      <Typography variant="caption" fontWeight={700} color={tokens.colors.secondary[600]} display="block" gutterBottom sx={{ fontSize: '0.75rem' }}>
                        QUESTION TAXONOMY FILTER:
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                        {['Remembering', 'Understanding', 'Applying', 'Analyzing'].map((lvl) => (
                          <Chip
                            key={lvl}
                            label={lvl}
                            size="small"
                            onClick={() => setSelectedBloom(lvl)}
                            color={selectedBloom === lvl ? 'primary' : 'default'}
                            sx={{ fontWeight: 600, cursor: 'pointer', borderRadius: `${tokens.radius.xs}px` }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                  <Card sx={{ border: `1px solid ${tokens.colors.neutral[200]}`, borderRadius: `${tokens.radius.lg}px`, p: 3, boxShadow: tokens.shadows.md }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.primary[500]}>
                        Active Item Bank Sample • Level: {selectedBloom}
                      </Typography>
                      <Chip label="Item ID: CEDR-2026-NCTB-04" size="small" sx={{ borderRadius: `${tokens.radius.xs}px`, height: 22, fontSize: '0.6875rem' }} />
                    </Box>

                    <Typography variant="body1" fontWeight={600} color={tokens.colors.neutral[900]} sx={{ mb: 2, fontSize: '0.9375rem' }}>
                      "When implementing a flipped classroom model in a high school physics course in Dhaka, which of the following represents the most pedagogically sound formative assessment strategy?"
                    </Typography>

                    <FormControl component="fieldset" sx={{ width: '100%', mb: 2.5 }}>
                      <RadioGroup value={quizAnswer} onChange={(e) => { setQuizAnswer(e.target.value); setQuizSubmitted(false); }}>
                        <FormControlLabel
                          value="A"
                          control={<Radio size="small" />}
                          label={<Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>A) Administering a high-stakes paper quiz at the end of every term without feedback.</Typography>}
                          sx={{ mb: 1 }}
                        />
                        <FormControlLabel
                          value="B"
                          control={<Radio size="small" />}
                          label={<Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>B) Deploying a low-stakes 3-question diagnostic survey via mobile LMS before each collaborative lab.</Typography>}
                          sx={{ mb: 1 }}
                        />
                        <FormControlLabel
                          value="C"
                          control={<Radio size="small" />}
                          label={<Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>C) Lecturing for 90 minutes without checking student comprehension.</Typography>}
                        />
                      </RadioGroup>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        disabled={!quizAnswer}
                        onClick={() => setQuizSubmitted(true)}
                        sx={{ height: 36, px: 2.5, borderRadius: `${tokens.radius.md}px` }}
                      >
                        Submit Answer for Automated Rubric
                      </Button>
                      <Button
                        size="small"
                        onClick={() => { setQuizAnswer(''); setQuizSubmitted(false); }}
                      >
                        Reset
                      </Button>
                    </Box>

                    {quizSubmitted && (
                      <Alert
                        severity={quizAnswer === 'B' ? 'success' : 'warning'}
                        sx={{ mt: 2.5, borderRadius: `${tokens.radius.md}px` }}
                      >
                        {quizAnswer === 'B' ? (
                          <Box>
                            <Typography variant="subtitle2" fontWeight={800}>
                              ✓ Correct! Bloom's Level: {selectedBloom} Mastered.
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                              Pre-class diagnostic surveys allow educators to identify misconceptions early and allocate in-class time to targeted hands-on inquiry.
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                            Incorrect choice. Re-examine the principles of formative assessment and student feedback loops.
                          </Typography>
                        )}
                      </Alert>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* TAB 2: Bangla Speech-to-Text NLP */}
          {activeTab === 2 && (
            <motion.div
              key="tab2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <Box sx={{ pr: { lg: 2 } }}>
                    <Chip label="CEDR INNOVATION LAB" size="small" color="info" sx={{ mb: 1.5, fontWeight: 700, borderRadius: `${tokens.radius.sm}px` }} />
                    <Typography variant="h5" fontWeight={800} color={tokens.colors.primary[500]} sx={{ mb: 1.5 }}>
                      Bangla Speech-to-Text AI for Classrooms
                    </Typography>
                    <Typography variant="body2" sx={{ color: tokens.colors.neutral[600], lineHeight: 1.65, mb: 2, fontSize: '0.875rem' }}>
                      {t(
                        'Empowering teachers to automatically transcribe classroom lectures, generate bilingual lecture notes, and assist students with auditory or learning challenges.',
                        'শ্রেণিকক্ষে শিক্ষকের বক্তব্যকে স্বয়ংক্রিয়ভাবে বাংলায় টেক্সটে রূপান্তর, লেকচার নোট তৈরি এবং বিশেষ চাহিদাসম্পন্ন শিক্ষার্থীদের সহায়তা প্রদানে কার্যকর।'
                      )}
                    </Typography>
                    <Box sx={{ mt: 2.5, p: 2, backgroundColor: tokens.colors.neutral[50], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
                      <Typography variant="caption" fontWeight={700} color={tokens.colors.accent[600]} display="block" gutterBottom sx={{ fontSize: '0.75rem' }}>
                        ACOUSTIC MODEL METRICS:
                      </Typography>
                      <Typography variant="body2" color={tokens.colors.neutral[700]} sx={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                        • Vocabulary: 45,000+ Bengali Educational Lemmas<br />
                        • Word Error Rate (WER): &lt; 3.2% in noisy classrooms<br />
                        • Latency: Under 450ms stream response
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                  <Card sx={{ border: `1px solid ${tokens.colors.neutral[200]}`, borderRadius: `${tokens.radius.lg}px`, p: 3, boxShadow: tokens.shadows.md }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MicIcon sx={{ color: transcribing ? tokens.colors.semantic.error : tokens.colors.neutral[400], fontSize: 22 }} />
                        <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.neutral[900]}>
                          Realtime Acoustic Stream Preview
                        </Typography>
                      </Box>
                      <Chip
                        label={transcribing ? "STREAMING (LIVE)" : "READY TO CAPTURE"}
                        size="small"
                        color={transcribing ? "error" : "default"}
                        sx={{ fontWeight: 700, borderRadius: `${tokens.radius.xs}px`, height: 22, fontSize: '0.6875rem' }}
                      />
                    </Box>

                    <Box
                      sx={{
                        p: 2.5,
                        minHeight: 140,
                        backgroundColor: tokens.colors.neutral[900],
                        color: '#4ADE80',
                        borderRadius: `${tokens.radius.md}px`,
                        fontFamily: 'monospace',
                        fontSize: '0.9375rem',
                        lineHeight: 1.8,
                        mb: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      {transcriptText ? (
                        <span>{transcriptText}</span>
                      ) : (
                        <span style={{ color: '#64748B' }}>
                          [Click "Simulate Live Voice Capture" below to test Bengali acoustic speech recognition...]
                        </span>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        onClick={() => setTranscribing(true)}
                        disabled={transcribing}
                        startIcon={<VolumeUpIcon sx={{ fontSize: 16 }} />}
                        sx={{ height: 38, borderRadius: `${tokens.radius.md}px` }}
                      >
                        Simulate Live Voice Capture
                      </Button>
                      <Button
                        size="small"
                        onClick={() => { setTranscriptText(''); setTranscribing(false); }}
                      >
                        Clear Transcript
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* TAB 3: Gamified Modules */}
          {activeTab === 3 && (
            <motion.div
              key="tab3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <Box sx={{ pr: { lg: 2 } }}>
                    <Chip label="PEDAGOGY SIMULATOR" size="small" color="secondary" sx={{ mb: 1.5, fontWeight: 700, borderRadius: `${tokens.radius.sm}px` }} />
                    <Typography variant="h5" fontWeight={800} color={tokens.colors.primary[500]} sx={{ mb: 1.5 }}>
                      Interactive Scenario Simulations
                    </Typography>
                    <Typography variant="body2" sx={{ color: tokens.colors.neutral[600], lineHeight: 1.65, mb: 2, fontSize: '0.875rem' }}>
                      {t(
                        'Gamified role-play modules allow teachers to test differentiated instructional strategies in simulated classroom crises before stepping into actual schools.',
                        'শ্রেণিকক্ষের নানা বাস্তব পরিস্থিতি ও সংকট মোকাবিলার দক্ষতা অর্জনে শিক্ষকদের জন্য তৈরি ইন্টারেক্টিভ সিমুলেশন গেম।'
                      )}
                    </Typography>
                    <Box sx={{ mt: 2.5, p: 2, backgroundColor: tokens.colors.neutral[50], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
                      <Typography variant="caption" fontWeight={700} color={tokens.colors.primary[500]} display="block" gutterBottom sx={{ fontSize: '0.75rem' }}>
                        PEDAGOGICAL SCORE:
                      </Typography>
                      <Typography variant="h5" fontWeight={800} color={tokens.colors.secondary[600]}>
                        {simScore} Points
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                  <Card sx={{ border: `1px solid ${tokens.colors.neutral[200]}`, borderRadius: `${tokens.radius.lg}px`, p: 3, boxShadow: tokens.shadows.md }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                      <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.primary[500]}>
                        Scenario Simulation: Student Disengagement During Math Lesson
                      </Typography>
                      <Chip label={`Step ${simStep + 1} of 2`} size="small" sx={{ borderRadius: `${tokens.radius.xs}px`, height: 22, fontSize: '0.6875rem' }} />
                    </Box>

                    {simStep === 0 && (
                      <Box>
                        <Typography variant="body1" sx={{ color: tokens.colors.neutral[900], mb: 2, fontSize: '0.9375rem' }}>
                          "Three students in the back row are disengaged and chatting while you introduce algebraic fractions. How do you respond?"
                        </Typography>
                        <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                          <Button
                            variant="outlined"
                            onClick={() => { setSimScore(simScore + 10); setSimStep(1); }}
                            sx={{ justifyContent: 'flex-start', textAlign: 'left', py: 1.25, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem' }}
                          >
                            1) Pause, pivot to a real-world group puzzle where each row calculates cricket run rates. (+10 Pts)
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => { setSimScore(simScore - 5); setSimStep(1); }}
                            sx={{ justifyContent: 'flex-start', textAlign: 'left', py: 1.25, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem' }}
                          >
                            2) Reprimand them publicly and assign 20 extra drill problems. (-5 Pts)
                          </Button>
                        </Stack>
                      </Box>
                    )}

                    {simStep === 1 && (
                      <Box>
                        <Typography variant="body1" sx={{ color: tokens.colors.neutral[900], mb: 2, fontSize: '0.9375rem' }}>
                          "The students respond enthusiastically to the cricket problem! Now, how do you assess their collaborative learning?"
                        </Typography>
                        <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                          <Button
                            variant="outlined"
                            onClick={() => { setSimScore(simScore + 15); }}
                            sx={{ justifyContent: 'flex-start', textAlign: 'left', py: 1.25, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem' }}
                          >
                            1) Have each group post their calculation strategy on the classroom whiteboard for peer review. (+15 Pts)
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => { setSimScore(simScore + 5); }}
                            sx={{ justifyContent: 'flex-start', textAlign: 'left', py: 1.25, borderRadius: `${tokens.radius.md}px`, fontSize: '0.8125rem' }}
                          >
                            2) Simply tell them the final numerical answer and move on. (+5 Pts)
                          </Button>
                        </Stack>
                        <Button size="small" onClick={() => { setSimStep(0); setSimScore(0); }}>
                          Restart Scenario
                        </Button>
                      </Box>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

        </AnimatePresence>

      </Container>
    </Box>
  );
}
