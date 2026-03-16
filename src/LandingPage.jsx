import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden" style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      {/* Floating Pill Navigation */}
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between px-6 py-3 min-w-[600px] rounded-full bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          {/* Logo (Left) */}
          <motion.div 
            layoutId="brand-logo"
            className="text-lg font-bold tracking-tight whitespace-nowrap origin-left"
          >
            Quang Ho
          </motion.div>

          {/* Links (Center) */}
          <div className="flex space-x-8 text-sm font-medium text-gray-500">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#competitions" className="hover:text-black transition-colors">Competitions</a>
            <a href="#experiences" className="hover:text-black transition-colors">Experiences</a>
          </div>

          {/* CTA Button (Right) */}
          <button className="px-5 py-2 text-sm font-medium text-black border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            Contact
          </button>
        </motion.nav>
      </header>

      {/* Split Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-48 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
        {/* Left Column: Typography */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
          className="flex flex-col space-y-6"
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-4xl text-gray-400 font-medium"
          >
            hi,
          </motion.h2>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <h1 className="text-[5.5rem] leading-[1.05] font-bold tracking-tight text-black flex flex-col">
              <span>I'm Quang Ho</span>
            </h1>
          </motion.div>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-xl text-gray-500 font-normal max-w-md leading-relaxed"
          >
            I'm a software engineer who is passionate about AI & Algorithms!
          </motion.p>
        </motion.div>

        {/* Right Column: 3D Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[600px] border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 flex items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white/0 opacity-50" />
          <p className="text-gray-400 font-medium text-sm flex flex-col items-center space-y-2">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            <span>3D Canvas Placeholder</span>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
