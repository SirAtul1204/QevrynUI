# Drawers

Version: @qevryn/ui 0.1.0.

Sides: left/right/top/bottom. Default right. Include DrawerTitle. Content handles portal/backdrop. Left/right use full height; top/bottom are content-height capped at 85dvh. No drag gesture API.

```tsx
import { ThemeProvider, Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription, Button } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Drawer><DrawerTrigger asChild><Button>Open preferences</Button></DrawerTrigger><DrawerContent side="right" size="sm"><DrawerHeader><DrawerTitle>Preferences</DrawerTitle><DrawerDescription>Tune your workspace.</DrawerDescription></DrawerHeader><DrawerBody>Workspace settings</DrawerBody><DrawerFooter><DrawerClose asChild><Button>Done</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer></ThemeProvider>;
}

```

## Actual public declarations

```ts
import * as Primitive from '@radix-ui/react-dialog';
import { Dialog, type DialogProps, type DialogContentProps } from './dialog';
export { type DialogTriggerProps as DrawerTriggerProps, type DialogCloseProps as DrawerCloseProps, type DialogTitleProps as DrawerTitleProps, type DialogDescriptionProps as DrawerDescriptionProps, type DialogHeaderProps as DrawerHeaderProps, type DialogBodyProps as DrawerBodyProps, type DialogFooterProps as DrawerFooterProps } from './dialog';
export type DrawerProps = DialogProps;
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerContentProps = DialogContentProps & {
    side?: DrawerSide;
};
export declare const Drawer: typeof Dialog;
export declare const DrawerTrigger: import("react").ForwardRefExoticComponent<Primitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DrawerClose: import("react").ForwardRefExoticComponent<Primitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DrawerTitle: import("react").ForwardRefExoticComponent<Omit<Primitive.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
export declare const DrawerDescription: import("react").ForwardRefExoticComponent<Omit<Primitive.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
export declare const DrawerHeader: import("react").ForwardRefExoticComponent<import("./dialog").DialogHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DrawerBody: import("react").ForwardRefExoticComponent<import("./dialog").DialogBodyProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DrawerFooter: import("react").ForwardRefExoticComponent<import("./dialog").DialogFooterProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DrawerContent: import("react").ForwardRefExoticComponent<Omit<Omit<Primitive.DialogContentProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "asChild"> & {
    container?: HTMLElement;
    size?: "sm" | "md" | "lg" | "full";
    showClose?: boolean;
    closeLabel?: string;
    overlayProps?: import("./dialog").DialogOverlayProps;
} & {
    side?: DrawerSide;
} & import("react").RefAttributes<HTMLDivElement>>;

```

```ts
import { type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import * as Primitive from '@radix-ui/react-dialog';
export type DialogProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export declare function Dialog({ children, modal, ...props }: DialogProps): import("react").JSX.Element;
export declare const DialogTrigger: import("react").ForwardRefExoticComponent<Primitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DialogClose: import("react").ForwardRefExoticComponent<Primitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger>;
export type DialogCloseProps = ComponentPropsWithoutRef<typeof Primitive.Close>;
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof Primitive.Overlay>;
export declare const DialogOverlay: import("react").ForwardRefExoticComponent<Omit<Primitive.DialogOverlayProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type DialogContentProps = Omit<ComponentPropsWithoutRef<typeof Primitive.Content>, 'asChild'> & {
    container?: HTMLElement;
    size?: 'sm' | 'md' | 'lg' | 'full';
    showClose?: boolean;
    closeLabel?: string;
    overlayProps?: DialogOverlayProps;
};
/** Shared panel for Dialog and Drawer; preserves Radix focus and dismissal props. */
export declare const OverlayPanel: import("react").ForwardRefExoticComponent<Omit<Omit<Primitive.DialogContentProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "asChild"> & {
    container?: HTMLElement;
    size?: "sm" | "md" | "lg" | "full";
    showClose?: boolean;
    closeLabel?: string;
    overlayProps?: DialogOverlayProps;
} & {
    edge?: "left" | "right" | "top" | "bottom";
} & import("react").RefAttributes<HTMLDivElement>>;
export declare const DialogContent: import("react").ForwardRefExoticComponent<Omit<Omit<Primitive.DialogContentProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "asChild"> & {
    container?: HTMLElement;
    size?: "sm" | "md" | "lg" | "full";
    showClose?: boolean;
    closeLabel?: string;
    overlayProps?: DialogOverlayProps;
} & import("react").RefAttributes<HTMLDivElement>>;
export type DialogTitleProps = ComponentPropsWithoutRef<typeof Primitive.Title>;
export declare const DialogTitle: import("react").ForwardRefExoticComponent<Omit<Primitive.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof Primitive.Description>;
export declare const DialogDescription: import("react").ForwardRefExoticComponent<Omit<Primitive.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogBodyProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
export declare const DialogHeader: import("react").ForwardRefExoticComponent<DialogHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DialogBody: import("react").ForwardRefExoticComponent<DialogBodyProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DialogFooter: import("react").ForwardRefExoticComponent<DialogFooterProps & import("react").RefAttributes<HTMLDivElement>>;

```
