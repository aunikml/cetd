import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Divider
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';
import api from '../services/api';

const defaultPapers = [
  {
    id: 1,
    title_en: "Digital Pedagogy in Primary Education: NCTB & PEDP-III Insights",
    title_bn: "প্রাথমিক শিক্ষায় ডিজিটাল পেডাগোজি: এনসিটিবি ও পিইডিপি-৩ এর অভিজ্ঞতা",
    publication_type: "policy_brief",
    author: "AKM Badrul Alam & CEDR Policy Unit",
    date_published: "October 2026",
    tags: "Primary Education, PEDP-III, NCTB, Digital Pedagogy",
    abstract_en: "A comprehensive review of head-teacher capacity building and digital lesson integration in Bangladeshi government primary schools. Draws directly from extensive field observations under the Directorate of Primary Education (PEDP-III) and reviews the 2013 NCTB curriculum revisions. Identifies key classroom constraints and provides high-impact recommendations for scalable teacher training.",
    abstract_bn: "বাংলাদেশি সরকারি প্রাথমিক বিদ্যালয়ে প্রধান শিক্ষকদের নেতৃত্ব প্রশিক্ষণ এবং ডিজিটাল পাঠের সংযোজনের একটি বিশদ পর্যালোচনা। প্রাথমিক শিক্ষা অধিদপ্তর (পিইডিপি-৩) ও এনসিটিবি শিক্ষাক্রমের আলোকে মাঠপর্যায়ের বাস্তব সীমাবদ্ধতা এবং সমাধানের সুপারিশমালা।",
  },
  {
    id: 2,
    title_en: "Evidence-Based Moodle Deployment for Higher Education in South Asia",
    title_bn: "দক্ষিণ এশিয়ার উচ্চশিক্ষায় প্রমাণ-ভিত্তিক মুডল বাস্তবায়ন ও পরিচালনা",
    publication_type: "white_paper",
    author: "Hamim Al Ahsan & CEDR Platforms Team",
    date_published: "September 2026",
    tags: "Moodle, Higher Ed, Blended Learning, Infrastructure",
    abstract_en: "Analyzing institutional adoption barriers, faculty onboarding methodologies, and scalable server configurations for university-wide virtual learning environments. Proposes a standardized architecture supporting 100,000+ active students with minimal server latency and low-bandwidth optimizations.",
    abstract_bn: "বিশ্ববিদ্যালয় পর্যায়ে ভার্চুয়াল লার্নিং প্ল্যাটফর্ম বাস্তবায়নে প্রাতিষ্ঠানিক চ্যালেঞ্জ এবং সমাধান নিয়ে প্রায়োগিক গবেষণা। ১ লাখেরও বেশি শিক্ষার্থীর জন্য কম ব্যান্ডউইথে উচ্চগতির সার্ভার কাঠামোর রূপরেখা।",
  },
  {
    id: 3,
    title_en: "Strategic Governance & EdTech Sandbox Framework for Bangladesh",
    title_bn: "বাংলাদেশের জন্য কৌশলগত সুশাসন এবং এডুটেক স্যান্ডবক্স ফ্রেমওয়ার্ক",
    publication_type: "policy_brief",
    author: "Md Ershadul Kader Faruki",
    date_published: "August 2026",
    tags: "Startup Sandbox, Public Policy, Governance, Data Ethics",
    abstract_en: "Guidelines on ethics, data privacy, and public-private partnership models under the Government of Bangladesh's startup policy framework. Formulates actionable strategies for cross-sector collaboration between startups, universities, and ministry departments.",
    abstract_bn: "বাংলাদেশ সরকারের স্টার্টআপ নীতিমালার অধীনে নৈতিকতা, তথ্য সুরক্ষা এবং সরকারি-বেসরকারি অংশীদারিত্ব মডেলের দিকনির্দেশনা। উদ্ভাবন প্রসার ও সুরক্ষার সমন্বিত রূপরেখা।",
  },
  {
    id: 4,
    title_en: "Play-Based Curriculum & Early Childhood Learning Outcomes",
    title_bn: "খেলাভিত্তিক শিক্ষাক্রম এবং প্রাক-প্রাথমিক শিক্ষার্থীদের শিখন ফলাফল",
    publication_type: "pilot_report",
    author: "AKM Badrul Alam",
    date_published: "July 2026",
    tags: "Early Childhood, Play-Based Learning, Curriculum Design",
    abstract_en: "Comparative field evaluation evaluating play-based learning modules for children aged 3 to 5. Synthesizes findings from empirical curriculum interventions in Uganda (2016-2017) and adapts them to the South Asian cultural context to strengthen numeracy and language foundations.",
    abstract_bn: "৩ থেকে ৫ বছর বয়সী শিশুদের জন্য খেলাভিত্তিক শিখন মডিউলের আন্তর্জাতিক অভিজ্ঞতা ও মাঠপর্যায়ের প্রায়োগিক মূল্যায়ন। প্রাক-প্রাথমিক শিক্ষার্থীদের ভিত্তি মজবুত করার কৌশল।",
  }
];

