'use client';

import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useRef, type JSX } from 'react';
import { CONTACT, SECTION_IDS } from '@/app/data/portfolio';
import type { SocialLink, SocialNetwork } from '@/app/types/portfolio';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  type IconProps,
} from './ui/Icons';
import Magnetic from './ui/Magnetic';

const fieldClassName =
  'contact-field w-full bg-white/5 rounded border border-white/25 focus:border-white/70 focus:bg-white/10 focus:ring-2 focus:ring-white/20 text-base outline-none text-white py-1 px-3';
const fieldErrorClassName = 'mt-1 text-sm text-red-300';

interface SocialBrand {
  readonly label: string;
  readonly Icon: (props: IconProps) => JSX.Element;
  /** The Facebook and Instagram marks fill more of their box, so they are drawn smaller to match. */
  readonly size: number;
}

const SOCIAL_BRANDS: Readonly<Record<SocialNetwork, SocialBrand>> = {
  facebook: { label: 'Facebook', Icon: FacebookIcon, size: 20 },
  linkedin: { label: 'LinkedIn', Icon: LinkedInIcon, size: 24 },
  instagram: { label: 'Instagram', Icon: InstagramIcon, size: 20 },
  whatsapp: { label: 'WhatsApp', Icon: WhatsAppIcon, size: 24 },
};

export default function Contact(): JSX.Element {
  const [state, handleSubmit] = useForm(CONTACT.formspreeFormId);
  const formRef = useRef<HTMLFormElement>(null);
  // Errors that belong to no single field, including a failed network request.
  const hasFormError = (state.errors?.getFormErrors().length ?? 0) > 0;

  useEffect(() => {
    if (state.succeeded) formRef.current?.reset();
  }, [state.succeeded]);

  return (
    <section
      id={SECTION_IDS.contact}
      className='text-gray-600 min-h-screen flex items-center justify-center rounded-b-full border-b-2 w-full body-font relative'
      aria-labelledby='contact-heading'
    >
      <div className='container px-5 border-0 lg:pt-11 lg:pb-4 pt-6 pb-3 mx-auto'>
        <div className='flex flex-col text-center w-full mb-12'>
          <h2 id='contact-heading' className='sm:text-3xl text-2xl font-medium title-font mb-4 text-white'>
            Drop me an email.
          </h2>
          <p className='lg:w-2/3 mx-auto text-white leading-relaxed text-base'>
            I hope you&apos;ve found inspiration along the way. Let&apos;s connect.
          </p>
        </div>

        <div className='lg:w-1/2 md:w-2/3 mx-auto'>
          <form ref={formRef} onSubmit={handleSubmit} className='flex flex-wrap -m-2'>
            <div className='p-2 w-1/2'>
              <label htmlFor='name' className='leading-7 text-sm text-white'>
                Name
              </label>
              <input
                required
                type='text'
                id='name'
                name='name'
                autoComplete='name'
                className={`${fieldClassName} leading-8`}
              />
              <ValidationError prefix='Name' field='name' errors={state.errors} className={fieldErrorClassName} />
            </div>
            <div className='p-2 w-1/2'>
              <label htmlFor='email' className='leading-7 text-sm text-white'>
                Email
              </label>
              <input
                required
                type='email'
                id='email'
                name='email'
                autoComplete='email'
                className={`${fieldClassName} leading-8`}
              />
              <ValidationError prefix='Email' field='email' errors={state.errors} className={fieldErrorClassName} />
            </div>
            <div className='p-2 w-full'>
              <label htmlFor='message' className='leading-7 text-sm text-white'>
                Message
              </label>
              <textarea
                required
                id='message'
                name='message'
                className={`${fieldClassName} h-32 resize-none leading-6`}
              />
              <ValidationError
                prefix='Message'
                field='message'
                errors={state.errors}
                className={fieldErrorClassName}
              />
            </div>
            <div className='p-2 w-full flex justify-center'>
              <Magnetic>
                <button
                  type='submit'
                  disabled={state.submitting}
                  className='contact-submit pressable bg-white text-black border-2 py-2 px-8 rounded text-lg disabled:opacity-60'
                >
                  {state.submitting ? 'Sending…' : 'Send'}
                </button>
              </Magnetic>
            </div>
            {state.succeeded ? (
              <p className='w-full p-2 text-center text-white' role='status'>
                Thanks! Your message has been sent.
              </p>
            ) : null}
            {hasFormError ? (
              <p className='w-full p-2 text-center text-red-300' role='alert'>
                Your message could not be sent. Please try again, or email me directly.
              </p>
            ) : null}
          </form>

          <div className='p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center'>
            <a href={`mailto:${CONTACT.email}`} className='pressable inline-block text-white'>
              {CONTACT.email}
            </a>
            <p className='leading-normal my-5'>
              {CONTACT.addressLines.map((line) => (
                <span key={line} className='block'>
                  {line}
                </span>
              ))}
            </p>
            <div className='inline-flex items-center gap-4'>
              {CONTACT.socials.map((social) => (
                <SocialButton key={social.network} social={social} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialButton({ social }: { readonly social: SocialLink }): JSX.Element {
  const { label, Icon, size } = SOCIAL_BRANDS[social.network];
  return (
    <Magnetic>
      <a
        href={social.href}
        target='_blank'
        rel='noreferrer'
        aria-label={label}
        className='pressable inline-flex text-white'
      >
        <Icon size={size} />
      </a>
    </Magnetic>
  );
}
