import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const cardVariants = cva('q:rounded-2xl q:border q:border-solid q:border-border q:text-foreground', {
  variants: { variant: { satin: 'q:bg-surface q:shadow-satin', elevated: 'q:bg-linear-to-br q:from-purple/8 q:to-surface q:bg-surface q:shadow-satin', outline: 'q:bg-transparent' } },
  defaultVariants: { variant: 'satin' },
});
export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => <div {...props} ref={ref} className={cn(cardVariants({ variant }), className)} />);
Card.displayName = 'Card';
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q:flex q:flex-col q:gap-1.5 q:p-6', className)} />);
CardHeader.displayName = 'CardHeader';
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 {...props} ref={ref} className={cn('q:m-0 q:text-lg q:font-medium q:tracking-tight', className)} />);
CardTitle.displayName = 'CardTitle';
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p {...props} ref={ref} className={cn('q:m-0 q:text-sm q:text-muted', className)} />);
CardDescription.displayName = 'CardDescription';
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q:px-6 q:pb-6', className)} />);
CardContent.displayName = 'CardContent';
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q:flex q:items-center q:gap-3 q:px-6 q:pb-6', className)} />);
CardFooter.displayName = 'CardFooter';
