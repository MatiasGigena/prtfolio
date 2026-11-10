'use client';

import { useState, type JSX } from 'react';
import { PROJECTS, SECTION_IDS } from '@/app/data/portfolio';
import ProjectLink from './ProjectLink';
import ProjectPreview from './ProjectPreview';
import ProjectStatement from './ProjectStatement';
import Reveal from './ui/Reveal';

export default function Projects(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id={SECTION_IDS.work}
      aria-label='Selected work'
      className='flex flex-col px-8 pb-16 z-40 gap-7 lg:pb-32 lg:pt-9 sm:gap-10 lg:px-10 lg:gap-24 items-start lg:items-center justify-start'
    >
      <ProjectStatement />
      <Reveal className='w-full'>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-0 justify-around lg:w-full'>
          {PROJECTS.map((project, index) => (
            <ProjectLink
              key={project.title}
              project={project}
              onPreviewChange={(visible) => setActiveIndex(visible ? index : null)}
            />
          ))}
        </div>
      </Reveal>
      <ProjectPreview activeIndex={activeIndex} projects={PROJECTS} />
    </section>
  );
}
