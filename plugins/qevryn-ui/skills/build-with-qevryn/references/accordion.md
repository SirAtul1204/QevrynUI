# Accordions

Version: @qevryn/ui 0.1.0.

Single mode uses string value; multiple mode uses string arrays. Each item needs a unique value. Triggers support icon and headingLevel.

```tsx
import { ThemeProvider, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Accordion type="single" collapsible defaultValue="install"><AccordionItem value="install"><AccordionTrigger>How do I install Qevryn?</AccordionTrigger><AccordionContent>Install @qevryn/ui, import the CSS, and use ThemeProvider.</AccordionContent></AccordionItem><AccordionItem value="theme"><AccordionTrigger>Can I use light mode?</AccordionTrigger><AccordionContent>Set the provider theme to light or system.</AccordionContent></AccordionItem></Accordion></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-accordion';
export type AccordionProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export declare const Accordion: import("react").ForwardRefExoticComponent<AccordionProps & import("react").RefAttributes<HTMLDivElement>>;
export type AccordionItemProps = ComponentPropsWithoutRef<typeof Primitive.Item> & {
    variant?: 'satin' | 'outline';
};
export declare const AccordionItem: import("react").ForwardRefExoticComponent<Omit<Primitive.AccordionItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & {
    variant?: "satin" | "outline";
} & import("react").RefAttributes<HTMLDivElement>>;
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger> & {
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    icon?: ReactNode;
};
export declare const AccordionTrigger: import("react").ForwardRefExoticComponent<Omit<Primitive.AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & {
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    icon?: ReactNode;
} & import("react").RefAttributes<HTMLButtonElement>>;
export type AccordionContentProps = ComponentPropsWithoutRef<typeof Primitive.Content>;
export declare const AccordionContent: import("react").ForwardRefExoticComponent<Omit<Primitive.AccordionContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;

```
