import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProjectLink from '@/app/components/ProjectLink';
import { PROJECTS } from '@/app/data/portfolio';
import type { PortfolioProject } from '@/app/types/portfolio';

const project = PROJECTS[0] as PortfolioProject;

function renderLink(): { onPreviewChange: ReturnType<typeof vi.fn>; hoverTarget: HTMLElement } {
  const onPreviewChange = vi.fn();
  render(<ProjectLink project={project} onPreviewChange={onPreviewChange} />);
  const hoverTarget = screen.getByRole('link').parentElement;
  if (!hoverTarget) throw new Error('Link has no wrapper');
  return { onPreviewChange, hoverTarget };
}

describe('ProjectLink', () => {
  it('opens the project in a new tab', () => {
    renderLink();
    const link = screen.getByRole('link', { name: new RegExp(project.title) });
    expect(link).toHaveAttribute('href', project.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent(project.description);
  });

  it('asks for the preview while a mouse hovers it', () => {
    const { onPreviewChange, hoverTarget } = renderLink();

    fireEvent.pointerEnter(hoverTarget, { pointerType: 'mouse' });
    expect(onPreviewChange).toHaveBeenLastCalledWith(true);

    fireEvent.pointerLeave(hoverTarget, { pointerType: 'mouse' });
    expect(onPreviewChange).toHaveBeenLastCalledWith(false);
  });

  it('leaves the preview alone for touch, which has no hover', () => {
    const { onPreviewChange, hoverTarget } = renderLink();

    fireEvent.pointerEnter(hoverTarget, { pointerType: 'touch' });
    fireEvent.pointerLeave(hoverTarget, { pointerType: 'touch' });

    expect(onPreviewChange).not.toHaveBeenCalled();
  });
});
