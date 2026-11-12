# @qevryn/ui

Prism Satin React components, built with TypeScript and Tailwind CSS. Dark first, with light and system themes.

```sh
npm install @qevryn/ui
# or: pnpm add @qevryn/ui
```

[Live preview](https://qevryn-ui-preview.vercel.app) · [Source](https://github.com/SirAtul1204/QevrynUI) · [Issues](https://github.com/SirAtul1204/QevrynUI/issues)

```tsx
import { Button, ThemeProvider } from '@qevryn/ui';
import '@qevryn/ui/styles.css';

<ThemeProvider theme="dark">
  <Button variant="satin">Create project</Button>
</ThemeProvider>
```

Exports: Button, Link, Input, Textarea, Select, Label, Checkbox, CheckboxGroup, RadioGroup/RadioGroupItem, Dropdown (and Trigger/Value/Content/Item/Group/Label/Separator), Chip/ChipButton/ChipRemoveButton, Switch, Badge, Card (and Header/Title/Description/Content/Footer), Separator, Accordion (and Item/Trigger/Content), ThemeProvider, `cn`, and their public prop types.

Use `theme="light"` or `theme="system"` on ThemeProvider. Components forward refs and native props. Button variants: satin, solid, outline, ghost, danger; sizes: sm, md, lg. Cards support satin, elevated, and outline variants. Accordion supports single/multiple and controlled/uncontrolled states; items support satin (default) and outline variants; triggers accept an optional decorative `icon` and `headingLevel` (default 3).

React 18 or 19 and React DOM are required. The exported CSS is precompiled, uses prefixed utility classes, and omits global preflight; consuming apps do not need Tailwind. Import it once. Scope components inside ThemeProvider, supply accessible labels for form controls, and connect helper/error text with `aria-describedby`.

Set `className` for styling overrides or customize the `--qv-*` theme tokens. ES module, CommonJS, and TypeScript declaration exports are included. Licensed under MIT.

RadioGroup uses `value`/`onValueChange` or `defaultValue`; give it a name for form submission and label each RadioGroupItem. Checkbox keeps native input props and supports `indeterminate`; CheckboxGroup supplies a fieldset and legend. Dropdown is a themed single-value select with keyboard navigation, typeahead, disabled options, and portals inside the nearest theme boundary. Use the native Select when platform controls are preferred.

Chips support satin/neutral/outline and sm/md variants. Chip is a display span, ChipButton is a controlled toggle (`selected`), and ChipRemoveButton is a labeled non-submitting button. Put a remove button inside a display Chip, never inside ChipButton.

## Layout

Exported primitives: **Box, Flex, Stack, HStack, VStack, Grid, GridItem, Container, Center, Spacer, AspectRatio**, with their prop types and `Responsive<T>`.

```tsx
import { Container, Stack, HStack, Grid, GridItem, Card, Button } from '@qevryn/ui';

<Container as="section" maxWidth="xl" gutter={{ base: 4, md: 8 }}>
  <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 6 }}>
    <Card>Summary</Card>
    <HStack gap={2}><Button>Save</Button><Button variant="outline">Cancel</Button></HStack>
  </Stack>
  <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
    <GridItem colSpan={{ base: 1, lg: 2 }}><Card>Featured</Card></GridItem>
    <Card>Details</Card>
    <GridItem colSpan="full"><Card>Full-width footer</Card></GridItem>
  </Grid>
</Container>

// Alternatively, fit as many equal-width columns as the container allows.
<Grid minChildWidth="14rem" gap={4}>{cards}</Grid>
```

These components add no surface colors, borders, or shadows. Compose them with Card, Box classes, and other styled components. They use shipped CSS, work during server rendering, and require no browser size listeners or consuming-app Tailwind configuration.

| Component | Behavior and main props |
| --- | --- |
| Box | Generic wrapper; `p`, `px`, `py`, responsive `display` |
| Flex | Row by default; `direction`, `align`, `justify`, `wrap`, `gap`, `rowGap`, `columnGap` |
| Stack / VStack | Column by default; Stack accepts responsive `direction`; VStack stays vertical |
| HStack | Row, centered cross-axis alignment, wrapping by default; accepts Flex props |
| Grid | One column by default; `columns` (1–12) **or** `minChildWidth` (CSS length); gap and alignment props |
| GridItem | `colSpan` (1–12 or `full`), `rowSpan` (1–12) |
| Container | Centered, fluid width; `maxWidth` sm/md/lg/xl/full = 40/48/64/80rem/100%; `gutter` (default 4) |
| Center | Centers children on both axes; `gap` |
| Spacer | Flexible empty space within a flex/stack layout |
| AspectRatio | Width-dependent height; positive numeric `ratio` (default 16/9) |

All except Spacer support a semantic `as` tag (div, section, article, aside, main, nav, header, footer, ul, ol, li) and forward `HTMLElement` refs and native attributes. Spacer forwards a div ref. No extra wrappers are introduced.

Responsive values accept a scalar or an object with `base`, `sm`, `md`, `lg`, `xl`, `2xl`. Breakpoints use **min-width** 640, 768, 1024, 1280, 1536 CSS pixels. Set `base` for mobile; omitted breakpoints keep the preceding value. Unspecified base values use the component defaults. `gap` defaults to 4. Spacing values are Tailwind-style units (1 = 0.25rem); supported values: 0–12, 16, 20, 24. `px`/`py` override their axes within `p`; Container's `px` overrides `gutter`.

`align`: start/center/end/stretch/baseline. `justify`: start/center/end/between/around/evenly. Responsive `display="none"` hides the entire subtree, including from assistive technology. Keep meaningful reading and keyboard order in the JSX. HStack wraps on small screens; Flex does not wrap unless requested. Make spans responsive so they never exceed the parent's explicit column count. Auto-fit is clamped to the available width, so a minimum card width does not force mobile overflow.

Use `className` with `q:` Tailwind utilities to override layout CSS, or supply native `style`. The package only compiles utilities used in its source; custom utilities need to be generated by your own Tailwind setup. AspectRatio does not crop or position children; for media, set your image/video sizing and object-fit styles explicitly.

## Alerts and toasts

Both support `variant="success" | "error" | "warning" | "info"` (default info) and `appearance="satin" | "outline"`. Each severity has a distinct icon, accent, and screen-reader text label. Pass an `icon` node to replace the built-in glyph or `icon={false}` to hide it.

Inline alerts stay in the document until the application removes them. Errors default to `role="alert"` (assertive); other variants use `role="status"` (polite). Override `role` when the context requires it. AlertTitle and AlertDescription render divs; use native attributes or semantic children as needed.

```tsx
import { Alert, AlertTitle, AlertDescription, AlertClose } from '@qevryn/ui';

{visible && <Alert variant="warning" appearance="satin">
  <AlertTitle>Storage almost full</AlertTitle>
  <AlertDescription>Make room before your next upload.</AlertDescription>
  <AlertClose aria-label="Dismiss storage warning" onClick={() => setVisible(false)} />
</Alert>}
```

Add ToastProvider **inside ThemeProvider**, once per notification scope. It includes a viewport automatically. Notifications inherit that theme, including custom tokens. Separate providers have isolated queues; nested scopes can have their own theme. The hook only works within a provider.

```tsx
import { ToastProvider, useToast, ThemeProvider, Button } from '@qevryn/ui';

function SaveButton() {
  const { toast, dismiss } = useToast();
  return <Button onClick={() => {
    const id = toast({
      variant: 'success',
      title: 'Workspace saved',
      description: 'Your latest changes are ready.',
      action: { label: 'Undo', altText: 'Undo the workspace change', onClick: undo },
    });
    // dismiss(id) removes this message; dismiss() clears the entire managed queue.
  }}>Save</Button>;
}

<ThemeProvider theme="dark">
  <ToastProvider position="bottom-right" duration={5000} maxVisible={3}>
    <SaveButton />
  </ToastProvider>
</ThemeProvider>
```

`toast(options)` returns a string `ToastId`. Options require a title and optionally accept description, variant, appearance, icon, duration, type, and action. `action` needs a label, meaningful `altText`, and callback; activating it closes its toast. Actions should be safe to ignore. Keep mandatory decisions in an inline form or dialog.

Provider positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right (default). The default lifetime is 5000ms; per-toast duration overrides it. `duration={Infinity}` keeps a message until dismissed. Managed messages beyond `maxVisible` queue in insertion order, and their timers start when they appear. Closing, clicking an action, or `dismiss(id)` promotes the next queued message. `dismiss()` clears visible and queued messages. Use a positive integer for `maxVisible`; declarative Toast roots are managed by the application and are not counted in this limit.

Toasts announce politely by default (`type="background"`), regardless of color variant. Use `type="foreground"` only for urgent announcements. They do not grab focus on arrival. F8 focuses the notification viewport (default hotkey); Escape closes a toast. Timers pause on hover, focus, and window blur. Swipe direction follows the viewport's edge; `swipeDirection` overrides it. Reduced-motion preferences disable entrance/return animations. The viewport fits small screens, accounts for safe-area insets, and scrolls when the stack exceeds available height.

For controlled React state, compose the public pieces:

```tsx
<ToastProvider viewportProps={{ label: 'Notifications ({hotkey})' }}>
  <Toast variant="error" open={open} onOpenChange={setOpen} duration={Infinity}>
    <ToastTitle>Connection interrupted</ToastTitle>
    <ToastDescription>Your changes are saved locally.</ToastDescription>
    <ToastAction altText="Retry connecting to the server" onClick={retry}>Retry</ToastAction>
    <ToastClose aria-label="Dismiss connection notification" />
  </Toast>
</ToastProvider>
```

Toast, ToastTitle, ToastDescription, ToastAction, ToastClose, and ToastViewport forward Radix props and refs. Set `viewport={false}` only when rendering one custom ToastViewport inside the provider; do not add a second viewport with the automatic one enabled. `viewportProps` customizes the built-in viewport's classes, styles, label, and hotkey. Public types include each component's props, MessageVariant, MessageAppearance, ToastOptions, ToastPosition, ToastId, and ToastApi.

## Dialog, drawer, and tooltip

Dialogs and drawers are modal by default: they trap focus, lock background scrolling, isolate background content, and restore focus to their trigger when closed. Escape, outside interaction, and Close controls dismiss them. Use `open`/`onOpenChange` for controlled state or `defaultOpen` for uncontrolled state. `modal={false}` enables a non-modal panel without a backdrop or focus trap.

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogBody, DialogFooter, DialogClose, Button } from '@qevryn/ui';

