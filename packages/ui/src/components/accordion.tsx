import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef, type ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-accordion';
import { cn } from '../lib/cn';
import { focusRing } from '../lib/styles';

export type AccordionProps = ComponentPropsWithoutRef<typeof Primitive.Root>;
export const Accordion = forwardRef<ComponentRef<typeof Primitive.Root>, AccordionProps>(({ className, ...props }, ref) => (
  <Primitive.Root {...props} ref={ref} className={cn('q-accordion q:overflow-hidden q:rounded-2xl q:border q:border-solid q:border-transparent q:shadow-satin', className)} />
));
Accordion.displayName = 'Accordion';
export type AccordionItemProps = ComponentPropsWithoutRef<typeof Primitive.Item> & { variant?: 'satin' | 'outline' };
export const AccordionItem = forwardRef<ComponentRef<typeof Primitive.Item>, AccordionItemProps>(({ className, variant = 'satin', ...props }, ref) => (
  <Primitive.Item {...props} ref={ref} data-variant={variant} className={cn('q-accordion-item q:relative q:data-[disabled]:opacity-45', className)} />
));
AccordionItem.displayName = 'AccordionItem';
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof Primitive.Trigger> & { headingLevel?: 2 | 3 | 4 | 5 | 6; icon?: ReactNode };
export const AccordionTrigger = forwardRef<ComponentRef<typeof Primitive.Trigger>, AccordionTriggerProps>(({ className, children, headingLevel = 3, icon, ...props }, ref) => {
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <Primitive.Header asChild>
    <Heading className="q:m-0">
    <Primitive.Trigger {...props} ref={ref} className={cn('q-accordion-trigger q:group q:flex q:w-full q:box-border q:min-h-18 q:items-center q:justify-between q:gap-4 q:border-0 q:bg-transparent q:px-5 q:py-5 q:text-left q:text-sm q:font-medium q:text-foreground q:cursor-pointer q:transition-colors q:hover:text-pink q:disabled:cursor-not-allowed', focusRing, 'q:focus-visible:outline-offset-[-3px]', className)}>
      <span className="q:flex q:min-w-0 q:items-center q:gap-3">
        {icon && <span aria-hidden="true" className="q-accordion-icon q:flex q:size-10 q:shrink-0 q:items-center q:justify-center q:rounded-xl q:text-purple">{icon}</span>}
        <span className="q:min-w-0">{children}</span>
      </span>
      <span aria-hidden="true" className="q-accordion-indicator q:relative q:flex q:size-8 q:shrink-0 q:items-center q:justify-center q:rounded-lg q:text-purple">
        <span className="q:absolute q:h-px q:w-3 q:bg-current" />
        <span className="q:absolute q:h-3 q:w-px q:bg-current q:transition-transform q:group-data-[state=open]:rotate-90" />
      </span>
    </Primitive.Trigger>
    </Heading>
  </Primitive.Header>;
});
AccordionTrigger.displayName = 'AccordionTrigger';
export type AccordionContentProps = ComponentPropsWithoutRef<typeof Primitive.Content>;
export const AccordionContent = forwardRef<ComponentRef<typeof Primitive.Content>, AccordionContentProps>(({ className, children, ...props }, ref) => (
  <Primitive.Content {...props} ref={ref} className={cn('q-accordion-content q:overflow-hidden q:text-sm q:text-muted', className)}><div className="q-accordion-body q:relative q:mx-5 q:pb-5 q:pt-4 q:leading-relaxed">{children}</div></Primitive.Content>
));
AccordionContent.displayName = 'AccordionContent';
