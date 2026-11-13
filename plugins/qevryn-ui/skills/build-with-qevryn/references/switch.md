# Switches

Version: @qevryn/ui 0.1.0.

Use checked/onCheckedChange for controlled state, not native onChange.

```tsx
import { ThemeProvider, Switch, Label, HStack } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><HStack><Label htmlFor="notifications">Notifications</Label><Switch id="notifications" defaultChecked /></HStack></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ComponentPropsWithoutRef } from 'react';
import * as Primitive from '@radix-ui/react-switch';
export type SwitchProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export declare const Switch: import("react").ForwardRefExoticComponent<Omit<Primitive.SwitchProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;

```
