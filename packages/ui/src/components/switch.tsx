import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import * as Primitive from '@radix-ui/react-switch';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';

export type SwitchProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export const Switch = forwardRef<ComponentRef<typeof Primitive.Root>, SwitchProps>(({ className, ...props }, ref) => (
  <Primitive.Root {...props} ref={ref} className={cn('q:inline-flex q:h-6 q:w-11 q:shrink-0 q:box-border q:items-center q:rounded-full q:border q:border-solid q:border-border q:bg-control q:p-0.5 q:cursor-pointer q:transition-colors q:data-[state=checked]:border-purple q:data-[state=checked]:bg-purple q:disabled:cursor-not-allowed q:disabled:opacity-45', focusRing, className)}>
    <Primitive.Thumb className="q:block q:size-4 q:rounded-full q:bg-muted q:transition-transform q:data-[state=checked]:translate-x-5 q:data-[state=checked]:bg-on-accent" />
  </Primitive.Root>
));
Switch.displayName = 'Switch';
