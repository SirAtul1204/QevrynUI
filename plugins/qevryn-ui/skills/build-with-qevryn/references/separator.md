# Separators

Version: @qevryn/ui 0.1.0.

Use orientation for horizontal/vertical dividers. Check the declaration for supported native props.

```tsx
import { ThemeProvider, Separator } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><div>Overview<Separator />Details</div></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type HTMLAttributes } from 'react';
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
}
export declare const Separator: import("react").ForwardRefExoticComponent<SeparatorProps & import("react").RefAttributes<HTMLDivElement>>;

```
