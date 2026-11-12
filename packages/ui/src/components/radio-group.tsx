import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';

export type RadioGroupProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export const RadioGroup = forwardRef<ComponentRef<typeof Primitive.Root>, RadioGroupProps>(({ className, ...props }, ref) => (
  <Primitive.Root {...props} ref={ref} className={cn('q:grid q:gap-3', className)} />
));
RadioGroup.displayName = 'RadioGroup';
export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof Primitive.Item>;
export const RadioGroupItem = forwardRef<ComponentRef<typeof Primitive.Item>, RadioGroupItemProps>(({ className, ...props }, ref) => (
  <Primitive.Item {...props} ref={ref} className={cn('q:inline-flex q:box-border q:size-5 q:shrink-0 q:items-center q:justify-center q:rounded-full q:border q:border-solid q:border-border q:bg-control q:p-0 q:cursor-pointer q:transition-colors q:data-[state=checked]:border-purple q:data-[state=checked]:shadow-glow q:aria-invalid:border-danger q:disabled:cursor-not-allowed q:disabled:opacity-45', focusRing, className)}>
    <Primitive.Indicator className="q:size-2.5 q:rounded-full q:bg-linear-to-br q:from-pink q:to-purple" />
  </Primitive.Item>
));
RadioGroupItem.displayName = 'RadioGroupItem';
