'use client';

import type { Dispatch, PointerEvent, SetStateAction } from 'react';
import type { PortfolioProject, ProjectPreviewState } from '@/app/types/portfolio';

interface ProjectLinkProps {
  readonly index: number;
  readonly project: PortfolioProject;
  readonly setPreview: Dispatch<SetStateAction<ProjectPreviewState>>;
}

export default function ProjectLink({ index, project, setPreview }: ProjectLinkProps): JSX.Element {
  const showPreview = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.pointerType === 'mouse') setPreview(index);
  };

  const hidePreview = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.pointerType === 'mouse') setPreview(null);
  };

  return (
    <div
      className='project-link text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-medium'
      onPointerEnter={showPreview}
      onPointerLeave={hidePreview}
    >
      <a href={project.href} target='_blank' rel='noreferrer'>
        <h3>{project.title}</h3>
        <p className='text-xs xl:text-base font-extralight w-full'>{project.description}</p>
      </a>
    </div>
  );
}
