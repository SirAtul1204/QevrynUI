# Responsive layouts

Version: @qevryn/ui 0.1.0.

Mobile-first responsive props use base/sm/md/lg/xl/2xl at 640/768/1024/1280/1536px. Spacing 1 = .25rem; tokens 0–12,16,20,24. HStack wraps by default. Grid accepts columns OR minChildWidth, never both. Responsive spans must fit the parent columns.

```tsx
import { ThemeProvider, Box, Flex, Stack, HStack, VStack, Grid, GridItem, Container, Center, Spacer, AspectRatio, Card } from '@qevryn/ui';
import '@qevryn/ui/styles.css';


export default function Example() {
  return <ThemeProvider theme="dark"><Container maxWidth="xl" gutter={{ base: 4, md: 8 }}><Stack direction={{ base: "column", md: "row" }}><Box p={3}>Summary</Box><Spacer /><HStack><span>Actions</span></HStack></Stack><Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}><GridItem colSpan={{ base: 1, lg: 2 }}><Card>Featured module</Card></GridItem><VStack><Card>Details</Card></VStack><GridItem colSpan="full"><Flex justify="between"><span>Status</span><span>Ready</span></Flex></GridItem></Grid><AspectRatio ratio={16 / 9}><Center style={{ height: "100%" }}>Media placeholder</Center></AspectRatio></Container></ThemeProvider>;
}

```

## Actual public declarations

```ts
import { type HTMLAttributes } from 'react';
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
export type GridProps = BoxProps & Pick<FlexProps, 'gap' | 'rowGap' | 'columnGap' | 'align'> & ({
    columns?: Responsive<Columns>;
    minChildWidth?: never;
} | {
    columns?: never;
    minChildWidth: Responsive<string>;
});
export type GridItemProps = BoxProps & {
    colSpan?: Responsive<Columns | 'full'>;
    rowSpan?: Responsive<Columns>;
};
export type ContainerProps = BoxProps & {
    maxWidth?: Responsive<'sm' | 'md' | 'lg' | 'xl' | 'full'>;
    gutter?: Responsive<Space>;
};
export type CenterProps = BoxProps & {
    gap?: Responsive<Space>;
};
export type SpacerProps = HTMLAttributes<HTMLDivElement>;
export type AspectRatioProps = BoxProps & {
    ratio?: Responsive<number>;
};
export declare const Box: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & import("react").RefAttributes<HTMLElement>>;
export declare const Flex: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    direction?: Responsive<"row" | "column">;
    gap?: Responsive<Space>;
    rowGap?: Responsive<Space>;
    columnGap?: Responsive<Space>;
    align?: Responsive<Align>;
    justify?: Responsive<Justify>;
    wrap?: Responsive<"wrap" | "nowrap">;
} & import("react").RefAttributes<HTMLElement>>;
export declare const Stack: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    direction?: Responsive<"row" | "column">;
    gap?: Responsive<Space>;
    rowGap?: Responsive<Space>;
    columnGap?: Responsive<Space>;
    align?: Responsive<Align>;
    justify?: Responsive<Justify>;
    wrap?: Responsive<"wrap" | "nowrap">;
} & import("react").RefAttributes<HTMLElement>>;
export declare const HStack: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    direction?: Responsive<"row" | "column">;
    gap?: Responsive<Space>;
    rowGap?: Responsive<Space>;
    columnGap?: Responsive<Space>;
    align?: Responsive<Align>;
    justify?: Responsive<Justify>;
    wrap?: Responsive<"wrap" | "nowrap">;
} & import("react").RefAttributes<HTMLElement>>;
export declare const VStack: import("react").ForwardRefExoticComponent<VStackProps & import("react").RefAttributes<HTMLElement>>;
export declare const Grid: import("react").ForwardRefExoticComponent<GridProps & import("react").RefAttributes<HTMLElement>>;
export declare const GridItem: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    colSpan?: Responsive<Columns | "full">;
    rowSpan?: Responsive<Columns>;
} & import("react").RefAttributes<HTMLElement>>;
export declare const Container: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    maxWidth?: Responsive<"sm" | "md" | "lg" | "xl" | "full">;
    gutter?: Responsive<Space>;
} & import("react").RefAttributes<HTMLElement>>;
export declare const Center: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    gap?: Responsive<Space>;
} & import("react").RefAttributes<HTMLElement>>;
export declare const Spacer: import("react").ForwardRefExoticComponent<SpacerProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const AspectRatio: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: LayoutElement;
    p?: Responsive<Space>;
    px?: Responsive<Space>;
    py?: Responsive<Space>;
    display?: Responsive<"block" | "inline-block" | "flex" | "grid" | "none">;
} & {
    ratio?: Responsive<number>;
} & import("react").RefAttributes<HTMLElement>>;

```
