import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import * as Primitive from '@radix-ui/react-tooltip';
import { cn } from '../lib/cn';
import { OverlayScope, useOverlayScope } from '../lib/overlay-scope';
export type TooltipProviderProps = ComponentPropsWithoutRef<typeof Primitive.Provider>;
export function TooltipProvider({ delayDuration = 400, ...props }: TooltipProviderProps) { return <Primitive.Provider {...props} delayDuration={delayDuration} />; }
export type TooltipProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export function Tooltip({ children, ...props }: TooltipProps) { return <Primitive.Root {...props}><OverlayScope modal={false}>{children}</OverlayScope></Primitive.Root>; }
export const TooltipTrigger = Primitive.Trigger;
export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger>;
export type TooltipContentProps = Omit<ComponentPropsWithoutRef<typeof Primitive.Content>, 'asChild'> & { container?: HTMLElement; showArrow?: boolean };
export const TooltipContent = forwardRef<ComponentRef<typeof Primitive.Content>, TooltipContentProps>(({ container, showArrow = true, sideOffset = 8, collisionPadding = 12, className, children, ...props }, ref) => {
  const scope = useOverlayScope();
  return <Primitive.Portal container={container ?? scope.container ?? undefined} forceMount={props.forceMount}><Primitive.Content {...props} ref={ref} sideOffset={sideOffset} collisionPadding={collisionPadding} className={cn('q-tooltip-content', className)}>{children}{showArrow && <Primitive.Arrow className="q-tooltip-arrow" width={10} height={5} />}</Primitive.Content></Primitive.Portal>;
});
TooltipContent.displayName = 'TooltipContent';
