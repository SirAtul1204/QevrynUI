import { forwardRef, useCallback, useState, type ComponentPropsWithoutRef, type ComponentRef, type HTMLAttributes } from 'react';
import * as Primitive from '@radix-ui/react-dialog';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';
import { OverlayScope, useOverlayScope } from '../lib/overlay-scope';
import { useModalInert } from '../lib/modal-inert';
import { MessageCloseIcon } from './message';

export type DialogProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export function Dialog({ children, modal = true, ...props }: DialogProps) {
  return <Primitive.Root {...props} modal={modal}><OverlayScope modal={modal}>{children}</OverlayScope></Primitive.Root>;
}
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger>;
export type DialogCloseProps = ComponentPropsWithoutRef<typeof Primitive.Close>;
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof Primitive.Overlay>;
export const DialogOverlay = forwardRef<ComponentRef<typeof Primitive.Overlay>, DialogOverlayProps>(({ className, ...props }, ref) => <Primitive.Overlay {...props} ref={ref} className={cn('q-overlay-backdrop', className)} />);
DialogOverlay.displayName = 'DialogOverlay';
export type DialogContentProps = Omit<ComponentPropsWithoutRef<typeof Primitive.Content>, 'asChild'> & {
  container?: HTMLElement;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showClose?: boolean;
  closeLabel?: string;
  overlayProps?: DialogOverlayProps;
};
/** Shared panel for Dialog and Drawer; preserves Radix focus and dismissal props. */
export const OverlayPanel = forwardRef<ComponentRef<typeof Primitive.Content>, DialogContentProps & { edge?: 'left' | 'right' | 'top' | 'bottom' }>(({ container, size = 'md', showClose = true, closeLabel = 'Close dialog', overlayProps, edge, className, children, ...props }, ref) => {
  const scope = useOverlayScope();
  const [content, setContent] = useState<HTMLDivElement | null>(null);
  const attach = useCallback((node: HTMLDivElement | null) => { setContent(node); if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }, [ref]);
  useModalInert(content, scope.modal);
  return <Primitive.Portal container={container ?? scope.container ?? undefined} forceMount={props.forceMount}>
    <DialogOverlay {...overlayProps} />
    <Primitive.Content {...props} ref={attach} data-size={size} data-edge={edge} className={cn('q-overlay-panel', edge ? 'q-drawer-panel' : 'q-dialog-panel', className)}>
      {children}
      {showClose && <Primitive.Close type="button" aria-label={closeLabel} className={cn('q-overlay-close', focusRing)}><MessageCloseIcon /></Primitive.Close>}
    </Primitive.Content>
  </Primitive.Portal>;
});
OverlayPanel.displayName = 'OverlayPanel';
export const DialogContent = forwardRef<ComponentRef<typeof Primitive.Content>, DialogContentProps>((props, ref) => <OverlayPanel {...props} ref={ref} />);
DialogContent.displayName = 'DialogContent';
export type DialogTitleProps = ComponentPropsWithoutRef<typeof Primitive.Title>;
export const DialogTitle = forwardRef<ComponentRef<typeof Primitive.Title>, DialogTitleProps>(({ className, ...props }, ref) => <Primitive.Title {...props} ref={ref} className={cn('q-overlay-title', className)} />);
DialogTitle.displayName = 'DialogTitle';
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof Primitive.Description>;
export const DialogDescription = forwardRef<ComponentRef<typeof Primitive.Description>, DialogDescriptionProps>(({ className, ...props }, ref) => <Primitive.Description {...props} ref={ref} className={cn('q-overlay-description', className)} />);
DialogDescription.displayName = 'DialogDescription';
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogBodyProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q-overlay-header', className)} />);
DialogHeader.displayName = 'DialogHeader';
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q-overlay-body', className)} />);
DialogBody.displayName = 'DialogBody';
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q-overlay-footer', className)} />);
DialogFooter.displayName = 'DialogFooter';
