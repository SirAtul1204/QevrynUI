# Alerts

Version: @qevryn/ui 0.1.0.

Application state removes dismissed alerts; AlertClose does not hide its parent automatically. Errors default to assertive alert; other severities use polite status. Appearance: satin or outline.

```tsx
import { ThemeProvider, Alert, AlertTitle, AlertDescription, AlertClose } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Alert variant="warning"><AlertTitle>Storage almost full</AlertTitle><AlertDescription>Make room before your next upload.</AlertDescription><AlertClose aria-label="Dismiss storage warning" onClick={() => {}} /></Alert></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { type MessageAppearance, type MessageVariant } from './message';
export type AlertProps = HTMLAttributes<HTMLDivElement> & {
    variant?: MessageVariant;
    appearance?: MessageAppearance;
    icon?: ReactNode | false;
};
export declare const Alert: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    variant?: MessageVariant;
    appearance?: MessageAppearance;
    icon?: ReactNode | false;
} & import("react").RefAttributes<HTMLDivElement>>;
export type AlertTitleProps = HTMLAttributes<HTMLDivElement>;
export declare const AlertTitle: import("react").ForwardRefExoticComponent<AlertTitleProps & import("react").RefAttributes<HTMLDivElement>>;
export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;
export declare const AlertDescription: import("react").ForwardRefExoticComponent<AlertDescriptionProps & import("react").RefAttributes<HTMLDivElement>>;
export type AlertCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;
export declare const AlertClose: import("react").ForwardRefExoticComponent<AlertCloseProps & import("react").RefAttributes<HTMLButtonElement>>;

```
