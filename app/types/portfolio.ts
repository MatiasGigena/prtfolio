export interface PortfolioProject {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly href: string;
}

export type ProjectPreviewState = number | null;

export interface AboutTopic {
  readonly id: string;
  /** One word that stands in for the section heading while this topic is being read. */
  readonly word: string;
  readonly question: string;
  readonly answer: string;
}

export interface AboutContent {
  readonly intro: string;
  readonly topics: readonly AboutTopic[];
  readonly cta: {
    readonly label: string;
    readonly href: `#${string}`;
  };
}

export interface Book {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  readonly image: string;
  readonly accent: string;
}

export interface SkillLogo {
  readonly src: string;
  readonly alt: string;
  readonly className: string;
}

export interface SkillPlane {
  readonly id: string;
  readonly strength: number;
  readonly logos: readonly SkillLogo[];
}

export interface EmphasizedText {
  readonly emphasis: string;
}

export type RichTextSegment = string | EmphasizedText;
export type RichPhrase = readonly RichTextSegment[];

export interface NavigationItem {
  readonly label: string;
  readonly targetId: `#${string}`;
}
