import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 flex flex-col justify-between h-full border-2 border-zinc-200 hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div>
        <div className="font-mono text-[#2563EB] text-sm mb-4 font-bold">#{skill.id}</div>
        <h3 className="text-[#09090B] text-xl font-bold tracking-tight mb-2 group-hover:text-[#2563EB] transition-colors duration-300">{skill.title}</h3>
        <p className="text-[#3F3F46] text-base leading-relaxed">{skill.description}</p>
      </div>
      <div className="mt-8 pt-4 border-t-2 border-zinc-100">
        <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
          Seen in {skill.rolesCount} {skill.rolesCount === 1 ? 'role' : 'roles'}
        </span>
      </div>
    </div>
  );
}
