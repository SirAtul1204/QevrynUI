# Tooltips

Version: @qevryn/ui 0.1.0.

Provider configures delay (400ms default). Content handles its portal, arrow, and collisions. Provide icon-only trigger names. Essential instructions must remain visible for touch users; no interactive tooltip content.

```tsx
import { ThemeProvider, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline" aria-label="Help">?</Button></TooltipTrigger><TooltipContent side="top">Keep this hint short and non-interactive.</TooltipContent></Tooltip></TooltipProvider></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ComponentPropsWithoutRef } from 'react';
import * as Primitive from '@radix-ui/react-tooltip';
export type TooltipProviderProps = ComponentPropsWithoutRef<typeof Primitive.Provider>;
export declare function TooltipProvider({ delayDuration, ...props }: TooltipProviderProps): import("react").JSX.Element;
export type TooltipProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export declare function Tooltip({ children, ...props }: TooltipProps): import("react").JSX.Element;
export declare const TooltipTrigger: import("react").ForwardRefExoticComponent<Primitive.TooltipTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger>;
export type TooltipContentProps = Omit<ComponentPropsWithoutRef<typeof Primitive.Content>, 'asChild'> & {
    container?: HTMLElement;
    showArrow?: boolean;
};
export declare const TooltipContent: import("react").ForwardRefExoticComponent<Omit<Omit<Primitive.TooltipContentProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "asChild"> & {
    container?: HTMLElement;
    showArrow?: boolean;
} & import("react").RefAttributes<HTMLDivElement>>;

```
