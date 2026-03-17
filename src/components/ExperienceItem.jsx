import React from 'react';

export default function ExperienceItem({ experience }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
      {/* Left Sidebar (Avatar + Meta) */}
      <div className="flex-shrink-0 w-full md:w-56 lg:w-64">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-sm text-gray-900 font-bold tracking-tighter overflow-hidden">
            {experience.logoImage ? (
              <img src={experience.logoImage} alt={experience.company} className="w-full h-full object-contain p-1" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = experience.logoText; }} />
            ) : (
              experience.logoText
            )}
          </div>
          <div className="md:hidden flex-1">
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">{experience.company}</h4>
            <div className="text-gray-600 font-medium text-sm">{experience.role}</div>
            <div className={`text-[10px] mt-1 font-bold tracking-wider uppercase ${experience.isCurrent ? 'text-green-600' : 'text-gray-500'}`}>
              {experience.dateRange} {experience.location && `• ${experience.location}`}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="hidden md:block mb-6">
          <h4 className="text-2xl font-bold text-gray-900 tracking-tight">{experience.company}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-gray-700 font-medium">{experience.role}</span>
            <span className="text-gray-300">•</span>
            <span className={`text-[11px] font-bold tracking-wider uppercase ${experience.isCurrent ? 'text-green-600' : 'text-gray-500'}`}>
              {experience.dateRange}
            </span>
            {experience.location && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400">{experience.location}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-5 text-gray-500 leading-relaxed text-[15px] sm:text-base">
          {experience.description.map((paragraph, index) => {
            if (paragraph.startsWith("- ")) {
               const content = paragraph.slice(2);
               // Check for bold notation or colon-based title
               const boldMatch = content.match(/\*\*(.*?)\*\*(.*)/);
               const colonMatch = content.match(/^(.*?):(.*)/);
               
               if (boldMatch) {
                 return (
                   <div key={index} className="pl-5 relative">
                     <span className="absolute left-1.5 top-2.5 w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                     <strong className="text-gray-900 font-medium">{boldMatch[1]}</strong>{boldMatch[2]}
                   </div>
                 );
               } else if (colonMatch) {
                 return (
                   <div key={index} className="pl-5 relative">
                     <span className="absolute left-1.5 top-2.5 w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                     <strong className="text-gray-900 font-medium">{colonMatch[1]}:</strong>{colonMatch[2]}
                   </div>
                 );
               }
               return (
                 <div key={index} className="pl-5 relative">
                   <span className="absolute left-1.5 top-2.5 w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                   {content}
                 </div>
               );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
