import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> { orientation?: 'horizontal' | 'vertical'; decorative?: boolean }
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => (
  <div {...props} ref={ref} role={decorative ? 'none' : 'separator'} aria-orientation={decorative ? undefined : orientation} className={cn('q:shrink-0 q:bg-border', orientation === 'horizontal' ? 'q:h-px q:w-full' : 'q:w-px q:self-stretch', className)} />
));
Separator.displayName = 'Separator';
