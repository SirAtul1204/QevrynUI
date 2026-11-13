# Badges

Version: @qevryn/ui 0.1.0.

Variants: satin, neutral, success, danger, outline. Badge is not interactive.

```tsx
import { ThemeProvider, Badge, HStack } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><HStack><Badge>New</Badge><Badge variant="success">Connected</Badge><Badge variant="danger">Needs attention</Badge></HStack></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type HTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const badgeVariants: (props?: ({
    variant?: "success" | "satin" | "outline" | "danger" | "neutral" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
export declare const Badge: import("react").ForwardRefExoticComponent<BadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
export {};

```
