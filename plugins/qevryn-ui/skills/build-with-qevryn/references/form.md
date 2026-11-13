# Native forms

Version: @qevryn/ui 0.1.0.

Label every field; wire helper/errors with aria-describedby and invalid fields with aria-invalid. Checkbox uses native checked/onChange, not onCheckedChange. Indeterminate is a separate prop.

```tsx
import { ThemeProvider, Input, Textarea, Select, Label, Checkbox, CheckboxGroup, VStack } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><VStack gap={4}><div><Label htmlFor="name">Project name</Label><Input id="name" name="name" required /></div><div><Label htmlFor="notes">Notes</Label><Textarea id="notes" /></div><div><Label htmlFor="environment">Environment</Label><Select id="environment" defaultValue="dev"><option value="dev">Development</option><option value="prod">Production</option></Select></div><CheckboxGroup label="Updates"><label><Checkbox name="updates" defaultChecked /> Release notes</label><label><Checkbox indeterminate /> All categories</label></CheckboxGroup></VStack></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type LabelHTMLAttributes, type FieldsetHTMLAttributes, type ReactNode } from 'react';
export type InputProps = InputHTMLAttributes<HTMLInputElement>;
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
/** Native select: keeps platform keyboard, touch, and form submission behavior. */
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export declare const Label: import("react").ForwardRefExoticComponent<LabelProps & import("react").RefAttributes<HTMLLabelElement>>;
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    indeterminate?: boolean;
};
export declare const Checkbox: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    indeterminate?: boolean;
} & import("react").RefAttributes<HTMLInputElement>>;
export interface CheckboxGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    label: ReactNode;
    description?: ReactNode;
}
export declare const CheckboxGroup: import("react").ForwardRefExoticComponent<CheckboxGroupProps & import("react").RefAttributes<HTMLFieldSetElement>>;

```
