import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card,
  TextField, Button, MenuItem, Chip, Alert, CircularProgress,
  Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';
import api from '../services/api';

const partnerTypes = [
  { value: 'schools', labelEn: 'Schools & School Networks', labelBn: 'বিদ্যালয় ও স্কুল নেটওয়ার্ক', icon: SchoolIcon, workEn: 'Teacher capacity courses, assessment tools, online LMS platforms', workBn: 'শিক্ষক সক্ষমতা কোর্স, মূল্যায়ন টুল, অনলাইন এলএমএস' },
  { value: 'universities', labelEn: 'Teacher-Training Institutes & Universities', labelBn: 'শিক্ষক প্রশিক্ষণ ইনস্টিটিউট ও বিশ্ববিদ্যালয়', icon: ApartmentIcon, workEn: 'Co-developed certificate programmes, VLE platform support, joint research', workBn: 'যৌথ সার্টিফিকেট প্রোগ্রাম, ভিএলই প্ল্যাটফর্ম সহায়তা, যৌথ গবেষণা' },
  { value: 'ngos', labelEn: 'NGOs, Development Agencies & Donors', labelBn: 'এনজিও, উন্নয়ন সহযোগী ও দাতা সংস্থা', icon: VolunteerActivismIcon, workEn: 'Programme design, capacity-building delivery, independent evaluation', workBn: 'কর্মসূচি পরিকল্পনা, সক্ষমতা বৃদ্ধি বাস্তবায়ন, স্বাধীন মূল্যায়ন' },
  { value: 'government', labelEn: 'Government Education Agencies (NCTB, DPE)', labelBn: 'সরকারি শিক্ষা অধিদপ্তর ও বোর্ড (এনসিটিবি, ডিপিই)', icon: AccountBalanceIcon, workEn: 'Training of trainers, assessment technology, evidence & policy briefs', workBn: 'মাস্টার ট্রেইনার প্রশিক্ষণ, মূল্যায়ন প্রযুক্তি, গবেষণাপত্র ও পলিসি ব্রিফ' },
  { value: 'edtech', labelEn: 'EdTech Firms & Content Publishers', labelBn: 'এডুটেক প্রতিষ্ঠান ও কনটেন্ট প্রকাশক', icon: CodeIcon, workEn: 'Product pilots, pedagogical review, co-development', workBn: 'পণ্য পাইলটিং, পেডাগজিক্যাল পর্যালোচনা, যৌথ উন্নয়ন' },
  { value: 'csr', labelEn: 'Corporates & Foundations (CSR)', labelBn: 'করপোরেট ও ফাউন্ডেশন (সিএসআর)', icon: BusinessIcon, workEn: 'Education programmes funded through social investment or CSR', workBn: 'সামাজিক দায়বদ্ধতা (সিএসআর) অর্থায়নে পরিচালিত শিক্ষা কর্মসূচি' },
];

