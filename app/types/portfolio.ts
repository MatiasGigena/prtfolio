export interface PortfolioProject {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly href: string;
}

export interface AboutTopic {
  readonly id: string;
  /** One word that stands in for the section heading while this topic is being read. */
  readonly word: string;
  readonly question: string;
  readonly answer: string;
}

/** The `id` of each section the navigation can jump to. */
export type SectionId = 'work' | 'about' | 'contact';

export interface AboutContent {
  readonly intro: string;
  readonly topics: readonly AboutTopic[];
  readonly cta: {
    readonly label: string;
    readonly target: SectionId;
  };
}

export interface Book {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  readonly image: string;
  readonly accent: string;
}

export interface TechLogo {
  /** The technology's name, also used as the image's alt text. */
  readonly name: string;
  readonly src: string;
  /** Drawn in black or dark grey, so it is inverted to stay visible on black sections. */
  readonly dark?: true;
}

export interface NavigationItem {
  readonly label: string;
  readonly target: SectionId;
}

export type SocialNetwork = 'facebook' | 'linkedin' | 'instagram' | 'whatsapp';

export interface SocialLink {
  readonly network: SocialNetwork;
  readonly href: string;
}

export interface ContactDetails {
  /** Formspree form that receives the contact form's submissions. */
  readonly formspreeFormId: string;
  readonly email: string;
  readonly addressLines: readonly string[];
  readonly socials: readonly SocialLink[];
}
