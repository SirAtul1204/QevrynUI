import { createElement, forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
/** Values inherit upward from the last supplied breakpoint. */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;
/** Tailwind spacing units: each unit is 0.25rem. */
export type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 20 | 24;
export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type LayoutElement = 'div' | 'section' | 'article' | 'aside' | 'main' | 'nav' | 'header' | 'footer' | 'ul' | 'ol' | 'li';
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type BoxProps = HTMLAttributes<HTMLElement> & {
  as?: LayoutElement;
  p?: Responsive<Space>;
  px?: Responsive<Space>;
  py?: Responsive<Space>;
  display?: Responsive<'block' | 'inline-block' | 'flex' | 'grid' | 'none'>;
};
export type FlexProps = BoxProps & {
  direction?: Responsive<'row' | 'column'>;
  gap?: Responsive<Space>;
  rowGap?: Responsive<Space>;
  columnGap?: Responsive<Space>;
  align?: Responsive<Align>;
  justify?: Responsive<Justify>;
  wrap?: Responsive<'wrap' | 'nowrap'>;
};
export type StackProps = FlexProps;
export type HStackProps = FlexProps;
export type VStackProps = Omit<FlexProps, 'direction'>;
export type GridProps = BoxProps & Pick<FlexProps, 'gap' | 'rowGap' | 'columnGap' | 'align'> & (
  | { columns?: Responsive<Columns>; minChildWidth?: never }
  | { columns?: never; minChildWidth: Responsive<string> }
);
export type GridItemProps = BoxProps & { colSpan?: Responsive<Columns | 'full'>; rowSpan?: Responsive<Columns> };
export type ContainerProps = BoxProps & { maxWidth?: Responsive<'sm' | 'md' | 'lg' | 'xl' | 'full'>; gutter?: Responsive<Space> };
export type CenterProps = BoxProps & { gap?: Responsive<Space> };
export type SpacerProps = HTMLAttributes<HTMLDivElement>;
export type AspectRatioProps = BoxProps & { ratio?: Responsive<number> };

const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];
const space = (value: Space) => `${value * 0.25}rem`;
const align = (value: Align) => value === 'start' || value === 'end' ? `flex-${value}` : value;
const justify = (value: Justify) => value === 'start' || value === 'end' ? `flex-${value}` : value === 'center' ? value : `space-${value}`;
const widths = { sm: '40rem', md: '48rem', lg: '64rem', xl: '80rem', full: '100%' };
function withBase<T>(value: Responsive<T>, base: T): Responsive<T> {
  return typeof value === 'object' && value !== null ? { base, ...value } : value;
}

/** Static CSS handles breakpoints; no resize listeners or generated Tailwind classes. */
function responsive<T>(name: string, value: Responsive<T> | undefined, convert: (value: T) => string = String) {
  if (value === undefined) return { className: '', style: {} };
  const values = typeof value === 'object' && value !== null ? value as Partial<Record<Breakpoint, T>> : { base: value as T };
  const style: Record<string, string> = {};
  for (const breakpoint of breakpoints) {
    const entry = values[breakpoint];
    if (entry !== undefined) style[`--q-layout-${name}-${breakpoint}`] = convert(entry);
  }
  return { className: `q-layout-${name}`, style: style as CSSProperties };
}
function merge(...parts: ReturnType<typeof responsive>[]) {
  return { className: cn(...parts.map(part => part.className)), style: Object.assign({}, ...parts.map(part => part.style)) as CSSProperties };
}
function box({ p, px, py, display }: BoxProps) {
  return merge(responsive('p', p, space), responsive('px', px, space), responsive('py', py, space), responsive('display', display));
}
const base = 'q-layout q:min-w-0 q:box-border';

export const Box = forwardRef<HTMLElement, BoxProps>(({ as = 'div', p, px, py, display, className, style, ...props }, ref) => {
  const layout = box({ p, px, py, display });
  return createElement(as, { ...props, ref, className: cn(base, layout.className, className), style: { ...layout.style, ...style } });
});
Box.displayName = 'Box';