<Dialog>
  <DialogTrigger asChild><Button>Edit workspace</Button></DialogTrigger>
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>Edit workspace</DialogTitle>
      <DialogDescription>Update your workspace details.</DialogDescription>
    </DialogHeader>
    <DialogBody>{/* Labeled fields */}</DialogBody>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <Button onClick={save}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

DialogContent includes the themed portal, backdrop, and a labeled close icon automatically. Sizes sm/md/lg/full correspond to 24/32/48rem/viewport width, capped to fit the screen. Content scrolls when its height exceeds the viewport. Use `showClose={false}` for custom close controls, `closeLabel` to customize or translate the icon label, and `overlayProps` to customize the backdrop. `container` overrides the portal mount; otherwise it mounts inside the nearest ThemeProvider, including programmatically opened panels without a trigger. Preserve theme tokens when supplying a custom container. An internal display-contents wrapper captures this boundary.

Always include DialogTitle or DrawerTitle. Description is optional; when omitting it, set `aria-describedby={undefined}` on Content. Use `onOpenAutoFocus` / `onCloseAutoFocus` when initial or return focus needs customization, especially for panels without a trigger. Radix's `onEscapeKeyDown` and `onPointerDownOutside` events can prevent default dismissal. Close actions are buttons; use `asChild` to compose an existing Button. For form submission, use controlled state and close only after validation/save succeeds. Put the form inside Content (`className="q:contents"` keeps the header/body/footer layout).

