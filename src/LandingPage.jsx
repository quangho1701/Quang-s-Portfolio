import React from 'react';
import { motion } from 'framer-motion';
import ExperienceSection from './components/ExperienceSection';

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
            className="text-xl text-gray-500 font-normal max-w-xl leading-relaxed"
          >
            I’m the first Vietnamese student to receive the full-ride Chapman Scholarship at Purdue Fort Wayne! With over 6 years of competitive programming experience and a major in mathematics, I thrive in high-stakes competitions and love building algorithm-driven AI systems.
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
          <div style={{ opacity: 1, transform: "none" }} className="z-10 relative">
            <div>
              <svg viewBox="0 0 1273 906" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-[450px] w-full h-full">
                <g>
                  <path className="path" d="M318.587 315.483V510.936L477.544 431.391V236.949M318.587 315.483L159.63 236.949M318.587 315.483L477.544 236.949M318.587 315.483V509.925L159.63 589.469M318.587 315.483L159.63 237.286L0.673828 315.483M318.587 315.483L159.63 394.016M477.544 236.949L318.587 158.753L159.63 236.949M477.544 236.949V432.402M477.544 236.949L318.587 158.416L477.544 80.2192L636.5 158.416L477.544 236.949ZM159.63 236.949V79.5451M159.63 589.469V394.016M159.63 589.469L0.673828 509.925V315.483M0.673828 315.483L159.63 394.016M159.63 79.5451L318.587 1.34863L477.544 79.5451L318.587 158.079L159.63 79.5451ZM795.457 395.701V237.286M795.457 237.286L636.5 159.09L477.544 237.286M795.457 237.286L636.5 315.82M477.544 237.286V431.728L601.139 491.762M477.544 237.286L636.5 315.82M636.5 315.82V472.887M954.414 668.003V473.561M954.414 473.561L795.457 395.364L636.5 473.561L795.457 552.094M954.414 473.561L795.457 552.094M954.414 473.561V669.014M954.414 473.561L795.457 395.027L954.414 316.831L1113.37 395.027L954.414 473.561ZM795.457 552.094L636.5 473.898L477.544 552.094M795.457 552.094L636.5 630.628M477.544 552.094V746.534L636.5 826.078V630.628M477.544 552.094L636.5 630.628M795.457 709.498V904.949M795.457 709.498L636.5 630.965M795.457 709.498L954.414 630.965M795.457 904.949L954.414 825.404V630.965M795.457 904.949L636.5 825.404V630.965M636.5 630.965L795.457 552.768L954.414 630.965M1113.37 552.431V747.882M1113.37 552.431L954.414 473.898M1113.37 552.431L1272.33 473.898M1113.37 747.882L1272.33 668.34V473.898M1113.37 747.882L954.414 668.34V473.898M954.414 473.898L1113.37 395.701L1272.33 473.898" stroke="url(#paint-linear)" strokeOpacity="0.6" strokeWidth="2"></path>
                </g>
                <path d="M154 586C154 583.239 156.239 581 159 581V581C161.761 581 164 583.239 164 586V586C164 588.761 161.761 591 159 591V591C156.239 591 154 588.761 154 586V586Z" fill="#27B173"></path>
                <path d="M154 393C154 390.239 156.239 388 159 388V388C161.761 388 164 390.239 164 393V393C164 395.761 161.761 398 159 398V398C156.239 398 154 395.761 154 393V393Z" fill="#27B173"></path>
                <path d="M788 551C788 548.239 790.239 546 793 546V546C795.761 546 798 548.239 798 551V551C798 553.761 795.761 556 793 556V556C790.239 556 788 553.761 788 551V551Z" fill="#27B173"></path>
                <path d="M1108 551C1108 548.239 1110.24 546 1113 546V546C1115.76 546 1118 548.239 1118 551V551C1118 553.761 1115.76 556 1113 556V556C1110.24 556 1108 553.761 1108 551V551Z" fill="#27B173"></path>
                <path d="M1108 398C1108 395.239 1110.24 393 1113 393V393C1115.76 393 1118 395.239 1118 398V398C1118 400.761 1115.76 403 1113 403V403C1110.24 403 1108 400.761 1108 398V398Z" fill="#27B173"></path>
                <path d="M788 237C788 234.239 790.239 232 793 232V232C795.761 232 798 234.239 798 237V237C798 239.761 795.761 242 793 242V242C790.239 242 788 239.761 788 237V237Z" fill="#27B173"></path>
                <defs>
                  <linearGradient id="paint-linear" x1="1272.23" y1="479.474" x2="506.242" y2="-216.277" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#27b173"></stop>
                    <stop offset="0.619553" stopColor="#1a663f"></stop>
                    <stop offset="0.93102" stopColor="#26312d"></stop>
                  </linearGradient>
                  <clipPath>
                    <rect width="1273" height="906" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>
      </main>

      <ExperienceSection />
    </div>
  );
}
