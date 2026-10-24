import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import FocusAreas from '../components/FocusAreas';
import PlatformShowcase from '../components/PlatformShowcase';
import WhyCEDR from '../components/WhyCEDR';
import ResearchSection from '../components/ResearchSection';
import TeamSection from '../components/TeamSection';
import RoadmapSection from '../components/RoadmapSection';
import PartnershipSection from '../components/PartnershipSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <HeroSlider />
      <FocusAreas />
      <PlatformShowcase />
      <WhyCEDR />
      <ResearchSection />
      <TeamSection />
      <RoadmapSection />
      <PartnershipSection />
      <Footer />
    </Box>
  );
}
