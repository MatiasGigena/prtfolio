'use client';

import type { JSX, PointerEvent } from 'react';
import type { PortfolioProject } from '@/app/types/portfolio';

interface ProjectLinkProps {
  readonly project: PortfolioProject;
  /** Called with true when a mouse pointer enters the link and false when it leaves. */
  readonly onPreviewChange: (visible: boolean) => void;
}

export default function ProjectLink({ project, onPreviewChange }: ProjectLinkProps): JSX.Element {
  // Touch and pen pointers have no hover, so only a mouse shows the floating preview.
  const handlePointer =
    (visible: boolean) =>
    (event: PointerEvent<HTMLDivElement>): void => {
      if (event.pointerType === 'mouse') onPreviewChange(visible);
    };

  return (
    <div
      className='project-link text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-medium'
      onPointerEnter={handlePointer(true)}
      onPointerLeave={handlePointer(false)}
    >
      <a href={project.href} target='_blank' rel='noreferrer'>
        <h3>{project.title}</h3>
        <p className='text-xs xl:text-base font-extralight w-full'>{project.description}</p>
      </a>
    </div>
  );
}
