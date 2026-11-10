import 'react';

declare module 'react' {
  interface CSSProperties {
    /** CSS custom properties such as `--book-accent`, which React passes straight to the style attribute. */
    [customProperty: `--${string}`]: string | number;
  }
}
