'use client';

import { useState } from 'react';
import { PROJECTS } from '@/app/data/portfolio';
import type { ProjectPreviewState } from '@/app/types/portfolio';
import ProjectLink from './ProjectLink';
import ProjectPreview from './ProjectPreview';
import ProjectStatement from './ProjectStatement';
import Reveal from './ui/Reveal';

export default function Projects(): JSX.Element {
  const [preview, setPreview] = useState<ProjectPreviewState>(null);

  return (
    <div
      id='Work'
      className='flex flex-col px-8 pb-16 z-40 gap-7 lg:pb-32 lg:pt-9 sm:gap-10 lg:px-10 lg:gap-24 items-start lg:items-center justify-start'
    >
      <ProjectStatement />
      <Reveal className='w-full'>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-0 justify-around lg:w-full'>
          {PROJECTS.map((project, index) => (
            <ProjectLink
              key={project.title}
              index={index}
              project={project}
              setPreview={setPreview}
            />
          ))}
        </div>
      </Reveal>
      <ProjectPreview activeIndex={preview} projects={PROJECTS} />
    </div>
  );
}
