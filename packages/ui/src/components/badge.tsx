import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva('q:inline-flex q:items-center q:gap-1.5 q:rounded-md q:px-2.5 q:py-1 q:text-xs q:font-medium', {
  variants: { variant: { satin: 'q:bg-pink/12 q:text-pink', neutral: 'q:bg-control q:text-muted', success: 'q:bg-success/12 q:text-success', danger: 'q:bg-danger/12 q:text-danger', outline: 'q:border q:border-solid q:border-border q:text-foreground' } },
  defaultVariants: { variant: 'satin' },
});
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => <span {...props} ref={ref} className={cn(badgeVariants({ variant }), className)} />);
Badge.displayName = 'Badge';