export default function PartnershipSection() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    partner_type: 'schools',
    interests: 'Teacher Training, LMS Delivery',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await api.post('/cms/inquiries/', formData);
      setSuccessMsg(
        lang === 'bn'
          ? 'ধন্যবাদ! আপনার অংশীদারিত্বের প্রস্তাব সফলভাবে জমা হয়েছে। সিইডিআর টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'
          : 'Thank you! Your partnership inquiry has been received. Our leadership team will connect with you shortly.'
      );
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        partner_type: 'schools',
        interests: 'Teacher Training, LMS Delivery',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(
        lang === 'bn'
          ? 'তথ্য পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
          : 'Could not submit inquiry right now. Please try again or reach out directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box id="partnership" sx={{ py: { xs: 7, md: 11 }, backgroundColor: tokens.colors.neutral[50] }}>
      <Container maxWidth="xl">
        
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            label={t('COLLABORATION & IMPACT', 'অংশীদারিত্ব ও যৌথ উদ্যোগ')}
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
            {t('Who We Serve & Partnership Opportunities', 'যাদের জন্য আমরা কাজ করি ও অংশীদারিত্বের ক্ষেত্র')}
          </Typography>
          <Typography variant="body1" color={tokens.colors.neutral[600]} sx={{ fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'The Center partners with organisations that shape how teachers are trained and how learners are assessed. Ways to engage: co-developed programmes, commissioned research, platform licensing, capacity-building contracts, and advisory roles.',
              'শিক্ষকদের প্রশিক্ষণ ও শিক্ষার্থীদের মূল্যায়ন ব্যবস্থার রূপান্তরে সিইডিআর কাজ করে। যুক্ত হওয়ার উপায়: যৌথ কোর্স পরিচালনা, গবেষণা চুক্তি, প্ল্যাটফর্ম লাইসেন্সিং ও কারিগরি পরামর্শ।'
            )}
          </Typography>
        </Box>

        <Grid container spacing={5}>
          
          {/* Left Column: Interactive Partner Types Grid */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h4" fontWeight={800} color={tokens.colors.primary[500]} sx={{ mb: 3, fontSize: '1.25rem', letterSpacing: '-0.015em' }}>
              {t('Engagement Tracks by Institution Type', 'প্রতিষ্ঠানভিত্তিক অংশীদারিত্বের সুযোগ')}
            </Typography>

            <Grid container spacing={2}>
              {partnerTypes.map((pt) => {
                const IconComponent = pt.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={pt.value}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.25,
                        borderRadius: `${tokens.radius.lg}px`,
                        border: `1px solid ${tokens.colors.neutral[200]}`,
                        backgroundColor: '#FFFFFF',
                        height: '100%',
                        boxShadow: tokens.shadows.xs,
                        transition: 'all 200ms ease',
                        '&:hover': {
                          borderColor: tokens.colors.secondary[400],
                          boxShadow: tokens.shadows.sm,
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.75 }}>
                        <IconComponent sx={{ color: tokens.colors.secondary[500], fontSize: 22 }} />
                        <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ fontSize: '0.875rem' }}>
                          {t(pt.labelEn, pt.labelBn)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color={tokens.colors.neutral[600]} display="block" sx={{ lineHeight: 1.5, fontSize: '0.75rem' }}>
                        {t(pt.workEn, pt.workBn)}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            {/* Direct Contact Details Box */}
            <Box sx={{ mt: 3, p: 2.5, backgroundColor: tokens.colors.primary[50], borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.colors.primary[200]}` }}>
              <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.primary[600]} gutterBottom sx={{ fontSize: '0.8125rem' }}>
                {t('Direct Headquarters Inquiries:', 'প্রধান কার্যালয় যোগাযোগ:')}
              </Typography>
              <Typography variant="body2" color={tokens.colors.neutral[800]} sx={{ lineHeight: 1.7, fontSize: '0.8125rem' }}>
                <strong>Organization:</strong> Center for EduTech Development and Research (CEDR)<br />
                <strong>Base:</strong> Dhaka, Bangladesh<br />
                <strong>Email:</strong> contact@cedrbd.org / partnership@cedrbd.org<br />
                <strong>Registration:</strong> Private Limited Company (Registration in progress)
              </Typography>
            </Box>
          </Grid>

          {/* Right Column: Inquiry Submission Form */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: `${tokens.radius.xl}px`, border: `1px solid ${tokens.colors.neutral[200]}`, backgroundColor: '#FFFFFF', boxShadow: tokens.shadows.md }}>
              <Typography variant="h5" fontWeight={800} color={tokens.colors.primary[500]} gutterBottom sx={{ fontSize: '1.25rem' }}>
                {t('Initiate a Partnership or Pilot Dialogue', 'অংশীদারিত্ব বা পাইলটের প্রস্তাব পাঠান')}
              </Typography>
              <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ mb: 2.5, fontSize: '0.875rem', lineHeight: 1.6 }}>
                {t(
                  'Fill out the form below to connect directly with the founding leadership team for course co-design, platform licensing, or research collaboration.',
                  'কোর্স পরিচালনা, প্ল্যাটফর্ম সেবা বা গবেষণার বিষয়ে সরাসরি প্রতিষ্ঠাতা টিমের সাথে যোগাযোগের জন্য নিচের তথ্যগুলো পূরণ করুন।'
                )}
              </Typography>

              {successMsg && (
                <Alert severity="success" sx={{ mb: 2.5, borderRadius: `${tokens.radius.md}px` }}>
                  {successMsg}
                </Alert>
              )}

              {errorMsg && (
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: `${tokens.radius.md}px` }}>
                  {errorMsg}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={t('Your Full Name', 'আপনার পুরো নাম')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={t('Organization / Institution', 'প্রতিষ্ঠান বা সংস্থার নাম')}
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label={t('Official Email Address', 'ইমেইল ঠিকানা')}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t('Contact Phone / WhatsApp', 'ফোন বা হোয়াটসঅ্যাপ নম্বর')}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      select
                      fullWidth
                      label={t('Organization Type', 'প্রতিষ্ঠানের ধরন')}
                      name="partner_type"
                      value={formData.partner_type}
                      onChange={handleChange}
                      size="small"
                    >
                      {partnerTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {t(option.labelEn, option.labelBn)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label={t('Areas of Interest (e.g. Teacher Training, LMS, Assessment)', 'আগ্রহের ক্ষেত্র')}
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={4}
                      label={t('How can we work together? (Project Scope / Requirements)', 'কীভাবে কাজ করতে চান? (বিবরণ লিখুন)')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      disabled={submitting}
                      startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon sx={{ fontSize: 18 }} />}
                      sx={{
                        height: 48,
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        borderRadius: `${tokens.radius.md}px`,
                        boxShadow: tokens.shadows.emeraldGlow,
                      }}
                    >
                      {submitting ? 'Submitting Inquiry...' : t('Submit Partnership Inquiry', 'প্রস্তাব জমা দিন')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}
