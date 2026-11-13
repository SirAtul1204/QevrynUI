# Themes

Version: @qevryn/ui 0.1.0.

Import @qevryn/ui/styles.css once. ThemeProvider wraps components and owns scoped tokens; use dark/light/system. The canvas background is opt-in.

```tsx
import { ThemeProvider } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><div style={{ background: "var(--qv-canvas)", padding: "1rem" }}>Prism Satin defaults to dark.</div></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type HTMLAttributes } from 'react';
export type Theme = 'dark' | 'light' | 'system';
export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
    theme?: Theme;
}
/** Scoped theme boundary. Defaults to dark; nested providers can override the theme. */
export declare const ThemeProvider: import("react").ForwardRefExoticComponent<ThemeProviderProps & import("react").RefAttributes<HTMLDivElement>>;

```
