import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CONTACT } from '@/app/data/portfolio';
import Contact from '@/app/components/Contact';
import type { SocialNetwork } from '@/app/types/portfolio';

const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
};

/** Answers every request with `respond()`'s JSON body, or fails it if `respond` throws. */
function stubFormspree(respond: () => unknown): ReturnType<typeof vi.fn> {
  const fetchMock = vi.fn(async () => {
    const body = respond();
    return { json: () => Promise.resolve(body) };
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

async function fillInAndSend(email = 'ada@example.com'): Promise<void> {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
  await user.type(screen.getByLabelText('Email'), email);
  await user.type(screen.getByLabelText('Message'), 'Hello there');
  await user.click(screen.getByRole('button', { name: 'Send' }));
}

describe('Contact', () => {
  it('sends the message to the Formspree form and clears the fields once it is accepted', async () => {
    const fetchMock = stubFormspree(() => ({ next: '/thanks', ok: true }));
    render(<Contact />);

    await fillInAndSend();

    expect(await screen.findByRole('status')).toHaveTextContent('Thanks! Your message has been sent.');
    expect(fetchMock).toHaveBeenCalledWith(
      `https://formspree.io/f/${CONTACT.formspreeFormId}`,
      expect.objectContaining({ method: 'POST' }),
    );
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });

  it('shows a field error next to the field Formspree rejected', async () => {
    stubFormspree(() => ({
      errors: [{ field: 'email', code: 'TYPE_EMAIL', message: 'should be an email' }],
    }));
    render(<Contact />);

    await fillInAndSend('ada@example');

    expect(await screen.findByText('Email should be an email')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('tells the reader when the message could not be sent at all', async () => {
    stubFormspree(() => {
      throw new TypeError('Failed to fetch');
    });
    render(<Contact />);

    await fillInAndSend();

    expect(await screen.findByRole('alert')).toHaveTextContent('Your message could not be sent.');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled());
    expect(screen.getByLabelText('Message')).toHaveValue('Hello there');
  });

  it('links to the email address and every social network', () => {
    render(<Contact />);

    expect(screen.getByRole('link', { name: CONTACT.email })).toHaveAttribute(
      'href',
      `mailto:${CONTACT.email}`,
    );
    for (const social of CONTACT.socials) {
      expect(screen.getByRole('link', { name: SOCIAL_LABELS[social.network] })).toHaveAttribute(
        'href',
        social.href,
      );
    }
  });
});
