import type {
  AboutContent,
  Book,
  ContactDetails,
  PortfolioProject,
  SectionId,
  SectionLink,
  TechLogo,
} from '@/app/types/portfolio';

/** Section ids, so the components that render a section and the links that target it agree. */
export const SECTION_IDS = {
  work: 'work',
  about: 'about',
  contact: 'contact',
} as const satisfies { readonly [Id in SectionId]: Id };

export const NAVIGATION_ITEMS: readonly SectionLink[] = [
  { label: 'Work', target: SECTION_IDS.work },
  { label: 'About', target: SECTION_IDS.about },
  { label: 'Contact', target: SECTION_IDS.contact },
];

/** Revealed letter by letter above the project list. */
export const WORK_STATEMENT =
  "It's not just a Project. I take pride in crafting digital experiences that not only meet functional requirements but also delight users with intuitive interfaces and smooth interactions.";

export const PROJECTS: readonly PortfolioProject[] = [
  {
    title: 'Rekon',
    image: '/images/project-rekon.png',
    href: 'https://www.rekonmedia.com/',
    description: 'Design & Development',
  },
  {
    title: 'Nexiafy',
    image: '/images/project-nexiafy.avif',
    href: 'https://nexiafy.useteam.io/',
    description: 'Design & Development',
  },
  {
    title: 'Huntek',
    image: '/images/project-huntek.png',
    href: 'https://huntek-website.vercel.app/',
    description: 'Design & Development & Interaction',
  },
  {
    title: '????',
    image: '/images/project-coming-soon.png',
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

export const ABOUT: AboutContent = {
  intro:
    "I'm Matías, a front-end developer in Buenos Aires. Four years in, I still build the same way: structure first, motion last, accessible throughout.",
  topics: [
    {
      id: 'craft',
      word: 'Craft',
      question: 'What do you do?',
      answer:
        "I build interfaces, and most of my time goes into the part people touch: interaction, motion and layouts that hold up on any screen. I've been doing it for more than four years.",
    },
    {
      id: 'method',
      word: 'Method',
      question: 'How do you work?',
      answer:
        'Layout first, polish last. I get the structure clear and accessible before anything moves, then add motion where it helps, and test it on real devices.',
    },
    {
      id: 'place',
      word: 'Place',
      question: 'Where are you?',
      answer: 'In Buenos Aires, working at UseTeam. I work in Spanish and in English (C1).',
    },
    {
      id: 'direction',
      word: 'Next',
      question: "What's next?",
      answer: 'More of the same loop: read widely, prototype early, keep refining.',
    },
  ],
  cta: { label: 'Start a conversation', target: SECTION_IDS.contact },
};

export const CONTACT: ContactDetails = {
  formspreeFormId: 'mjvqyner',
  email: 'matias.gigena7@outlook.es',
  addressLines: ['Agronomía, C15.', 'Ciudad Autónoma de Buenos Aires.'],
  socials: [
    { network: 'facebook', href: 'https://www.facebook.com/profile.php?id=100009688898482' },
    { network: 'linkedin', href: 'https://www.linkedin.com/in/matias-gigena-7bk/' },
    { network: 'instagram', href: 'https://www.instagram.com/matiasgigena_/' },
    {
      network: 'whatsapp',
      href: 'https://api.whatsapp.com/send/?phone=541121795715&text&type=phone_number&app_absent=0',
    },
  ],
};

const DEVICON = 'https://raw.githubusercontent.com/devicons/devicon/master/icons';
const VECTOR_LOGO_ZONE = 'https://www.vectorlogo.zone/logos';

/** Every technology logo shown on the page, defined once and referenced by key from the layouts. */
export const TECH_LOGOS = {
  aws: {
    name: 'AWS',
    src: `${DEVICON}/amazonwebservices/amazonwebservices-original.svg`,
    dark: true,
  },
  css: { name: 'CSS', src: `${VECTOR_LOGO_ZONE}/w3_css/w3_css-icon.svg` },
  docker: { name: 'Docker', src: `${DEVICON}/docker/docker-original.svg` },
  express: { name: 'Express', src: `${DEVICON}/express/express-original.svg`, dark: true },
  framer: { name: 'Framer', src: `${VECTOR_LOGO_ZONE}/framer/framer-icon.svg` },
  git: { name: 'Git', src: `${VECTOR_LOGO_ZONE}/git-scm/git-scm-icon.svg` },
  github: { name: 'GitHub', src: `${DEVICON}/github/github-original.svg`, dark: true },
  gremlin: { name: 'Gremlin', src: '/images/gremlin.png' },
  gsap: { name: 'GSAP', src: '/images/gsap.svg' },
  html: { name: 'HTML', src: `${VECTOR_LOGO_ZONE}/w3_html5/w3_html5-icon.svg` },
  javascript: { name: 'JavaScript', src: `${DEVICON}/javascript/javascript-plain.svg` },
  materialUi: { name: 'Material UI', src: `${DEVICON}/materialui/materialui-plain.svg` },
  neptune: { name: 'Neptune', src: '/images/neptune.png' },
  nextjs: { name: 'Next.js', src: `${DEVICON}/nextjs/nextjs-line.svg`, dark: true },
  nodejs: { name: 'Node.js', src: `${VECTOR_LOGO_ZONE}/nodejs/nodejs-icon.svg` },
  postgresql: { name: 'PostgreSQL', src: `${VECTOR_LOGO_ZONE}/postgresql/postgresql-icon.svg` },
  postman: { name: 'Postman', src: `${VECTOR_LOGO_ZONE}/getpostman/getpostman-icon.svg` },
  react: { name: 'React', src: `${DEVICON}/react/react-original.svg` },
  redux: { name: 'Redux', src: `${DEVICON}/redux/redux-original.svg` },
  sequelize: { name: 'Sequelize', src: `${DEVICON}/sequelize/sequelize-original.svg` },
  tailwind: { name: 'Tailwind CSS', src: `${VECTOR_LOGO_ZONE}/tailwindcss/tailwindcss-icon.svg` },
  typescript: { name: 'TypeScript', src: `${DEVICON}/typescript/typescript-original.svg` },
  wordpress: { name: 'WordPress', src: `${DEVICON}/wordpress/wordpress-plain.svg`, dark: true },
} as const satisfies Record<string, TechLogo>;
