# Layout API research

Reviewed the official documentation on October 12, 2026.

| Library | Useful pattern | Qevryn decision |
| --- | --- | --- |
| [Chakra Stack](https://chakra-ui.com/docs/components/stack) | Vertical default, HStack/VStack shortcuts, responsive direction | Stack/VStack for vertical content; HStack wraps action and chip rows; responsive Stack for mobile column → desktop row |
| [Chakra SimpleGrid](https://chakra-ui.com/docs/components/simple-grid) | Explicit columns, auto-fit via minimum child width, separate row/column gaps | One Grid API with mutually exclusive columns/minChildWidth modes; GridItem for spans |
| [Radix layout](https://www.radix-ui.com/themes/docs/overview/layout) | Box, Flex, Grid with explicit layout responsibility | Keep primitives visually neutral; reuse existing Prism Satin surfaces for appearance |
| [Radix Flex](https://www.radix-ui.com/themes/docs/components/flex) | Typed layout properties with responsive values | Shared Responsive<T> object format for direction, alignment, gaps, sizing, and visibility |
| [Mantine Group](https://mantine.dev/core/group/) | Horizontal grouping, wrapping and spacing controls | HStack wrapping default; Flex for deliberate nowrap layouts |
| [Mantine SimpleGrid](https://mantine.dev/core/simple-grid/) | Equal-width responsive columns | Grid columns share available width using minmax(0, 1fr) |

Implementation uses the standard Tailwind mobile-first breakpoints and spacing units. Static component-layer CSS reads per-element custom properties. Each layout boundary resets its internal properties to prevent nested layouts inheriting a parent's breakpoint values. Consumer utilities override the component layer. No new runtime dependencies are needed.

Supporting primitives: Container for page width and gutters; Center for alignment; Spacer for distributing flex space; AspectRatio for media dimensions. Split panes, masonry, sticky navigation, and application shells can be evaluated later as composed components.
