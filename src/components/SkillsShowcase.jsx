import React from 'react';
import SkillCard from './SkillCard';
import { skillsData } from '../data/portfolioData';

export default function SkillsShowcase() {
  return (
    <div className="bg-gradient-to-br from-[#FFFDF8] via-white to-[#EAF7FA] rounded-3xl p-6 sm:p-10 border border-gray-200/50 shadow-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">Most Notable Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
