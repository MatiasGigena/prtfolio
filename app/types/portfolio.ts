export interface PortfolioProject {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly href: string;
}

export type ProjectPreviewState = number | null;

export interface Book {
  readonly id: number;
  readonly title: string;
  readonly image: string;
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
