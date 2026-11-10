import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PROJECTS, SECTION_IDS } from '@/app/data/portfolio';
import Projects from '@/app/components/Projects';

function previewTrack(): HTMLElement {
  const track = document.querySelector<HTMLElement>('.preview-track');
  if (!track) throw new Error('Preview track missing');
  return track;
}

describe('Projects', () => {
  it('is the Work section and links every project', () => {
    render(<Projects />);

    expect(screen.getByRole('region', { name: 'Selected work' })).toHaveAttribute('id', SECTION_IDS.work);
    for (const project of PROJECTS) {
      expect(screen.getByRole('link', { name: new RegExp(project.title.replace(/\?/g, '\\?')) })).toHaveAttribute(
        'href',
        project.href,
      );
    }
  });

  it('slides the preview to the hovered project and holds it there as it fades', () => {
    render(<Projects />);
    const links = screen.getAllByRole('link');
    const third = links[2]?.parentElement;
    if (!third) throw new Error('Expected at least three projects');

    fireEvent.pointerEnter(third, { pointerType: 'mouse' });
    expect(previewTrack().style.transform).toBe('translate3d(0px, -200%, 0px)');

    // Leaving keeps the screenshot in place so it fades out instead of sliding away.
    fireEvent.pointerLeave(third, { pointerType: 'mouse' });
    expect(previewTrack().style.transform).toBe('translate3d(0px, -200%, 0px)');
  });
});
