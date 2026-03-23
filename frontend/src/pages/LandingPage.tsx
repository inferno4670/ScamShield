import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};
