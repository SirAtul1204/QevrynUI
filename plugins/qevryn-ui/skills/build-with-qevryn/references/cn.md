# Class merging

Version: @qevryn/ui 0.1.0.

Compiled CSS only contains utilities used by the library. Arbitrary q: utilities need a matching consumer Tailwind configuration; prefer native style/CSS for custom app styling.

```tsx
import { ThemeProvider, cn } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><div className={cn("q:flex", "q:gap-3")}>Compose existing generated utilities.</div></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ClassValue } from 'clsx';
/** Merge Qevryn's prefixed Tailwind utilities; consumer classes remain intact. */
export declare function cn(...inputs: ClassValue[]): string;

```
