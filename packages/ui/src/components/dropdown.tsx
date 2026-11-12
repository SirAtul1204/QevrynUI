import { createContext, forwardRef, useCallback, useContext, useEffect, useState, type ComponentPropsWithoutRef, type ComponentRef, type ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-select';
import { cn } from '../lib/cn';
import { fieldStyles, focusRing } from '../lib/styles';

// Mount the portal inside the nearest theme boundary so custom and nested tokens inherit.
const PortalContext = createContext<{ container: HTMLElement | null; setContainer: (container: HTMLElement | null) => void } | null>(null);
export type DropdownProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export function Dropdown(props: DropdownProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  return <PortalContext.Provider value={{ container, setContainer }}><Primitive.Root {...props} /></PortalContext.Provider>;
}
export const DropdownValue = Primitive.Value;
export const DropdownGroup = Primitive.Group;
export type DropdownValueProps = ComponentPropsWithoutRef<typeof Primitive.Value>;
export type DropdownGroupProps = ComponentPropsWithoutRef<typeof Primitive.Group>;
export type DropdownTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger> & { variant?: 'satin' | 'outline' };
export const DropdownTrigger = forwardRef<ComponentRef<typeof Primitive.Trigger>, DropdownTriggerProps>(({ className, children, variant = 'satin', ...props }, ref) => {
  const context = useContext(PortalContext);
  const setContainer = context?.setContainer;
  const attachRef = useCallback((node: HTMLButtonElement | null) => {
    setContainer?.(node?.closest<HTMLElement>('.q-theme') ?? null);
    if (typeof ref === 'function') ref(node); else if (ref) ref.current = node;
  }, [setContainer, ref]);
  return <Primitive.Trigger {...props} ref={attachRef} className={cn(fieldStyles, focusRing, 'q:flex q:min-h-11 q:items-center q:justify-between q:gap-3 q:text-left q:cursor-pointer q:data-[placeholder]:text-muted q:data-[state=open]:border-purple q:data-[state=open]:shadow-glow', variant === 'satin' && 'q:bg-linear-to-br q:from-purple/8 q:to-control', className)}>
    <span className="q:min-w-0 q:truncate">{children}</span>
    <Primitive.Icon asChild><span aria-hidden="true" className="q:mr-1 q:size-2 q:shrink-0 q:rotate-45 q-dropdown-mark q:text-purple" /></Primitive.Icon>
  </Primitive.Trigger>;
});
DropdownTrigger.displayName = 'DropdownTrigger';
export type DropdownContentProps = ComponentPropsWithoutRef<typeof Primitive.Content> & { container?: HTMLElement };
export const DropdownContent = forwardRef<ComponentRef<typeof Primitive.Content>, DropdownContentProps>(({ className, children, container, position = 'popper', sideOffset = 8, collisionPadding = 12, ...props }, ref) => {
  const context = useContext(PortalContext);
  const [content, setContent] = useState<HTMLDivElement | null>(null);
  const attachRef = useCallback((node: HTMLDivElement | null) => {
    setContent(node);
    if (typeof ref === 'function') ref(node); else if (ref) ref.current = node;
  }, [ref]);
  useEffect(() => {
    if (!content?.isConnected) return;
    // Radix hides the background from assistive technology and traps focus.
    // Native inert also prevents hidden background controls from being focusable.
    const body = content.ownerDocument.body;
    const changed = new Map<HTMLElement, boolean>();
    const sync = () => {
      for (const [element, previous] of changed) {
        if (element.getAttribute('aria-hidden') !== 'true') { element.inert = previous; changed.delete(element); }
      }
      body.querySelectorAll<HTMLElement>('[aria-hidden="true"]').forEach(element => {
        if (!element.contains(content) && !element.hasAttribute('data-radix-focus-guard') && element.querySelector('a[href],button,input,select,textarea,[tabindex]') && !changed.has(element)) {
          changed.set(element, element.inert);
          element.inert = true;
        }
      });
    };
    const observer = new MutationObserver(sync);
    observer.observe(body, { subtree: true, attributes: true, attributeFilter: ['aria-hidden'] });
    sync();
    return () => { observer.disconnect(); changed.forEach((previous, element) => { element.inert = previous; }); };
  }, [content]);
  return <Primitive.Portal container={container ?? context?.container ?? undefined}>
    <Primitive.Content {...props} ref={attachRef} position={position} sideOffset={sideOffset} collisionPadding={collisionPadding} className={cn('q-dropdown-content q:z-50 q:box-border q:min-w-[var(--radix-select-trigger-width)] q:max-w-[calc(100vw-24px)] q:max-h-[min(var(--radix-select-content-available-height),20rem)] q:overflow-hidden q:rounded-xl q:border q:border-solid q:border-purple/40 q:bg-surface q:text-foreground q:shadow-satin', className)}>
      <Primitive.ScrollUpButton className="q:flex q:h-7 q:items-center q:justify-center q:text-purple"><span aria-hidden="true" className="q:size-2 q:rotate-225 q-dropdown-mark" /></Primitive.ScrollUpButton>
      <Primitive.Viewport className="q:p-1.5">{children}</Primitive.Viewport>
      <Primitive.ScrollDownButton className="q:flex q:h-7 q:items-center q:justify-center q:text-purple"><span aria-hidden="true" className="q:size-2 q:rotate-45 q-dropdown-mark" /></Primitive.ScrollDownButton>
    </Primitive.Content>
  </Primitive.Portal>;
});
DropdownContent.displayName = 'DropdownContent';
export type DropdownItemProps = ComponentPropsWithoutRef<typeof Primitive.Item> & { icon?: ReactNode };
export const DropdownItem = forwardRef<ComponentRef<typeof Primitive.Item>, DropdownItemProps>(({ className, children, icon, ...props }, ref) => (
  <Primitive.Item {...props} ref={ref} className={cn('q:relative q:flex q:min-h-10 q:items-center q:gap-2.5 q:rounded-lg q:py-2.5 q:pr-9 q:pl-3 q:text-sm q:cursor-default q:data-[highlighted]:bg-purple/12 q:data-[highlighted]:outline-2 q:data-[highlighted]:outline-offset-[-2px] q:data-[highlighted]:outline-purple/50 q:data-[state=checked]:text-pink q:data-[disabled]:opacity-45 q:data-[disabled]:pointer-events-none', className)}>
    {icon && <span aria-hidden="true" className="q:flex q:shrink-0 q:items-center q:text-purple">{icon}</span>}
    <Primitive.ItemText>{children}</Primitive.ItemText>
    <Primitive.ItemIndicator className="q:absolute q:right-3 q:flex q:items-center"><span aria-hidden="true" className="q:h-2.5 q:w-1.5 q:rotate-45 q-dropdown-mark" /></Primitive.ItemIndicator>
  </Primitive.Item>
));
DropdownItem.displayName = 'DropdownItem';
export type DropdownLabelProps = ComponentPropsWithoutRef<typeof Primitive.Label>;
export const DropdownLabel = forwardRef<ComponentRef<typeof Primitive.Label>, DropdownLabelProps>(({ className, ...props }, ref) => <Primitive.Label {...props} ref={ref} className={cn('q:px-3 q:pt-3 q:pb-2 q:text-xs q:font-medium q:text-muted', className)} />);
DropdownLabel.displayName = 'DropdownLabel';
export type DropdownSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.Separator>;
export const DropdownSeparator = forwardRef<ComponentRef<typeof Primitive.Separator>, DropdownSeparatorProps>(({ className, ...props }, ref) => <Primitive.Separator {...props} ref={ref} className={cn('q:my-1.5 q:h-px q:bg-border', className)} />);
DropdownSeparator.displayName = 'DropdownSeparator';
