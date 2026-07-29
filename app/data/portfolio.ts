import type {
  AboutChapter,
  Book,
  NavigationItem,
  PortfolioProject,
  SkillPlane,
} from '@/app/types/portfolio';

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: 'Work', targetId: '#Work' },
  { label: 'About', targetId: '#About' },
  { label: 'Contact', targetId: '#Contact' },
];

export const PROJECTS: readonly PortfolioProject[] = [
  {
    title: 'Rekon',
    image: '/images/266shots_so.png',
    href: 'https://www.rekonmedia.com/',
    description: 'Design & Development',
  },
  {
    title: 'Nexiafy',
    image: '/images/clipboard-image-1770985279.avif',
    href: 'https://nexiafy.useteam.io/',
    description: 'Design & Development',
  },
  {
    title: 'Huntek',
    image: '/images/199shots_so.png',
    href: 'https://huntek-website.vercel.app/',
    description: 'Design & Development & Interaction',
  },
  {
    title: '????',
    image: '/images/693shots_so.png',
    href: 'https://vercel.com/matiasgigena/pi-food-main-matias-gigena',
    description: 'Time will tell . . .',
  },
];

export const BOOKS: readonly Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    image: '/images/cleancode.avif',
    accent: '#b9c7b3',
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    image: '/images/thepragmaticprogrammer.avif',
    accent: '#8fa1ae',
  },
  {
    id: 3,
    title: 'Design Patterns',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides',
    image: '/images/designpatterns.avif',
    accent: '#6cabc8',
  },
  {
    id: 4,
    title: 'Refactoring to Patterns',
    author: 'Joshua Kerievsky',
    image: '/images/refactoringtopatterns.avif',
    accent: '#ba4d4d',
  },
  {
    id: 5,
    title: "You Don't Know JS Yet",
    author: 'Kyle Simpson',
    image: '/images/youdontknowjsyet.avif',
    accent: '#d7a73f',
  },
  {
    id: 6,
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    image: '/images/eloquentjavascript.avif',
    accent: '#4f7552',
  },
  {
    id: 7,
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson & Gerald Jay Sussman',
    image: '/images/structureandinterpretation.avif',
    accent: '#8c6b52',
  },
];

export const ABOUT_CHAPTERS: readonly AboutChapter[] = [
  {
    id: 'craft',
    eyebrow: '01 / Craft',
    title: 'I build where design and engineering meet.',
    body: 'For more than four years, I have learned by shipping—turning rough ideas into responsive products, then refining the details until they feel obvious to use.',
    details: ['Front-end development', 'Interaction and motion', 'Responsive systems'],
  },
  {
    id: 'method',
    eyebrow: '02 / Method',
    title: 'Clarity first. Motion with a reason.',
    body: 'I like the point where a layout stops being a mockup and starts behaving like a product: clear hierarchy, resilient code, accessible states, and feedback that arrives exactly when it should.',
    details: ['Purpose before polish', 'Accessible by default', 'Built for real devices'],
  },
  {
    id: 'communication',
    eyebrow: '03 / Communication',
    title: 'Technical enough to build it. Human enough to explain it.',
    body: 'I am based in Buenos Aires and currently work at UseTeam. I collaborate comfortably in Spanish or English, with a C1 level backed by Cambridge CAE and time studying in Swanage, UK.',
    details: ['Buenos Aires, Argentina', 'Spanish + C1 English', 'Currently at UseTeam'],
  },
  {
    id: 'direction',
    eyebrow: '04 / Direction',
    title: 'Still curious. Still shipping.',
    body: 'I am a self-directed learner who reads, prototypes, and revisits the work. The goal is never more effects for their own sake—it is a stronger product and a better experience.',
    details: ['Read widely', 'Prototype early', 'Refine relentlessly'],
    cta: { label: 'Start a conversation', href: '#Contact' },
  },
];

export const TECH_COLUMNS = [
  {
    id: 'left',
    multiplier: 2,
    images: [
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-plain.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-line.svg',
    ],
  },
  {
    id: 'center',
    multiplier: 2.3,
    images: [
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg',
      'https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg',
      'https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg',
      'https://www.vectorlogo.zone/logos/framer/framer-icon.svg',
      'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
      'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
      'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg',
    ],
  },
  {
    id: 'right',
    multiplier: 2.5,
    images: [
      'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
      'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
      '/images/greensock-gsap-icon-seeklogo.com.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
      '/images/neptune.png',
      '/images/gremlin.png',
    ],
  },
] as const;

export const SKILL_PLANES: readonly SkillPlane[] = [
  {
    id: 'foreground',
    strength: 0.4,
    logos: [
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg',
        alt: 'JavaScript',
        className: 'left-[8%] top-[70%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        alt: 'TypeScript',
        className: 'left-[5%] top-[55%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg',
        alt: 'WordPress',
        className: 'left-[60%] top-0',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        alt: 'AWS',
        className: 'left-[85%] top-[18%]',
      },
    ],
  },
  {
    id: 'near',
    strength: 0.5,
    logos: [
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
        alt: 'GitHub',
        className: 'left-[5%] top-[8%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg',
        alt: 'HTML',
        className: 'left-[80%] top-[51%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg',
        alt: 'CSS',
        className: 'left-[65%] top-[60%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
        alt: 'Docker',
        className: 'left-[35%] top-[40%]',
      },
    ],
  },
  {
    id: 'far',
    strength: 0.25,
    logos: [
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-plain.svg',
        alt: 'Material UI',
        className: 'left-[70%] top-[73%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
        alt: 'React',
        className: 'left-[40%] top-[75%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg',
        alt: 'Framer',
        className: 'left-[65%] top-[85%]',
      },
      { src: '/images/neptune.png', alt: 'Neptune', className: 'left-[10%] top-[20%]' },
      { src: '/images/gremlin.png', alt: 'Gremlin', className: 'left-[88%] top-[30%]' },
    ],
  },
  {
    id: 'closest',
    strength: 0.6,
    logos: [
      {
        src: '/images/greensock-gsap-icon-seeklogo.com.svg',
        alt: 'GSAP',
        className: 'left-[20%] top-[80%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
        alt: 'Redux',
        className: 'left-[15%] top-[32%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-line.svg',
        alt: 'Next.js',
        className: 'left-[81%] top-[2.5%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
        alt: 'Node.js',
        className: 'left-[63%] top-[18%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
        alt: 'Express',
        className: 'left-[29%] top-[18%]',
      },
      {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg',
        alt: 'Sequelize',
        className: 'right-[13%] top-[33%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
        alt: 'Tailwind CSS',
        className: 'left-[35%] top-[60%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg',
        alt: 'PostgreSQL',
        className: 'left-[40%] top-[2%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        alt: 'Postman',
        className: 'left-[15%] top-[2%]',
      },
      {
        src: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
        alt: 'Git',
        className: 'right-[40%] top-[30%]',
      },
    ],
  },
];
