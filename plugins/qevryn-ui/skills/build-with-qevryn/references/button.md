# Buttons

Version: @qevryn/ui 0.1.0.

Use children for icons; put an accessible label on icon-only buttons. Default type is button. Variants: satin, solid, outline, ghost, danger. Sizes: sm, md, lg.

```tsx
import { ThemeProvider, Button, buttonVariants, HStack } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><HStack gap={3}><Button variant="satin">Create project</Button><Button variant="outline" size="sm">Cancel</Button><Button loading>Saving</Button><button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })}>Native action</button></HStack></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const buttonVariants: (props?: ({
    variant?: "satin" | "outline" | "solid" | "ghost" | "danger" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    loading?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;

```
