# Links

Version: @qevryn/ui 0.1.0.

Use Link for navigation and Button for actions.

```tsx
import { ThemeProvider, Link } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Link href="#overview" variant="underline">Read overview</Link></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type AnchorHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const linkVariants: (props?: ({
    variant?: "default" | "underline" | "muted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
}
export declare const Link: import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
export {};

```
