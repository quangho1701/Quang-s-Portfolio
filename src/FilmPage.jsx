import React from 'react';
import { motion } from 'framer-motion';
import SiteNav from './components/SiteNav';

export default function FilmPage() {
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
          <p className="text-xl text-[#3F3F46] leading-relaxed">Hello World</p>
        </motion.div>
      </main>
    </div>
  );
}
