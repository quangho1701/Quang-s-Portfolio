import React from 'react';
import ExperienceItem from './ExperienceItem';
import { experiencesData } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pt-4">
      {experiencesData.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} />
      ))}
    </div>
  );
}
