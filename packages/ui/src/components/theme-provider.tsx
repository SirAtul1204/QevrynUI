import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type Theme = 'dark' | 'light' | 'system';
export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> { theme?: Theme }

/** Scoped theme boundary. Defaults to dark; nested providers can override the theme. */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(
  ({ theme = 'dark', className, ...props }, ref) => (
    <div {...props} ref={ref} data-theme={theme} className={cn('q-theme', className)} />
  ),
);
ThemeProvider.displayName = 'ThemeProvider';
