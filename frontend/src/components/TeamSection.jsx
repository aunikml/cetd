import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, Chip, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { tokens } from '../theme/tokens';
import api from '../services/api';

const defaultTeam = [
  {
    name_en: "Md Ershadul Kader Faruki",
    name_bn: "মো: এরশাদুল কাদের ফারুকী",
    role_en: "Co-founder and Chief Executive",
    role_bn: "সহ-প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা",
    portfolio_en: "Strategy and Governance",
    portfolio_bn: "কৌশলগত পরিকল্পনা ও সুশাসন",
    bio_en: "Management professional with 14 years of experience across academic, development and business organisations. Deep experience in strategic planning, governance and project management. Sustained academic contribution to designing general education, academic planning, and teaching and learning development. Research experience spans climate change, public policy, education and sustainable development.",
    bio_bn: "একাডেমিক, উন্নয়ন সংস্থা ও ব্যবসায়িক প্রতিষ্ঠানে ১৪ বছরের অভিজ্ঞতা সম্পন্ন ব্যবস্থাপনা বিশেষজ্ঞ। কৌশলগত পরিকল্পনা, সুশাসন ও প্রকল্প পরিচালনায় অগাধ অভিজ্ঞতা। শিক্ষা উন্নয়ন ও পাবলিক পলিসি গবেষণায় দীর্ঘ অবদান রয়েছে।",
    credentials_en: [
      "14+ years in strategic planning, governance & project leadership",
      "Sustained contribution to designing general education & academic curricula",
      "Broad research portfolio spanning public policy, education & sustainable development",
      "Executive expertise bridging academic institutions with corporate stakeholders"
    ],
    credentials_bn: [
      "কৌশলগত পরিকল্পনা, সুশাসন ও প্রকল্প নেতৃত্বে ১৪+ বছরের অভিজ্ঞতা",
      "সাধারণ শিক্ষা ও একাডেমিক কারিকুলাম প্রণয়নে দীর্ঘ অবদান",
      "পাবলিক পলিসি, শিক্ষা ও টেকসই উন্নয়ন বিষয়ে বিস্তৃত গবেষণা",
      "প্রাতিষ্ঠানিক অংশীদারিত্ব ও প্রকল্প ব্যবস্থাপনায় বিশেষ দক্ষতা"
    ],
    icon: BusinessCenterIcon,
    accent: tokens.colors.primary[500],
  },
  {
    name_en: "Hamim Al Ahsan",
    name_bn: "হামিম আল আহসান",
    role_en: "Co-founder and Chief Technology & Learning Officer",
    role_bn: "সহ-প্রতিষ্ঠাতা ও প্রধান প্রযুক্তি ও শিখন কর্মকর্তা",
    portfolio_en: "EdTech Platforms & Learning Systems",
    portfolio_bn: "এডুটেক প্ল্যাটফর্ম ও শিখন প্রযুক্তি",
    bio_en: "EdTech professional with over a decade of experience in learning technologies, instructional design and system development. Has led the digital transformation of teaching and learning, managing and optimising Moodle-based virtual learning environments. Integrates AI-powered solutions, including Bengali and English speech-to-text transcription, to make learning more inclusive and data-driven. Expertise in Moodle, Bootstrap and digital pedagogy.",
    bio_bn: "লার্নিং টেকনোলজি, ইনস্ট্রাকশনাল ডিজাইন ও সিস্টেম ডেভেলপমেন্টে এক দশকেরও বেশি অভিজ্ঞতাসম্পন্ন এডুটেক পেশাজীবী। মুডল-ভিত্তিক ভার্চুয়াল লার্নিং এনভায়রনমেন্ট পরিচালনা এবং বাংলা স্পিচ-টু-টেক্সট এআই সংযোজনে পারদর্শী।",
    credentials_en: [
      "10+ years managing & optimising enterprise Moodle VLE platforms",
      "Architect of AI-powered Bengali and English speech-to-text transcription tools",
      "Instructional designer specializing in blended learning systems & data analytics",
      "Deep technical expertise in Moodle architecture, Bootstrap, and scalable web apps"
    ],
    credentials_bn: [
      "মুডল ভার্চুয়াল লার্নিং প্ল্যাটফর্ম পরিচালনায় ১০+ বছরের প্রত্যক্ষ অভিজ্ঞতা",
      "বাংলা ও ইংরেজি স্পিচ-টু-টেক্সট এআই ট্রান্সক্রিপশন টুলের উদ্ভাবক",
      "ব্লেন্ডেড লার্নিং সিস্টেম ও ইনস্ট্রাকশনাল ডিজাইন বিশেষজ্ঞ",
      "মুডল কোর আর্কিটেকচার, বুটস্ট্র্যাপ ও ডিজিটাল পেডাগোজিতে পারদর্শী"
    ],
    icon: LaptopMacIcon,
    accent: tokens.colors.secondary[500],
  },
  {
    name_en: "AKM Badrul Alam",
    name_bn: "এ কে এম বদরুল আলম",
    role_en: "Co-founder and Director",
    role_bn: "সহ-প্রতিষ্ঠাতা ও পরিচালক",
    portfolio_en: "Curriculum and Teacher Development",
    portfolio_bn: "শিক্ষাক্রম ও শিক্ষক পেশাগত উন্নয়ন",
    bio_en: "Former Senior Faculty, Master of Education in Educational Leadership, Planning and Management, Institute of Educational Development, BRAC University. Served in the BRAC Education Programme from 2003 to 2010, designing teacher and staff development interventions for pre-primary and primary schools. Contributed to leadership training for head teachers under DPE (PEDP-III). Member of NCTB committee reviewing Bangla curriculum (2013); developed Teachers' Edition textbooks. Contributed to national textbook refinement under DFID (Bangladesh & Pakistan). Developed play-based learning curriculum in Uganda (2016-2017). MEd from University of Bath, UK; PhD studies at Southwest University, China.",
    bio_bn: "সাবেক জ্যেষ্ঠ ফ্যাকাল্টি, ব্র্যাক বিশ্ববিদ্যালয় (আইইডি)। ব্র্যাক শিক্ষা কর্মসূচিতে (২০০৩-২০১০) শিক্ষক উন্নয়ন বিশেষজ্ঞ। এনসিটিবি শিক্ষাক্রম কমিটির সদস্য ও প্রাথমিক শিক্ষক সহায়িকার লেখক। যুক্তরাজ্যের বাথ বিশ্ববিদ্যালয় হতে স্নাতকোত্তর ও চীনে পিএইচডি গবেষক।",
    credentials_en: [
      "Former Senior Faculty, MEd in Educational Leadership, BRAC University",
      "NCTB Committee Member: reviewed Bangla curriculum (2013) & authored Teachers' Editions",
      "Trainer of Trainers for government primary school head teachers under DPE (PEDP-III)",
      "DFID international curriculum consultant for national textbooks in Bangladesh & Pakistan",
      "Author of play-based learning curriculum for ages 3-5 in Uganda (2016 to 2017)",
      "Master's from University of Bath, UK; PhD studies at Southwest University, China"
    ],
    credentials_bn: [
      "সাবেক জ্যেষ্ঠ ফ্যাকাল্টি, ব্র্যাক বিশ্ববিদ্যালয় (শিক্ষা নেতৃত্ব ও ব্যবস্থাপনা)",
      "এনসিটিবি শিক্ষাক্রম কমিটির সদস্য ও ৪র্থ-৫ম শ্রেণির শিক্ষক সহায়িকার লেখক",
      "ডিপিই পিইডিপি-৩ এর আওতায় সরকারি প্রাথমিক বিদ্যালয়ের প্রধান শিক্ষকদের প্রশিক্ষক",
      "ডিএফআইডি অর্থায়নে বাংলাদেশ ও পাকিস্তানের জাতীয় পাঠ্যপুস্তক উন্নয়ন পরামর্শক",
      "উগান্ডায় ৩-৫ বছর বয়সী শিশুদের জন্য খেলাভিত্তিক শিক্ষাক্রম প্রণেতা (২০১৬-২০১৭)",
      "যুক্তরাজ্যের বাথ বিশ্ববিদ্যালয় হতে এমএড এবং চীনে পিএইচডি গবেষক"
    ],
    icon: MenuBookIcon,
    accent: tokens.colors.accent[500],
  }
];

