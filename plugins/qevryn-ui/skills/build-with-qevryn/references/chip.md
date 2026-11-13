# Chips

Version: @qevryn/ui 0.1.0.

ChipButton is a controlled toggle with selected; provide application state in real apps. Put ChipRemoveButton inside Chip, never inside ChipButton. A remove button needs an accessible label and application removal logic.

```tsx
import { ThemeProvider, Chip, ChipButton, ChipRemoveButton, HStack } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><HStack><Chip>TypeScript<ChipRemoveButton aria-label="Remove TypeScript" onClick={() => {}} /></Chip><ChipButton selected={true} onClick={() => {}}>React</ChipButton><Chip variant="outline" size="sm">Draft</Chip></HStack></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type HTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const chipVariants: (props?: ({
    variant?: "satin" | "outline" | "neutral" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {
}
/** Display chip; compose with ChipRemoveButton for a removable token. */
export declare const Chip: import("react").ForwardRefExoticComponent<ChipProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> {
    selected?: boolean;
}
/** A controlled toggle chip. Its accessible name comes from its children. */
export declare const ChipButton: import("react").ForwardRefExoticComponent<ChipButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface ChipRemoveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    'aria-label': string;
}
export declare const ChipRemoveButton: import("react").ForwardRefExoticComponent<ChipRemoveButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};

```
