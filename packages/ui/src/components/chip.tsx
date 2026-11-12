import { forwardRef, type HTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';

const chipVariants = cva('q:inline-flex q:box-border q:items-center q:gap-2 q:rounded-full q:border q:border-solid q:font-medium', {
  variants: {
    variant: { satin: 'q:border-purple/35 q:bg-purple/10 q:text-pink', neutral: 'q:border-border q:bg-control q:text-muted', outline: 'q:border-border q:bg-transparent q:text-foreground' },
    size: { sm: 'q:min-h-7 q:px-2.5 q:py-1 q:text-xs', md: 'q:min-h-9 q:px-3.5 q:py-1.5 q:text-sm' },
  },
  defaultVariants: { variant: 'satin', size: 'md' },
});
export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {}
/** Display chip; compose with ChipRemoveButton for a removable token. */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(({ className, variant, size, ...props }, ref) => <span {...props} ref={ref} className={cn(chipVariants({ variant, size }), className)} />);
Chip.displayName = 'Chip';
export interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> { selected?: boolean }
/** A controlled toggle chip. Its accessible name comes from its children. */
export const ChipButton = forwardRef<HTMLButtonElement, ChipButtonProps>(({ className, variant, size, selected = false, type = 'button', ...props }, ref) => (
  <button {...props} ref={ref} type={type} aria-pressed={selected} className={cn(chipVariants({ variant, size }), focusRing, 'q:cursor-pointer q:transition-colors q:hover:border-pink q:aria-pressed:border-pink/60 q:aria-pressed:bg-pink/12 q:aria-pressed:text-pink q:aria-pressed:shadow-glow q:disabled:cursor-not-allowed q:disabled:opacity-45', className)} />
));
ChipButton.displayName = 'ChipButton';
export interface ChipRemoveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 'aria-label': string }
export const ChipRemoveButton = forwardRef<HTMLButtonElement, ChipRemoveButtonProps>(({ className, children, type = 'button', ...props }, ref) => (
  <button {...props} ref={ref} type={type} className={cn('q:inline-flex q:size-6 q:shrink-0 q:items-center q:justify-center q:rounded-full q:border-0 q:bg-transparent q:p-0 q:text-current q:cursor-pointer q:hover:bg-purple/20 q:disabled:cursor-not-allowed q:disabled:opacity-45', focusRing, className)}>{children ?? <span aria-hidden="true">×</span>}</button>
));
ChipRemoveButton.displayName = 'ChipRemoveButton';
