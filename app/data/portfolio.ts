import type {
  Book,
  NavigationItem,
  PortfolioProject,
  RichPhrase,
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
  { id: 1, title: 'Clean Code', image: '/images/cleancode.avif' },
  { id: 2, title: 'The Pragmatic Programmer', image: '/images/thepragmaticprogrammer.avif' },
  { id: 3, title: 'Design Patterns', image: '/images/designpatterns.avif' },
  { id: 4, title: 'Refactoring to Patterns', image: '/images/refactoringtopatterns.avif' },
  { id: 5, title: "You Don't Know JS Yet", image: '/images/youdontknowjsyet.avif' },
  { id: 6, title: 'Eloquent JavaScript', image: '/images/eloquentjavascript.avif' },
  { id: 7, title: 'Structure & Interpretation', image: '/images/structureandinterpretation.avif' },
];

export const ABOUT_PHRASES = [
  [
    [
      "I'm ",
      { emphasis: 'Matias Gigena' },
      ', your ',
      { emphasis: 'argentinian' },
      ' guide through the digital wonderland.',
    ],
    ['Crafting the virtual world as a ', { emphasis: 'Front End Developer' }, '.'],
    [
      'Over ',
      { emphasis: '4 years' },
      ' of ',
      { emphasis: 'self-driven' },
      ' learning, building, and shipping real-world projects.',
    ],
    ['Currently employed at ', { emphasis: 'UseTeam' }, '.'],
  ],
  [
    [{ emphasis: 'Advanced' }, ' English speaker at ', { emphasis: 'C1' }, ' level.'],
    [
      'Validated through international ',
      { emphasis: 'Certificate in Advanced English' },
      ' (CAE).',
    ],
    [
      'Enriching experience at ',
      { emphasis: 'Harrows House International College' },
      ' in Swanage.',
    ],
    ['Proud alumnus of Escuela del Mirador, a ', { emphasis: 'bilingual' }, ' school.'],
  ],
  [
    ["Beyond a developer, I'm a ", { emphasis: 'coding enthusiast' }, ' refining my skills.'],
    [
      'Embracing ',
      { emphasis: 'leadership' },
      ', ',
      { emphasis: 'approachability' },
      ', and ',
      { emphasis: 'strong social skills' },
      ' for trust.',
    ],
    [
      'Dedicated ',
      { emphasis: 'hard worker' },
      ', pushing limits to ',
      { emphasis: 'elevate' },
      ' projects.',
    ],
    [
      'Engaging coding pursuits and a friendly disposition for ',
      { emphasis: 'impactful contributions' },
      '.',
    ],
  ],
] as const satisfies readonly (readonly RichPhrase[])[];

export const CONTACT_PHRASE = [
  [{ emphasis: 'Contact ME.' }],
] as const satisfies readonly RichPhrase[];

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
