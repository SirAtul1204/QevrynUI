# Dropdown selects

Version: @qevryn/ui 0.1.0.

This selects a value; it is not an action menu or a searchable combobox. Use native Select when platform controls are preferred.

```tsx
import { ThemeProvider, Dropdown, DropdownTrigger, DropdownValue, DropdownContent, DropdownItem, DropdownGroup, DropdownLabel, DropdownSeparator } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Dropdown name="region" defaultValue="global"><DropdownTrigger aria-label="Deployment region"><DropdownValue placeholder="Choose a region" /></DropdownTrigger><DropdownContent><DropdownGroup><DropdownLabel>Regions</DropdownLabel><DropdownItem value="global">Global</DropdownItem><DropdownItem value="india">India</DropdownItem></DropdownGroup><DropdownSeparator /><DropdownItem value="private" disabled>Private cloud</DropdownItem></DropdownContent></Dropdown></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-select';
export type DropdownProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export declare function Dropdown(props: DropdownProps): import("react").JSX.Element;
export declare const DropdownValue: import("react").ForwardRefExoticComponent<Primitive.SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const DropdownGroup: import("react").ForwardRefExoticComponent<Primitive.SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export type DropdownValueProps = ComponentPropsWithoutRef<typeof Primitive.Value>;
export type DropdownGroupProps = ComponentPropsWithoutRef<typeof Primitive.Group>;
export type DropdownTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger> & {
    variant?: 'satin' | 'outline';
};
export declare const DropdownTrigger: import("react").ForwardRefExoticComponent<Omit<Primitive.SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & {
    variant?: "satin" | "outline";
} & import("react").RefAttributes<HTMLButtonElement>>;
export type DropdownContentProps = ComponentPropsWithoutRef<typeof Primitive.Content> & {
    container?: HTMLElement;
};
export declare const DropdownContent: import("react").ForwardRefExoticComponent<Omit<Primitive.SelectContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & {
    container?: HTMLElement;
} & import("react").RefAttributes<HTMLDivElement>>;
export type DropdownItemProps = ComponentPropsWithoutRef<typeof Primitive.Item> & {
    icon?: ReactNode;
};
export declare const DropdownItem: import("react").ForwardRefExoticComponent<Omit<Primitive.SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & {
    icon?: ReactNode;
} & import("react").RefAttributes<HTMLDivElement>>;
export type DropdownLabelProps = ComponentPropsWithoutRef<typeof Primitive.Label>;
export declare const DropdownLabel: import("react").ForwardRefExoticComponent<Omit<Primitive.SelectLabelProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type DropdownSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.Separator>;
export declare const DropdownSeparator: import("react").ForwardRefExoticComponent<Omit<Primitive.SelectSeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;

```
