import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';

export const buttonVariants = cva(
  `q:inline-flex q:box-border q:items-center q:justify-center q:gap-2 q:rounded-xl q:border q:border-solid q:font-medium q:cursor-pointer q:transition-colors q:disabled:cursor-not-allowed q:disabled:opacity-45 q:disabled:shadow-none ${focusRing}`,
  {
    variants: {
      variant: {
        satin: 'q:border-transparent q:bg-linear-to-br q:from-pink q:to-purple q:text-on-accent q:shadow-glow q:hover:brightness-110',
        solid: 'q:border-transparent q:bg-purple q:text-on-accent q:hover:brightness-110',
        outline: 'q:border-border q:bg-transparent q:text-pink q:hover:border-pink q:hover:bg-pink/10',
        ghost: 'q:border-transparent q:bg-transparent q:text-foreground q:hover:bg-purple/10',
        danger: 'q:border-transparent q:bg-danger q:text-control q:hover:brightness-110',
      },
      size: { sm: 'q:min-h-9 q:px-3 q:py-1.5 q:text-xs', md: 'q:min-h-11 q:px-4 q:py-2.5 q:text-sm', lg: 'q:min-h-12 q:px-5 q:py-3 q:text-base' },
      fullWidth: { true: 'q:w-full' },
    },
    defaultVariants: { variant: 'satin', size: 'md' },
  },
);
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { loading?: boolean }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading = false, disabled, type = 'button', children, ...props }, ref) => (
    <button {...props} ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cn(buttonVariants({ variant, size, fullWidth }), className)}>
      {loading && <span aria-hidden="true" className="q-spinner q:size-4 q:shrink-0 q:rounded-full q:border-2 q:border-current q:border-r-transparent" />}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
