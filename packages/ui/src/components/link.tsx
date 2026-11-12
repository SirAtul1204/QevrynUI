import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';

const linkVariants = cva(`q:rounded-sm q:underline-offset-4 q:transition-colors ${focusRing}`, {
  variants: { variant: { default: 'q:text-pink q:no-underline q:decoration-pink/50 q:hover:underline', muted: 'q:text-muted q:no-underline q:hover:text-foreground q:hover:underline', underline: 'q:text-pink q:underline q:decoration-pink/50 q:hover:decoration-pink' } },
  defaultVariants: { variant: 'default' },
});
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ variant, className, target, rel, ...props }, ref) => (
  <a {...props} ref={ref} target={target} rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)} className={cn(linkVariants({ variant }), className)} />
));
Link.displayName = 'Link';