export default function TeamSection() {
  const { lang, t } = useLanguage();
  const [team, setTeam] = useState(defaultTeam);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/cms/team/');
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((m, idx) => ({
            ...m,
            credentials_en: typeof m.credentials_en === 'string' ? m.credentials_en.split('\n').filter(Boolean) : m.credentials_en,
            credentials_bn: typeof m.credentials_bn === 'string' ? m.credentials_bn.split('\n').filter(Boolean) : m.credentials_bn,
            icon: idx === 0 ? BusinessCenterIcon : idx === 1 ? LaptopMacIcon : MenuBookIcon,
            accent: idx === 0 ? tokens.colors.primary[500] : idx === 1 ? tokens.colors.secondary[500] : tokens.colors.accent[500],
          }));
          setTeam(merged);
        }
      } catch (err) {
        console.log('Using default team data');
      }
    };
    fetchTeam();
  }, []);

  return (
    <Box id="team" sx={{ py: { xs: 7, md: 11 }, backgroundColor: tokens.colors.neutral[50] }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Chip
            label={t('PRACTITIONER FOUNDING LEADERSHIP', 'অভিজ্ঞ প্রতিষ্ঠাতা নেতৃত্ব')}
            sx={{
              backgroundColor: tokens.colors.primary[50],
              color: tokens.colors.primary[700],
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              mb: 2,
              borderRadius: `${tokens.radius.sm}px`
            }}
          />
          <Typography variant="h2" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ mb: 2, letterSpacing: '-0.025em' }}>
            {t('Complementary Strengths in Pedagogy & Technology', 'শিক্ষণবিজ্ঞান ও প্রযুক্তির পরিপূরক অভিজ্ঞতা')}
          </Typography>
          <Typography variant="body1" color={tokens.colors.neutral[600]} sx={{ fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {t(
              'Three founding partners bring complementary strengths in strategy and governance, learning technology, and curriculum and teacher development.',
              'তিনজন প্রতিষ্ঠাতা অংশীদার সুশাসন ও কৌশল, লার্নিং টেকনোলজি এবং শিক্ষাক্রম ও শিক্ষক উন্নয়নের ক্ষেত্রে দীর্ঘদিনের অভিজ্ঞতা যুক্ত করেছেন।'
            )}
          </Typography>
        </Box>

        {/* Founding Partners Grid */}
        <Grid container spacing={4}>
          {team.map((member, index) => {
            const Icon = member.icon || BusinessCenterIcon;
            return (
              <Grid size={{ xs: 12, lg: 4 }} key={member.name_en || index}>
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
                      transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: tokens.shadows.lg,
                        borderColor: member.accent,
                      },
                    }}
                  >
                    {/* Top Stripe */}
                    <Box sx={{ height: 5, backgroundColor: member.accent }} />

                    <CardContent sx={{ p: { xs: 3, md: 3.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Avatar & Roles */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: `${member.accent}14`,
                            color: member.accent,
                            border: `2px solid ${member.accent}33`,
                            borderRadius: `${tokens.radius.md}px`,
                          }}
                        >
                          <Icon sx={{ fontSize: 28 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={800} color={tokens.colors.neutral[900]} sx={{ lineHeight: 1.25, fontSize: '1.0625rem' }}>
                            {t(member.name_en, member.name_bn)}
                          </Typography>
                          <Typography variant="caption" color={member.accent} fontWeight={700} display="block" sx={{ mt: 0.25, fontSize: '0.75rem' }}>
                            {t(member.role_en, member.role_bn)}
                          </Typography>
                          <Chip
                            label={t(member.portfolio_en, member.portfolio_bn)}
                            size="small"
                            sx={{ mt: 0.5, backgroundColor: tokens.colors.neutral[100], color: tokens.colors.neutral[700], fontSize: '0.6875rem', fontWeight: 600, height: 22, borderRadius: `${tokens.radius.xs}px` }}
                          />
                        </Box>
                      </Box>

                      {/* Bio */}
                      <Typography variant="body2" color={tokens.colors.neutral[600]} sx={{ lineHeight: 1.6, mb: 2.5, flexGrow: 1, fontSize: '0.8125rem' }}>
                        {t(member.bio_en, member.bio_bn)}
                      </Typography>

                      <Divider sx={{ my: 1.5, borderColor: tokens.colors.neutral[200] }} />

                      {/* Verified Credentials */}
                      <Typography variant="subtitle2" fontWeight={800} color={tokens.colors.neutral[800]} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.8125rem' }}>
                        <VerifiedIcon sx={{ fontSize: 16, color: tokens.colors.secondary[500] }} />
                        {t('Verified Institutional Track Record:', 'প্রমাণিত প্রাতিষ্ঠানিক অভিজ্ঞতা:')}
                      </Typography>

                      <List disablePadding>
                        {(lang === 'bn' ? member.credentials_bn : member.credentials_en).map((cred, cIdx) => (
                          <ListItem key={cIdx} disableGutters sx={{ py: 0.35, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 20, mt: 0.5 }}>
                              <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: member.accent }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={cred.replace(/^•\s*/, '')}
                              slotProps={{ primary: { fontSize: '0.8125rem', color: tokens.colors.neutral[700], lineHeight: 1.5, fontWeight: 500 } }}
                            />
                          </ListItem>
                        ))}
                      </List>

                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

      </Container>
    </Box>
  );
}
