import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  ABOUT,
  BOOKS,
  CONTACT,
  NAVIGATION_ITEMS,
  PROJECTS,
  SECTION_IDS,
  TECH_LOGOS,
} from '@/app/data/portfolio';

interface RemotePattern {
  readonly protocol: string;
  readonly hostname: string;
  readonly pathname: string;
}

// Vitest runs from the project root; import.meta.url is an http URL under jsdom.
const publicFile = (src: string): string => resolve('public', `.${src}`);

async function loadRemoteImagePatterns(): Promise<readonly RemotePattern[]> {
  const configUrl = pathToFileURL(resolve('next.config.mjs')).href;
  const { default: config } = (await import(configUrl)) as {
    default: { images: { remotePatterns: readonly RemotePattern[] } };
  };
  return config.images.remotePatterns;
}

function isAllowedBy(url: URL, pattern: RemotePattern): boolean {
  const pathPrefix = pattern.pathname.replace(/\*\*$/, '');
  return (
    url.protocol === `${pattern.protocol}:` &&
    url.hostname === pattern.hostname &&
    url.pathname.startsWith(pathPrefix)
  );
}

const unique = (values: readonly unknown[]): boolean => new Set(values).size === values.length;

describe('section anchors', () => {
  it('names each section after its own id', () => {
    for (const [key, id] of Object.entries(SECTION_IDS)) expect(id).toBe(key);
  });

  it('gives every section exactly one navigation item', () => {
    const targets = NAVIGATION_ITEMS.map((item) => item.target);
    expect(targets).toHaveLength(Object.keys(SECTION_IDS).length);
    expect(new Set(targets)).toEqual(new Set(Object.values(SECTION_IDS)));
  });

  it('points the About call to action at a section', () => {
    expect(Object.values(SECTION_IDS)).toContain(ABOUT.cta.target);
  });
});

describe('content', () => {
  it('keys projects, books and About topics uniquely', () => {
    expect(unique(PROJECTS.map((project) => project.title))).toBe(true);
    expect(unique(BOOKS.map((book) => book.id))).toBe(true);
    expect(unique(ABOUT.topics.map((topic) => topic.id))).toBe(true);
    expect(unique(ABOUT.topics.map((topic) => topic.word))).toBe(true);
  });

  it('refers only to images that exist in public/', () => {
    const localImages = [
      ...PROJECTS.map((project) => project.image),
      ...BOOKS.map((book) => book.image),
      ...Object.values(TECH_LOGOS)
        .map((logo) => logo.src)
        .filter((src) => src.startsWith('/')),
    ];
    for (const src of localImages) expect(existsSync(publicFile(src)), src).toBe(true);
  });

  it('gives every book a hex accent colour', () => {
    for (const book of BOOKS) expect(book.accent).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('links projects and social profiles over https', () => {
    for (const href of [...PROJECTS.map((p) => p.href), ...CONTACT.socials.map((s) => s.href)]) {
      expect(new URL(href).protocol).toBe('https:');
    }
  });

  it('lists each social network once', () => {
    expect(unique(CONTACT.socials.map((social) => social.network))).toBe(true);
  });
});

describe('TECH_LOGOS', () => {
  it('names every logo uniquely, since the name is its alt text and React key', () => {
    expect(unique(Object.values(TECH_LOGOS).map((logo) => logo.name))).toBe(true);
  });

  it('loads remote logos only from hosts next/image is configured to optimise', async () => {
    const patterns = await loadRemoteImagePatterns();
    const remote = Object.values(TECH_LOGOS).filter((logo) => !logo.src.startsWith('/'));
    expect(remote.length).toBeGreaterThan(0);
    for (const logo of remote) {
      const url = new URL(logo.src);
      expect(patterns.some((pattern) => isAllowedBy(url, pattern)), logo.src).toBe(true);
    }
  });
});
