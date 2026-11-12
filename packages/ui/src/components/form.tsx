import { forwardRef, useEffect, useImperativeHandle, useRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type LabelHTMLAttributes, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { fieldStyles, focusRing } from '../lib/styles';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => <input {...props} type={type} ref={ref} className={cn(fieldStyles, focusRing, className)} />);
Input.displayName = 'Input';
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, rows = 4, ...props }, ref) => <textarea {...props} rows={rows} ref={ref} className={cn(fieldStyles, focusRing, 'q:resize-y', className)} />);
Textarea.displayName = 'Textarea';
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
/** Native select: keeps platform keyboard, touch, and form submission behavior. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => <select {...props} ref={ref} className={cn(fieldStyles, focusRing, 'q:min-h-11 q:cursor-pointer', className)} />);
Select.displayName = 'Select';
export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => <label {...props} ref={ref} className={cn('q:block q:text-sm q:font-medium q:text-foreground', className)} />);
Label.displayName = 'Label';
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { indeterminate?: boolean };
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, indeterminate = false, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate; }, [indeterminate]);
  return <input {...props} ref={inputRef} type="checkbox" aria-checked={indeterminate ? 'mixed' : props['aria-checked']} className={cn('q-checkbox q:relative q:m-0 q:size-5 q:shrink-0 q:appearance-none q:rounded-md q:border q:border-solid q:border-border q:bg-control q:cursor-pointer q:transition-colors q:checked:border-purple q:checked:bg-purple q:indeterminate:border-purple q:indeterminate:bg-purple q:aria-invalid:border-danger q:disabled:cursor-not-allowed q:disabled:opacity-45', focusRing, className)} />;
});
Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> { label: ReactNode; description?: ReactNode }
export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(({ label, description, className, children, ...props }, ref) => (
  <fieldset {...props} ref={ref} className={cn('q:m-0 q:min-w-0 q:rounded-2xl q:border q:border-solid q:border-border q:bg-surface q:p-5', className)}>
    <legend className="q:px-2 q:text-sm q:font-medium q:text-foreground">{label}</legend>
    {description && <p className="q:mt-0 q:mb-4 q:text-xs q:text-muted">{description}</p>}
    <div className="q:grid q:gap-3">{children}</div>
  </fieldset>
));
CheckboxGroup.displayName = 'CheckboxGroup';
