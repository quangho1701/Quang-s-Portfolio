import React from 'react';
import { motion } from 'framer-motion';
import ExperienceSection from './components/ExperienceSection';
import InfiniteGallery from './components/ui/infinite-gallery';

const galleryImages = [
  "https://i.postimg.cc/B6cnr3g4/Quang-Ho-Volunteer.png",
  "https://i.postimg.cc/RFsZSRkC/IMG-5457.jpg",

  "https://i.postimg.cc/KcH6mVH1/z6567340289869-12a36686c7a3e6aae8c6b5f83092aa1a.jpg",

  "https://i.postimg.cc/QNYFh8DB/IMG-5449.jpg",
  "https://i.postimg.cc/9f23v7Nb/z6567340031129-657d7b543f5bd01c478b636da7ec8459.jpg",
  "https://i.postimg.cc/sDt1GT1L/IMG-5453.jpg",
  "https://i.postimg.cc/R0mFXq7s/IMG-5455.jpg",
  "https://i.postimg.cc/htBcq6X4/z6567357736285-31966aaa2732068a2554ff5a7258938b.jpg",
  "https://i.postimg.cc/zDQG4xw0/IMG-5458.jpg"
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#09090B] overflow-x-hidden">
      {/* Floating Pill Navigation */}
      <header className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
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
          <div className="flex space-x-8 text-sm font-medium text-[#3F3F46]">
            <a href="#about" className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer">About</a>
            <a href="#competitions" className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer">Competitions</a>
            <a href="#experiences" className="hover:text-[#18181B] transition-colors duration-200 cursor-pointer">Experiences</a>
          </div>

          {/* CTA Button (Right) */}
          <button className="px-5 py-2 text-sm font-medium text-[#09090B] border border-gray-200 rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
            Contact
          </button>
        </motion.nav>
      </header>

      {/* Split Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[75vh]">
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
            className="text-4xl text-[#3F3F46] font-medium"
          >
            hi,
          </motion.h2>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <h1 className="text-[5.5rem] leading-[1.05] font-bold tracking-tighter text-[#18181B] flex flex-col font-['Archivo']">
              <span>I'm Quang Ho</span>
            </h1>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-xl text-[#3F3F46] font-normal max-w-xl leading-relaxed"
          >
            I’m the first Vietnamese student to receive the full-ride Chapman Scholarship at Purdue Fort Wayne! With over 6 years of competitive programming experience and a major in mathematics, I thrive in high-stakes competitions and love building algorithm-driven AI systems.
          </motion.p>
        </motion.div>

        {/* Right Column: 3D Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[600px] rounded-[2rem] relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >

          <img 
            src="https://i.postimg.cc/B6cnr3g4/Quang-Ho-Volunteer.png" 
            alt="Quang Ho Volunteering"
            className="w-full h-full object-cover rounded-[2rem]"
          />
        </motion.div>
      </main>

      <ExperienceSection />

      {/* Photography & Volunteering Gallery Section */}
      <section className="overflow-hidden border-t border-gray-100 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-[#18181B] mb-4 font-['Archivo']">Gallery</h2>
          <p className="text-xl text-[#3F3F46] max-w-2xl">
            A glimpse into my volunteering experiences and my passion for education.
          </p>
        </div>
        <div className="h-[80vh] w-full relative">
          <InfiniteGallery images={galleryImages} />
        </div>
      </section>
    </div>
  );
}
