import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 via-gray-100 to-orange-200 hover:from-blue-200 hover:to-orange-300 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl h-full cursor-pointer">
      <div className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#fff7ed] rounded-[15px] p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-start gap-5 mb-3">
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] text-gray-400 font-mono text-lg shrink-0">
              #{skill.id}
            </div>
            <div className="pt-1">
              <h3 className="text-gray-900 text-xl font-bold tracking-tight mb-1 group-hover:text-[#2563EB] transition-colors duration-300">
                {skill.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {skill.description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-start gap-1 pl-[76px]">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">Applied In</div>
          <span className="inline-flex items-center justify-center bg-[#f1f3f5] text-gray-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-[4px] leading-tight">
            {skill.appliedIn}
          </span>
        </div>
      </div>
    </div>
  );
}
