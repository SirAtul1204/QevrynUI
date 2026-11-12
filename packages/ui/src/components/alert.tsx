import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';
import { MessageCloseIcon, MessageIcon, messageLabels, type MessageAppearance, type MessageVariant } from './message';

export type AlertProps = HTMLAttributes<HTMLDivElement> & { variant?: MessageVariant; appearance?: MessageAppearance; icon?: ReactNode | false };
export const Alert = forwardRef<HTMLDivElement, AlertProps>(({ variant = 'info', appearance = 'satin', icon, className, children, role, ...props }, ref) => (
  <div {...props} ref={ref} role={role ?? (variant === 'error' ? 'alert' : 'status')} data-variant={variant} data-appearance={appearance} className={cn('q-message q-alert', className)}>
    {icon !== false && <span className="q-message-icon" aria-hidden="true">{icon ?? <MessageIcon variant={variant} />}</span>}
    <div className="q-message-body"><span className="q:sr-only">{messageLabels[variant]}: </span>{children}</div>
  </div>
));
Alert.displayName = 'Alert';
export type AlertTitleProps = HTMLAttributes<HTMLDivElement>;
export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q-message-title', className)} />);
AlertTitle.displayName = 'AlertTitle';
export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;
export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q-message-description', className)} />);
AlertDescription.displayName = 'AlertDescription';
export type AlertCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const AlertClose = forwardRef<HTMLButtonElement, AlertCloseProps>(({ className, children, type = 'button', 'aria-label': label = 'Dismiss alert', ...props }, ref) => <button {...props} ref={ref} type={type} aria-label={label} className={cn('q-message-close', focusRing, className)}>{children ?? <MessageCloseIcon />}</button>);
AlertClose.displayName = 'AlertClose';
