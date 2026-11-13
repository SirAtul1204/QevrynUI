# Cards

Version: @qevryn/ui 0.1.0.

Variants: satin, elevated, outline. Compose semantic headings as needed; do not make the entire card interactive when it contains independent controls.

```tsx
import { ThemeProvider, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Card variant="elevated"><CardHeader><CardTitle>Stellar workspace</CardTitle><CardDescription>Your next idea starts here.</CardDescription></CardHeader><CardContent>24 active modules</CardContent><CardFooter><Button>Open workspace</Button></CardFooter></Card></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type HTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const cardVariants: (props?: ({
    variant?: "satin" | "outline" | "elevated" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}
export declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardHeader: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardTitle: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & import("react").RefAttributes<HTMLHeadingElement>>;
export declare const CardDescription: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & import("react").RefAttributes<HTMLParagraphElement>>;
export declare const CardContent: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardFooter: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export {};

```
