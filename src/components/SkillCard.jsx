import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <div className="bg-[#161616] rounded-xl p-6 md:p-8 flex flex-col justify-between h-full border border-white/5 shadow-sm hover:border-white/10 transition-colors">
      <div>
        <div className="font-mono text-gray-400 text-sm mb-4">#{skill.id}</div>
        <h3 className="text-white text-xl font-bold tracking-tight mb-2">{skill.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{skill.description}</p>
      </div>
      <div className="mt-8 pt-4 border-t border-white/10">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
          Seen in {skill.rolesCount} {skill.rolesCount === 1 ? 'role' : 'roles'}
        </span>
      </div>
    </div>
  );
}
