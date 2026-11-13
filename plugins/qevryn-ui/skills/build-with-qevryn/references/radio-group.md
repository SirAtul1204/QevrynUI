# Radio groups

Version: @qevryn/ui 0.1.0.

Give the group a name and accessible label. Label each item. Controlled values use onValueChange.

```tsx
import { ThemeProvider, RadioGroup, RadioGroupItem } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><RadioGroup name="plan" defaultValue="team" aria-label="Plan"><label><RadioGroupItem value="personal" /> Personal</label><label><RadioGroupItem value="team" /> Team</label></RadioGroup></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type ComponentPropsWithoutRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';
export type RadioGroupProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export declare const RadioGroup: import("react").ForwardRefExoticComponent<Omit<Primitive.RadioGroupProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof Primitive.Item>;
export declare const RadioGroupItem: import("react").ForwardRefExoticComponent<Omit<Primitive.RadioGroupItemProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;

```
