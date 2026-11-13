# Toast notifications

Version: @qevryn/ui 0.1.0.

Place ToastProvider inside ThemeProvider. It includes its viewport; do not add another unless viewport=false. useToast returns toast(options) and dismiss(id?). Root type is announcement priority (background/foreground); severity is variant. MaxVisible queues managed messages. Infinity keeps a toast open.

```tsx
import { ThemeProvider, ToastProvider, useToast, Button } from '@qevryn/ui';
import '@qevryn/ui/styles.css';

function NotifyButton() { const { toast } = useToast(); return <Button onClick={() => toast({ variant: "success", title: "Workspace saved", description: "Your latest changes are ready." })}>Save workspace</Button>; }
export default function Example() {
  return <ThemeProvider theme="dark"><ToastProvider><NotifyButton /></ToastProvider></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-toast';
import { type MessageAppearance, type MessageVariant } from './message';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastProps = ComponentPropsWithoutRef<typeof Primitive.Root> & {
    variant?: MessageVariant;
    appearance?: MessageAppearance;
    icon?: ReactNode | false;
};
export declare const Toast: import("react").ForwardRefExoticComponent<Omit<Primitive.ToastProps & import("react").RefAttributes<HTMLLIElement>, "ref"> & {
    variant?: MessageVariant;
    appearance?: MessageAppearance;
    icon?: ReactNode | false;
} & import("react").RefAttributes<HTMLLIElement>>;
export type ToastTitleProps = ComponentPropsWithoutRef<typeof Primitive.Title>;
export declare const ToastTitle: import("react").ForwardRefExoticComponent<Omit<Primitive.ToastTitleProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof Primitive.Description>;
export declare const ToastDescription: import("react").ForwardRefExoticComponent<Omit<Primitive.ToastDescriptionProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type ToastCloseProps = ComponentPropsWithoutRef<typeof Primitive.Close>;
export declare const ToastClose: import("react").ForwardRefExoticComponent<Omit<Primitive.ToastCloseProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export type ToastActionProps = ComponentPropsWithoutRef<typeof Primitive.Action>;
export declare const ToastAction: import("react").ForwardRefExoticComponent<Omit<Primitive.ToastActionProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export type ToastViewportProps = ComponentPropsWithoutRef<typeof Primitive.Viewport> & {
    position?: ToastPosition;
};
export declare const ToastViewport: import("react").ForwardRefExoticComponent<Omit<Primitive.ToastViewportProps & import("react").RefAttributes<HTMLOListElement>, "ref"> & {
    position?: ToastPosition;
} & import("react").RefAttributes<HTMLOListElement>>;
export type ToastOptions = Pick<ToastProps, 'variant' | 'appearance' | 'icon' | 'duration' | 'type'> & {
    title: ReactNode;
    description?: ReactNode;
    action?: {
        label: ReactNode;
        altText: string;
        onClick: () => void;
    };
};
export type ToastId = string;
export type ToastApi = {
    toast: (options: ToastOptions) => ToastId;
    dismiss: (id?: ToastId) => void;
};
export type ToastProviderProps = ComponentPropsWithoutRef<typeof Primitive.Provider> & {
    position?: ToastPosition;
    /** Maximum visible managed toasts; additional notifications wait in order. */
    maxVisible?: number;
    /** Disable only when rendering your own ToastViewport inside this provider. */
    viewport?: boolean;
    viewportProps?: Omit<ToastViewportProps, 'position' | 'children'>;
};
export declare function ToastProvider({ children, position, maxVisible, duration, swipeDirection, viewport, viewportProps, ...props }: ToastProviderProps): import("react").JSX.Element;
export declare function useToast(): ToastApi;

```