export const Flex = forwardRef<HTMLElement, FlexProps>(({ direction = 'row', gap = 4, rowGap, columnGap, align: alignment = 'stretch', justify: justification = 'start', wrap = 'nowrap', display, className, style, ...props }, ref) => {
  const layout = merge(responsive('direction', withBase(direction, 'row')), responsive('gap', withBase(gap, 4), space), responsive('row-gap', rowGap, space), responsive('column-gap', columnGap, space), responsive('align', withBase(alignment, 'stretch'), align), responsive('justify', withBase(justification, 'start'), justify), responsive('wrap', withBase(wrap, 'nowrap')));
  return <Box {...props} ref={ref} display={display === undefined ? undefined : withBase(display, 'flex')} className={cn('q-layout-flex', layout.className, className)} style={{ ...layout.style, ...style }} />;
});
Flex.displayName = 'Flex';
export const Stack = forwardRef<HTMLElement, StackProps>(({ direction = 'column', ...props }, ref) => <Flex {...props} ref={ref} direction={withBase(direction, 'column')} />);
Stack.displayName = 'Stack';
export const HStack = forwardRef<HTMLElement, HStackProps>(({ direction = 'row', align = 'center', wrap = 'wrap', ...props }, ref) => <Flex {...props} ref={ref} direction={direction} align={withBase(align, 'center')} wrap={withBase(wrap, 'wrap')} />);
HStack.displayName = 'HStack';
export const VStack = forwardRef<HTMLElement, VStackProps>((props, ref) => <Flex {...props} ref={ref} direction="column" />);
VStack.displayName = 'VStack';

export const Grid = forwardRef<HTMLElement, GridProps>(({ columns, minChildWidth, gap = 4, rowGap, columnGap, align: alignment = 'stretch', display, className, style, ...props }, ref) => {
  const template = minChildWidth !== undefined
    ? responsive('columns', minChildWidth, value => `repeat(auto-fit, minmax(min(100%, ${value}), 1fr))`)
    : responsive('columns', withBase(columns ?? 1, 1), value => `repeat(${value}, minmax(0, 1fr))`);
  const layout = merge(template, responsive('gap', withBase(gap, 4), space), responsive('row-gap', rowGap, space), responsive('column-gap', columnGap, space), responsive('align', alignment, align));
  return <Box {...props} ref={ref} display={display === undefined ? undefined : withBase(display, 'grid')} className={cn('q-layout-grid', layout.className, className)} style={{ ...layout.style, ...style }} />;
});
Grid.displayName = 'Grid';
export const GridItem = forwardRef<HTMLElement, GridItemProps>(({ colSpan = 1, rowSpan = 1, className, style, ...props }, ref) => {
  const layout = merge(responsive('col-span', colSpan, value => value === 'full' ? '1 / -1' : `span ${value} / span ${value}`), responsive('row-span', rowSpan, value => `span ${value} / span ${value}`));
  return <Box {...props} ref={ref} className={cn(layout.className, className)} style={{ ...layout.style, ...style }} />;
});
GridItem.displayName = 'GridItem';
export const Container = forwardRef<HTMLElement, ContainerProps>(({ maxWidth = 'xl', gutter = 4, px, className, style, ...props }, ref) => {
  const layout = responsive('max-width', maxWidth, value => widths[value]);
  return <Box {...props} ref={ref} px={px ?? gutter} className={cn('q:w-full q:mx-auto', layout.className, className)} style={{ ...layout.style, ...style }} />;
});
Container.displayName = 'Container';
export const Center = forwardRef<HTMLElement, CenterProps>(({ gap = 4, display, className, style, ...props }, ref) => {
  const layout = responsive('gap', withBase(gap, 4), space);
  return <Box {...props} ref={ref} display={display === undefined ? undefined : withBase(display, 'flex')} className={cn('q-layout-flex q:items-center q:justify-center', layout.className, className)} style={{ ...layout.style, ...style }} />;
});
Center.displayName = 'Center';
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(({ className, ...props }, ref) => <div {...props} ref={ref} className={cn('q:min-w-0 q:min-h-0 q:flex-1', className)} />);
Spacer.displayName = 'Spacer';
export const AspectRatio = forwardRef<HTMLElement, AspectRatioProps>(({ ratio = 16 / 9, className, style, ...props }, ref) => {
  const layout = responsive('ratio', ratio, value => {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError('AspectRatio ratio must be a finite positive number.');
    return String(value);
  });
  return <Box {...props} ref={ref} className={cn('q:w-full', layout.className, className)} style={{ ...layout.style, ...style }} />;
});
AspectRatio.displayName = 'AspectRatio';
