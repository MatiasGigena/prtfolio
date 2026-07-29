'use client';

import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { LinkedInIcon, WhatsAppIcon } from './ui/Icons';
import Magnetic from './ui/Magnetic';
import Reveal from './ui/Reveal';

const fieldClassName =
  'contact-field w-full bg-white/5 rounded border border-white/25 focus:border-white/70 focus:bg-white/10 focus:ring-2 focus:ring-white/20 text-base outline-none text-white py-1 px-3';

export default function Contact(): JSX.Element {
  const [state, handleSubmit] = useForm('mjvqyner');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.succeeded) formRef.current?.reset();
  }, [state.succeeded]);

  return (
    <Reveal className='w-full' direction='up'>
      <section
        id='Contact'
        className='text-gray-600 min-h-screen flex items-center justify-center rounded-b-full border-b-2 w-full body-font relative'
        aria-labelledby='contact-heading'
      >
        <div className='container px-5 border-0 lg:pt-11 lg:pb-4 pt-6 pb-3 mx-auto'>
          <div className='flex flex-col text-center w-full mb-12'>
            <h2
              id='contact-heading'
              className='sm:text-3xl text-2xl font-medium title-font mb-4 text-white'
            >
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
                <ValidationError prefix='Email' field='email' errors={state.errors} />
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
                <ValidationError prefix='Message' field='message' errors={state.errors} />
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
            </form>

            <div className='p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center'>
              <a
                href='mailto:matias.gigena7@outlook.es'
                className='pressable inline-block text-white'
              >
                matias.gigena7@outlook.es
              </a>
              <p className='leading-normal my-5'>
                Agronomía, C15.
                <br />
                Ciudad Autónoma de Buenos Aires.
              </p>
              <div className='inline-flex items-center gap-4'>
                <SocialLink
                  href='https://www.facebook.com/profile.php?id=100009688898482'
                  label='Facebook'
                >
                  <svg
                    fill='white'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
                  </svg>
                </SocialLink>
                <SocialLink href='https://www.linkedin.com/in/matias-gigena-7bk/' label='LinkedIn'>
                  <LinkedInIcon />
                </SocialLink>
                <SocialLink href='https://www.instagram.com/matiasgigena_/' label='Instagram'>
                  <svg
                    fill='none'
                    stroke='white'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                    <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' />
                  </svg>
                </SocialLink>
                <SocialLink
                  href='https://api.whatsapp.com/send/?phone=541121795715&text&type=phone_number&app_absent=0'
                  label='WhatsApp'
                >
                  <WhatsAppIcon />
                </SocialLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

interface SocialLinkProps {
  readonly href: string;
  readonly label: string;
  readonly children: ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps): JSX.Element {
  return (
    <Magnetic>
      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        aria-label={label}
        className='pressable inline-flex text-white'
      >
        {children}
      </a>
    </Magnetic>
  );
}
