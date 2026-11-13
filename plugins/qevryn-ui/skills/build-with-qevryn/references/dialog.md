# Dialogs

Version: @qevryn/ui 0.1.0.

Content already creates portal, backdrop and close icon; use overlayProps rather than adding another overlay. Include Title and Description, or set aria-describedby=undefined when omitting Description. Use asChild on Trigger/Close, not Content. Close after successful form save with controlled open state.

```tsx
import { ThemeProvider, Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription, Button, Input, Label } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Dialog><DialogTrigger asChild><Button>Edit workspace</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit workspace</DialogTitle><DialogDescription>Update your workspace details.</DialogDescription></DialogHeader><DialogBody><Label htmlFor="workspace-name">Name</Label><Input id="workspace-name" defaultValue="Stellar workspace" /></DialogBody><DialogFooter><DialogClose asChild><Button>Done</Button></DialogClose></DialogFooter></DialogContent></Dialog></ThemeProvider>;
}

```

## Actual public declarations

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
