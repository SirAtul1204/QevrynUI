import { createContext, forwardRef, useCallback, useContext, useId, useMemo, useRef, useState, type ComponentPropsWithoutRef, type ComponentRef, type ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-toast';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';
import { MessageCloseIcon, MessageIcon, messageLabels, type MessageAppearance, type MessageVariant } from './message';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastProps = ComponentPropsWithoutRef<typeof Primitive.Root> & { variant?: MessageVariant; appearance?: MessageAppearance; icon?: ReactNode | false };
export const Toast = forwardRef<ComponentRef<typeof Primitive.Root>, ToastProps>(({ variant = 'info', appearance = 'satin', icon, type = 'background', className, children, ...props }, ref) => (
  <Primitive.Root {...props} ref={ref} type={type} data-variant={variant} data-appearance={appearance} className={cn('q-message q-toast', className)}>
    {icon !== false && <span className="q-message-icon" aria-hidden="true">{icon ?? <MessageIcon variant={variant} />}</span>}
    <div className="q-message-body"><span className="q:sr-only">{messageLabels[variant]}: </span>{children}</div>
  </Primitive.Root>
));
Toast.displayName = 'Toast';
export type ToastTitleProps = ComponentPropsWithoutRef<typeof Primitive.Title>;
export const ToastTitle = forwardRef<ComponentRef<typeof Primitive.Title>, ToastTitleProps>(({ className, ...props }, ref) => <Primitive.Title {...props} ref={ref} className={cn('q-message-title', className)} />);
ToastTitle.displayName = 'ToastTitle';
export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof Primitive.Description>;
export const ToastDescription = forwardRef<ComponentRef<typeof Primitive.Description>, ToastDescriptionProps>(({ className, ...props }, ref) => <Primitive.Description {...props} ref={ref} className={cn('q-message-description', className)} />);
ToastDescription.displayName = 'ToastDescription';
export type ToastCloseProps = ComponentPropsWithoutRef<typeof Primitive.Close>;
export const ToastClose = forwardRef<ComponentRef<typeof Primitive.Close>, ToastCloseProps>(({ className, children, 'aria-label': label = 'Dismiss notification', ...props }, ref) => <Primitive.Close type="button" {...props} ref={ref} aria-label={label} className={cn('q-message-close', focusRing, className)}>{children ?? <MessageCloseIcon />}</Primitive.Close>);
ToastClose.displayName = 'ToastClose';
export type ToastActionProps = ComponentPropsWithoutRef<typeof Primitive.Action>;
export const ToastAction = forwardRef<ComponentRef<typeof Primitive.Action>, ToastActionProps>(({ className, ...props }, ref) => <Primitive.Action type="button" {...props} ref={ref} className={cn('q-message-action', focusRing, className)} />);
ToastAction.displayName = 'ToastAction';
export type ToastViewportProps = ComponentPropsWithoutRef<typeof Primitive.Viewport> & { position?: ToastPosition };
export const ToastViewport = forwardRef<ComponentRef<typeof Primitive.Viewport>, ToastViewportProps>(({ position = 'bottom-right', className, ...props }, ref) => <Primitive.Viewport {...props} ref={ref} data-position={position} className={cn('q-toast-viewport', className)} />);
ToastViewport.displayName = 'ToastViewport';

export type ToastOptions = Pick<ToastProps, 'variant' | 'appearance' | 'icon' | 'duration' | 'type'> & {
  title: ReactNode;
  description?: ReactNode;
  action?: { label: ReactNode; altText: string; onClick: () => void };
};
export type ToastId = string;
export type ToastApi = { toast: (options: ToastOptions) => ToastId; dismiss: (id?: ToastId) => void };
const ToastContext = createContext<ToastApi | null>(null);
export type ToastProviderProps = ComponentPropsWithoutRef<typeof Primitive.Provider> & {
  position?: ToastPosition;
  /** Maximum visible managed toasts; additional notifications wait in order. */
  maxVisible?: number;
  /** Disable only when rendering your own ToastViewport inside this provider. */
  viewport?: boolean;
  viewportProps?: Omit<ToastViewportProps, 'position' | 'children'>;
};
export function ToastProvider({ children, position = 'bottom-right', maxVisible = 3, duration = 5000, swipeDirection, viewport = true, viewportProps, ...props }: ToastProviderProps) {
  if (!Number.isInteger(maxVisible) || maxVisible < 1) throw new RangeError('ToastProvider maxVisible must be a positive integer.');
  const prefix = useId();
  const counter = useRef(0);
  const [items, setItems] = useState<Array<ToastOptions & { id: ToastId }>>([]);
  const toast = useCallback((options: ToastOptions) => {
    const id = `${prefix}-${++counter.current}`;
    setItems(previous => [...previous, { ...options, id }]);
    return id;
  }, [prefix]);
  const dismiss = useCallback((id?: ToastId) => setItems(previous => id === undefined ? [] : previous.filter(item => item.id !== id)), []);
  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  const direction = swipeDirection ?? (position.endsWith('left') ? 'left' : position.endsWith('right') ? 'right' : position.startsWith('top') ? 'up' : 'down');
  return <ToastContext.Provider value={api}><Primitive.Provider {...props} duration={duration} swipeDirection={direction}>
    {children}
    {items.slice(0, maxVisible).map(({ id, title, description, action, ...options }) => <Toast {...options} key={id} open onOpenChange={open => { if (!open) dismiss(id); }}>
      <ToastTitle>{title}</ToastTitle>
      {description !== undefined && <ToastDescription>{description}</ToastDescription>}
      {action && <ToastAction altText={action.altText} onClick={action.onClick}>{action.label}</ToastAction>}
      <ToastClose />
    </Toast>)}
    {viewport && <ToastViewport {...viewportProps} position={position} />}
  </Primitive.Provider></ToastContext.Provider>;
}
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used inside ToastProvider.');
  return api;
}
