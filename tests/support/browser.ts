/**
 * Controllable stand-ins for the browser APIs jsdom lacks, so tests can decide what the
 * "device" supports (reduced motion, a mouse, a wide screen) and when elements scroll into view.
 */

type MediaListener = (event: MediaQueryListEvent) => void;

interface FakeMediaQueryList extends MediaQueryList {
  setMatches(matches: boolean): void;
}

const mediaQueryLists = new Map<string, FakeMediaQueryList>();
let mediaFeatures = new Set<string>();

function evaluate(query: string): boolean {
  // Every feature a query names has to be present: '(a) and (b)' needs both a and b.
  const features = query.match(/\([^()]+\)/g) ?? [];
  return features.length > 0 && features.every((feature) => mediaFeatures.has(feature));
}

function createMediaQueryList(query: string): FakeMediaQueryList {
  const listeners = new Set<MediaListener>();
  const list = {
    media: query,
    matches: evaluate(query),
    onchange: null,
    addEventListener: (_type: string, listener: MediaListener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: MediaListener) => listeners.delete(listener),
    addListener: (listener: MediaListener) => listeners.add(listener),
    removeListener: (listener: MediaListener) => listeners.delete(listener),
    dispatchEvent: () => true,
    setMatches(matches: boolean) {
      if (list.matches === matches) return;
      list.matches = matches;
      for (const listener of listeners) listener({ matches, media: query } as MediaQueryListEvent);
    },
  };
  return list as unknown as FakeMediaQueryList;
}

export function matchMedia(query: string): MediaQueryList {
  let list = mediaQueryLists.get(query);
  if (!list) {
    list = createMediaQueryList(query);
    mediaQueryLists.set(query, list);
  }
  return list;
}

/**
 * Sets which media features are present, e.g. `['(prefers-reduced-motion: reduce)']`,
 * and notifies listeners of every query whose result changed.
 */
export function setMediaFeatures(features: readonly string[]): void {
  mediaFeatures = new Set(features);
  for (const [query, list] of mediaQueryLists) list.setMatches(evaluate(query));
}

/** Framer Motion asks for '(prefers-reduced-motion)'; the app's own code asks for ': reduce'. */
export const REDUCED_MOTION = ['(prefers-reduced-motion: reduce)', '(prefers-reduced-motion)'] as const;
/** A desktop with a mouse: wide, hover-capable and precise. */
export const DESKTOP_MOUSE = ['(min-width: 768px)', '(hover: hover)', '(pointer: fine)'] as const;
export const TOUCH_SCREEN = ['(hover: none)', '(pointer: coarse)'] as const;

export class FakeIntersectionObserver implements IntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[] = [0];
  readonly observed = new Set<Element>();

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.rootMargin = options?.rootMargin ?? '0px';
    FakeIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.observed.add(target);
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Reports `target` entering (or leaving) the observed area to every observer watching it. */
  static intersect(target: Element, isIntersecting = true): void {
    for (const observer of FakeIntersectionObserver.instances) {
      if (!observer.observed.has(target)) continue;
      const entry = { target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 };
      observer.callback([entry as IntersectionObserverEntry], observer);
    }
  }
}
