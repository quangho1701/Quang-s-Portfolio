import React from 'react';
import { motion } from 'framer-motion';
import SiteNav from './components/SiteNav';

const lines = [
  'FinBud AI: Vietnam StartupUp Program Champion 2025 & Top Startup Award, UpYouth TechIncubators 2024',
  'Third Place in Mathematics - HSE International Olympiad, 2024',
  'Third Prize - National Hue-ICT Programming Challenge, 2024',
  'Second Prize - Provincial Excellent Student Competition in Informatics for Grade 12 students, 2024',
  'First Prize - Mathematics and Science in English Competition, 2023',
  'First Prize - English Speaking Contest of Nam Dinh Province, 2023',
];

export default function CompetitionsPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#09090B] overflow-x-hidden">
      <SiteNav />

      <main className="max-w-7xl mx-auto px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#18181B] mb-6 font-['Archivo']">Competitions</h1>
          <p className="text-xl text-[#3F3F46] leading-relaxed mb-8">
            With over 6 years into competitive programming and mathematics major, I have attended multiple national and
            provincial competitions:
          </p>
          <ul className="text-xl text-[#3F3F46] leading-relaxed space-y-3 list-disc list-outside pl-6">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
