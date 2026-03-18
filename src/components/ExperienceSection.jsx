import React from 'react';
import SkillsShowcase from './SkillsShowcase';
import ExperienceTimeline from './ExperienceTimeline';

export default function ExperienceSection() {
  return (
    <section id="experiences" className="max-w-7xl mx-auto px-8 py-24 border-t border-gray-100 mt-12">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">Previous Experience</h2>
        <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed">
          I’ve spent over 6 years obsessed with logic and algorithms through competitive programming. Now, I’m using that foundation to build AI-driven tools.
        </p>
      </div>

      <div className="flex flex-col gap-24">
        {/* Skills Showcase */}
        <SkillsShowcase />
        
        {/* Experience Timeline */}
        <ExperienceTimeline />
      </div>
    </section>
  );
}