export default function ResearchSection() {
  const { lang, t } = useLanguage();
  const [papers, setPapers] = useState(defaultPapers);
  const [activeModalPaper, setActiveModalPaper] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await api.get('/cms/research/');
        if (res.data && res.data.length > 0) {
          setPapers(res.data);
        }
      } catch (err) {
        console.log('Using default research papers');
      }
    };
    fetchPapers();
  }, []);

  return (
    <Box id="research" sx={{ py: { xs: 7, md: 11 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            label={t('EVIDENCE & POLICY UNIT', 'গবেষণা ও নীতি সহায়তা')}
            sx={{
              backgroundColor: tokens.colors.accent[50],
              color: tokens.colors.accent[700],
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              mb: 2,
              borderRadius: `${tokens.radius.sm}px`
            }}
          />
          <Typography variant="h2" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 2, letterSpacing: '-0.025em' }}>
            {t('Applied Research & Policy Briefs', 'ফলিত গবেষণা ও পলিসি ব্রিফ')}
          </Typography>
          <Typography variant="body1" color={tokens.colors.neutral[600]} sx={{ fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'CEDR produces rigorous, peer-reviewed applied research, field pilot evaluations, and practice briefs that help institutional leaders and policy-makers make informed decisions.',
              'সিইডিআর গবেষণালব্ধ তথ্য, মাঠপর্যায়ের পাইলট মূল্যায়ন এবং ব্যবহারিক দিকনির্দেশনা প্রকাশ করে যা শিক্ষাবিদ ও নীতিনির্ধারকদের সঠিক সিদ্ধান্ত গ্রহণে সহায়তা করে।'
            )}
          </Typography>
        </Box>

        {/* Papers Grid */}
        <Grid container spacing={3.5}>
          {papers.map((paper, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={paper.id || index}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: `${tokens.radius.lg}px`,
                    border: `1px solid ${tokens.colors.neutral[200]}`,
                    boxShadow: tokens.shadows.sm,
                    transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: tokens.colors.accent[400],
                      boxShadow: tokens.shadows.lg,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.75 }}>
                    <Chip
                      icon={<ArticleIcon sx={{ fontSize: 15 }} />}
                      label={paper.publication_type ? paper.publication_type.replace('_', ' ').toUpperCase() : 'BRIEF'}
                      size="small"
                      sx={{
                        backgroundColor: tokens.colors.primary[50],
                        color: tokens.colors.primary[700],
                        fontWeight: 700,
                        fontSize: '0.6875rem',
                        borderRadius: `${tokens.radius.sm}px`
                      }}
                    />
                    <Typography variant="caption" color={tokens.colors.neutral[500]} fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                      {paper.date_published}
                    </Typography>
                  </Box>

                  <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 1, lineHeight: 1.35, fontSize: '1.0625rem' }}>
                    {t(paper.title_en, paper.title_bn)}
                  </Typography>

                  <Typography variant="caption" color={tokens.colors.accent[700]} fontWeight={700} sx={{ mb: 1.5, display: 'block', fontSize: '0.75rem' }}>
                    Author: {paper.author}
                  </Typography>

                  <Typography
                    variant="body2"
                    color={tokens.colors.neutral[600]}
                    sx={{
                      lineHeight: 1.6,
                      mb: 2.5,
                      flexGrow: 1,
                      fontSize: '0.8125rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {t(paper.abstract_en, paper.abstract_bn)}
                  </Typography>

                  <Divider sx={{ my: 1.5, borderColor: tokens.colors.neutral[200] }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {paper.tags && paper.tags.split(',').slice(0, 2).map((tg, tIdx) => (
                        <Chip key={tIdx} label={tg.trim()} size="small" sx={{ fontSize: '0.6875rem', height: 22, borderRadius: `${tokens.radius.xs}px` }} />
                      ))}
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => setActiveModalPaper(paper)}
                      startIcon={<MenuBookIcon sx={{ fontSize: 15 }} />}
                      sx={{ height: 32, fontSize: '0.75rem', borderRadius: `${tokens.radius.md}px` }}
                    >
                      {t('Read Abstract', 'সারাংশ পড়ুন')}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Read Abstract Dialog */}
        {activeModalPaper && (
          <Dialog
            open={Boolean(activeModalPaper)}
            onClose={() => setActiveModalPaper(null)}
            maxWidth="md"
            fullWidth
            slotProps={{
              paper: {
                sx: {
                  borderRadius: `${tokens.radius.xl}px`,
                  p: 1.5,
                  boxShadow: tokens.shadows['2xl'],
                  border: `1px solid ${tokens.colors.neutral[200]}`
                }
              }
            }}
          >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Chip
                  label={activeModalPaper.publication_type ? activeModalPaper.publication_type.replace('_', ' ').toUpperCase() : 'BRIEF'}
                  size="small"
                  color="primary"
                  sx={{ mb: 1, fontWeight: 700, borderRadius: `${tokens.radius.sm}px` }}
                />
                <Typography variant="h5" fontWeight={800} color={tokens.colors.primary[500]}>
                  {t(activeModalPaper.title_en, activeModalPaper.title_bn)}
                </Typography>
                <Typography variant="caption" color={tokens.colors.neutral[500]}>
                  By {activeModalPaper.author} • {activeModalPaper.date_published}
                </Typography>
              </Box>
              <IconButton onClick={() => setActiveModalPaper(null)} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ borderColor: tokens.colors.neutral[200] }}>
              <Typography variant="subtitle2" fontWeight={700} color={tokens.colors.neutral[900]} gutterBottom>
                Abstract & Executive Summary:
              </Typography>
              <Typography variant="body1" color={tokens.colors.neutral[700]} sx={{ lineHeight: 1.75, mb: 2.5, fontSize: '0.9375rem' }}>
                {t(activeModalPaper.abstract_en, activeModalPaper.abstract_bn)}
              </Typography>

              <Box sx={{ p: 2, backgroundColor: tokens.colors.neutral[100], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.neutral[200]}` }}>
                <Typography variant="caption" fontWeight={700} color={tokens.colors.primary[500]} display="block" gutterBottom sx={{ fontSize: '0.75rem' }}>
                  INSTITUTIONAL CITATION / REFERENCE:
                </Typography>
                <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                  Center for EduTech Development and Research (CEDR). Dhaka, Bangladesh. (2026). "{activeModalPaper.title_en}". Policy Research Series, Vol. 1.
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={() => alert('PDF copy requested. We will connect you with the author team.')}
                sx={{ height: 36, borderRadius: `${tokens.radius.md}px` }}
              >
                Request Full PDF Brief
              </Button>
              <Button size="small" onClick={() => setActiveModalPaper(null)} sx={{ color: tokens.colors.neutral[600] }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

      </Container>
    </Box>
  );
}
