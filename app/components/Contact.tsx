'use client';

import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useRef, type ComponentProps, type JSX, type ReactNode } from 'react';
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

const FIELD_CLASS =
  'contact-field w-full bg-white/5 rounded border border-white/25 focus:border-white/70 focus:bg-white/10 focus:ring-2 focus:ring-white/20 text-base outline-none text-white py-1 px-3';
const FIELD_ERROR_CLASS = 'mt-1 text-sm text-red-300';

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
      className='text-white min-h-screen flex items-center justify-center rounded-b-full border-b-2 w-full relative'
      aria-labelledby='contact-heading'
    >
      <div className='container px-5 border-0 lg:pt-11 lg:pb-4 pt-6 pb-3 mx-auto'>
        <div className='flex flex-col text-center w-full mb-12'>
          <h2 id='contact-heading' className='sm:text-3xl text-2xl font-medium mb-4'>
            Drop me an email.
          </h2>
          <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
            I hope you&apos;ve found inspiration along the way. Let&apos;s connect.
          </p>
        </div>

        <div className='lg:w-1/2 md:w-2/3 mx-auto'>
          <form ref={formRef} onSubmit={handleSubmit} className='flex flex-wrap -m-2'>
            <Field id='name' label='Name' className='w-1/2' errors={state.errors}>
              <input
                required
                type='text'
                id='name'
                name='name'
                autoComplete='name'
                className={`${FIELD_CLASS} leading-8`}
              />
            </Field>
            <Field id='email' label='Email' className='w-1/2' errors={state.errors}>
              <input
                required
                type='email'
                id='email'
                name='email'
                autoComplete='email'
                className={`${FIELD_CLASS} leading-8`}
              />
            </Field>
            <Field id='message' label='Message' className='w-full' errors={state.errors}>
              <textarea
                required
                id='message'
                name='message'
                className={`${FIELD_CLASS} h-32 resize-none leading-6`}
              />
            </Field>
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
              <p className='w-full p-2 text-center' role='status'>
                Thanks! Your message has been sent.
              </p>
            ) : null}
            {hasFormError ? (
              <p className='w-full p-2 text-center text-red-300' role='alert'>
                Your message could not be sent. Please try again, or email me directly.
              </p>
            ) : null}
          </form>

          <div className='p-2 w-full pt-8 mt-8 border-t border-white/15 text-center'>
            <a href={`mailto:${CONTACT.email}`} className='pressable inline-block'>
              {CONTACT.email}
            </a>
            <p className='leading-normal my-5 text-white/60'>
              {CONTACT.addressLines.map((line) => (
                <span key={line} className='block'>
                  {line}
                </span>
              ))}
            </p>
            <div className='inline-flex items-center gap-4'>
              {CONTACT.socials.map((social) => (
                <SocialProfileLink key={social.network} social={social} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  readonly id: 'name' | 'email' | 'message';
  readonly label: string;
  /** Width of the field within the form's row, e.g. 'w-1/2'. */
  readonly className: string;
  readonly errors: ComponentProps<typeof ValidationError>['errors'];
  /** The input or textarea, whose id must match `id`. */
  readonly children: ReactNode;
}

/** A labelled form control with the errors Formspree reports for it underneath. */
function Field({ id, label, className, errors, children }: FieldProps): JSX.Element {
  return (
    <div className={`p-2 ${className}`}>
      <label htmlFor={id} className='leading-7 text-sm'>
        {label}
      </label>
      {children}
      <ValidationError prefix={label} field={id} errors={errors} className={FIELD_ERROR_CLASS} />
    </div>
  );
}

function SocialProfileLink({ social }: { readonly social: SocialLink }): JSX.Element {
  const { label, Icon, size } = SOCIAL_BRANDS[social.network];
  return (
    <Magnetic>
      <a
        href={social.href}
        target='_blank'
        rel='noreferrer'
        aria-label={label}
        className='pressable inline-flex'
      >
        <Icon size={size} />
      </a>
    </Magnetic>
  );
}