Drawer exports the corresponding Root, Trigger, Content, Close, Header, Title, Description, Body, and Footer pieces:

```tsx
<Drawer>
  <DrawerTrigger asChild><Button>Preferences</Button></DrawerTrigger>
  <DrawerContent side="right" size="sm">
    <DrawerHeader>
      <DrawerTitle>Preferences</DrawerTitle>
      <DrawerDescription>Configure your workspace.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* Controls */}</DrawerBody>
    <DrawerFooter><DrawerClose asChild><Button>Done</Button></DrawerClose></DrawerFooter>
  </DrawerContent>
</Drawer>
```

`side` supports left/right/top/bottom (default right). Left/right drawers use the selected width and full viewport height. Top/bottom drawers use full width and content-driven height capped at 85dvh. Panels account for vertical safe-area insets. Drawers use dialog semantics and an edge entrance animation; reduced-motion preferences disable it.

```tsx
<TooltipProvider delayDuration={400}>
  <Tooltip>
    <TooltipTrigger asChild><Button aria-label="Help">?</Button></TooltipTrigger>
    <TooltipContent side="top">A short, helpful explanation.</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

TooltipProvider configures shared hover delay (default 400ms), skip-delay behavior, and hoverable content. Tooltip supports controlled/uncontrolled open state. Content supports top/right/bottom/left, alignment, collision handling, `sideOffset` (default 8), `collisionPadding` (default 12), and `showArrow` (default true). It inherits the trigger's theme, opens on keyboard focus or hover, and closes on Escape without moving focus. Trigger and Close components support `asChild`; DialogContent, DrawerContent, and TooltipContent own their styled div and do not support `asChild`. All pieces expose their native/Radix props and public prop types and forward refs where appropriate.

Keep tooltip content short and non-interactive. Give icon-only triggers their own accessible names; a tooltip is supplementary guidance. Essential instructions should also be visible in the interface so touch users can access them. Interactive floating content belongs in a popover or dialog.
