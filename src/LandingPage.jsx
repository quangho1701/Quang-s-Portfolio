import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ExperienceSection from './components/ExperienceSection';
import { AnimatedFolder } from './components/3d-folder';
import { ProjectCard } from './components/project-card';
import InfiniteGallery from './components/ui/infinite-gallery';
import SiteNav from './components/SiteNav';

const personalProjects = {
  title: "Personal Projects",
  projects: [
    {
      id: "web-1",
      image: "https://i.postimg.cc/mZjbQp5b/Start-Menu.png",
      title: "Who's The Killer?",
      description:
        "A tension-filled, top-down survival horror game. In 30 seconds: Find the exit, weave through the crowd, and whatever you do: don't bump into the face without a mask.",
      link: "https://globalgamejam.org/games/2026/whos-killer-1",
      linkText: "View Project",
    },
    {
      id: "web-2",
      image: "https://i.postimg.cc/QxsJzmsV/hero.jpg",
      title: "Meet AI",
      description:
        "Practice sales pitches, job interviews, and negotiations with realistic AI personas through real-time video interactions.",
      link: "https://meet-ai-dusky-gamma.vercel.app/",
      linkText: "View Project",
    },
    {
      id: "web-3",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
      title: "Quantum Analytics Dashboard",
      description: "A data visualization tool for quantum computing experiments, providing real-time insights and complex data analysis.",
      link: "#",
      linkText: "View Project",
    },
  ],
};

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

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const cardTransition = {
  type: "spring",
  stiffness: 80,
  damping: 14,
  mass: 0.8,
};

export default function LandingPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.startsWith('#/')) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  const handleFolderClick = () => {
    setTimeout(() => setIsExpanded(true), 480);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#09090B] overflow-x-hidden">
      <SiteNav />

      {/* Split Hero Section */}
      <main
        id="about"
        className="max-w-7xl mx-auto px-8 pt-28 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[75vh]"
      >
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
            I'm the first Vietnamese student to receive the full-ride Chapman Scholarship at Purdue Fort Wayne! With over 6 years of competitive programming experience and a major in mathematics, I thrive in high-stakes competitions and love building algorithm-driven AI systems.
          </motion.p>
        </motion.div>

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

      {/* Projects Section */}
      <section className="border-t border-gray-100 pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold tracking-tight text-[#18181B] mb-4 font-['Archivo']">Projects</h2>
            <AnimatePresence mode="wait">
              <motion.p
                key={isExpanded ? "expanded" : "collapsed"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-xl text-[#3F3F46] max-w-2xl"
              >
                {isExpanded
                  ? "Here are my personal projects. Click a card to learn more."
                  : "Hover over the folder to peek inside, then click to explore."}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="folder-view"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center"
              >
                <AnimatedFolder
                  title={personalProjects.title}
                  projects={personalProjects.projects}
                  onFolderClick={handleFolderClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key="cards-view"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.04 }
                  }
                }}
              >
                {/* Collapse button */}
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleCollapse}
                  className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-[#3F3F46] hover:text-[#18181B] transition-colors duration-200 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  Back to folder
                </motion.button>

                {/* Cards grid */}
                <motion.div
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.12 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {personalProjects.projects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      transition={cardTransition}
                    >
                      <ProjectCard
                        imgSrc={project.image}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                        linkText={project.linkText}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

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
