# Qevryn UI

## Deploy the preview to Vercel

Live preview: [qevryn-ui-preview.vercel.app](https://qevryn-ui-preview.vercel.app).

The public [GitHub repository](https://github.com/SirAtul1204/QevrynUI) is connected to the Vercel project `qevryn-ui-preview`. Pushes to `main` deploy production; pull requests receive preview deployments. GitHub Actions runs the workspace build, type checks, and tests on pushes and pull requests.

Deploy from the repository root. The root `vercel.json` builds `@qevryn/ui` before `@qevryn/preview` through Turborepo and publishes `apps/preview/dist`. Keep the Vercel project Root Directory at the repository root. Use Node.js 24.x in project settings and enable `ENABLE_EXPERIMENTAL_COREPACK=1` for builds so the pinned pnpm version is honored. The install command uses Corepack with the frozen lockfile.

```sh
vercel login
vercel --prod
```

Vercel's local project link stays in ignored `.vercel/`; build caches, dependencies, and local test artifacts are excluded from uploads by `.vercelignore`.

A TypeScript React component library built with Tailwind CSS 4. The initial theme is **Prism Satin**: matte plum surfaces, purple-pink gradient actions, rounded corners, and restrained glow. Dark is the default; light and system themes are supported.

Responsive layout primitives are included: Box, Flex, Stack/HStack/VStack, Grid/GridItem, Container, Center, Spacer, and AspectRatio. See the [layout API and examples](packages/ui/README.md#layout) and [research notes](docs/layout-research.md). The preview includes examples of wrapping rows, breakpoint grids, auto-fit cards, and responsive spans.

Alerts and toasts support success, error, warning, and info states. Inline alerts are composable and dismissible. ToastProvider/useToast adds queued notifications, six positions, optional actions, and hover/focus timer pauses. See the [notification API](packages/ui/README.md#alerts-and-toasts). Existing preview feedback now uses the library's Toast components.

Dialog, Drawer, and Tooltip include themed portal content, responsive sizing, and keyboard behavior. Drawers support all four edges; tooltips support hover/focus and collision positioning. See the [overlay API](packages/ui/README.md#dialog-drawer-and-tooltip) and the live preview examples.

## Workspace

```text
apps/
  preview/             @qevryn/preview — Vite component showcase
packages/
  ui/                  @qevryn/ui — reusable basic components
    src/components/
    src/styles.css     scoped theme tokens and prefixed Tailwind utilities
    tests/
turbo.json             task dependencies and local build cache
pnpm-workspace.yaml    workspace packages
tsconfig.base.json     shared strict TypeScript settings
```

The preview depends on `@qevryn/ui` through `workspace:*`. In development, its Vite configuration resolves the library's source for hot reload. Production builds use the library's compiled package exports. Add a future complex-components package under `packages/` and declare `@qevryn/ui` as a dependency; apps should consume components through package imports.

## Start developing

Use Node.js **22.12 or later** and pnpm **12.18.0**.

The project pins Node **24.21.0** in `.nvmrc`, which CI also uses. With fnm, run `fnm use` from the project directory. If pnpm is missing, run `npm install --global pnpm@12.18.0` after selecting Node.

```sh
pnpm install
pnpm dev
```

Open the URL Vite prints, usually `http://localhost:5173`. The preview includes all starting components, light/dark switching, native form submission, a loading button, and interactive accordion examples.

```sh
pnpm check       # Turborepo: build both workspaces, check types, run UI tests
pnpm build      # UI package first, then production preview
pnpm typecheck
pnpm test
pnpm pack:ui    # installable archive in artifacts/
```

Build results live in `packages/ui/dist` and `apps/preview/dist`. Generated files, caches, dependency folders, and archives are ignored by Git.

## Use in another project

Install the library in a React project:

```sh
npm install @qevryn/ui
# or: pnpm add @qevryn/ui
```

For a local archive instead, build and pack it:

```sh
pnpm pack:ui
```

Then, from another React project:

```sh
pnpm add /absolute/path/to/QevrynUI/artifacts/qevryn-ui-0.1.0.tgz
```

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, ThemeProvider } from '@qevryn/ui';
import '@qevryn/ui/styles.css';

export function App() {
  return (
    <ThemeProvider theme="dark">
      <Card>
        <CardHeader><CardTitle>Your next idea</CardTitle></CardHeader>
        <CardContent>
          <Button variant="satin" onClick={() => console.log('Create')}>
            Create project
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

Import the stylesheet once at your app entry (or global layout). It contains the compiled component utilities, so your consuming project does **not** need Tailwind. React and React DOM are peer dependencies; React 18 and 19 are supported. Package exports include ES modules, CommonJS, and TypeScript declarations. The bundle carries a `use client` directive for React Server Component environments.

Qevryn does not include Tailwind's global preflight/reset. Utility classes use the `q:` prefix, and theme colors belong to `.q-theme` boundaries. The theme wrapper sets typography and color but leaves layout and the page background to your app. Give the app container `background: var(--qv-canvas)` if you want the matching canvas.

## Starting components

| Component | Options |
| --- | --- |
| `Button` | `satin`, `solid`, `outline`, `ghost`, `danger`; `sm`, `md`, `lg`; loading, disabled, fullWidth |
| `Link` | default, muted, underline; native anchor props |
| `Input`, `Textarea`, `Select`, `Label` | native element props, refs, validation and disabled states |
| `Checkbox`, `CheckboxGroup` | styled native checkbox, indeterminate state, accessible fieldset/legend grouping |
| `RadioGroup`, `RadioGroupItem` | controlled or uncontrolled single selection, arrow-key navigation, form values |
| `Dropdown` | custom Satin or outline trigger; themed popup, groups, disabled options, typeahead |
| `Chip`, `ChipButton`, `ChipRemoveButton` | display, toggle, and removable chips; satin/neutral/outline; sm/md |
| `Switch` | Radix switch; controlled or uncontrolled, keyboard and form support |
| `Badge` | satin, neutral, success, danger, outline |
| `Card` | satin, elevated, outline; Header, Title, Description, Content, Footer exports |
| `Separator` | horizontal or vertical; decorative or semantic |
| `Accordion` | single or multiple; controlled or uncontrolled; satin/outline items; optional trigger icons |
| `ThemeProvider` | dark (default), light, system; supports nested boundaries |

### Forms

Use `Label` with matching `htmlFor` / `id`. Connect helper and error text with `aria-describedby`, and set `aria-invalid` for validation failures. `Select` is the native option; `Dropdown` provides a custom themed popup. Buttons default to `type="button"`; explicitly use `type="submit"` in forms. Loading buttons keep their accessible name and block clicks while busy.

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" name="email" required />
<Label htmlFor="notifications">Notifications</Label>
<Switch id="notifications" name="notifications" defaultChecked />
```

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@qevryn/ui';

<Accordion type="single" collapsible defaultValue="details">
  <AccordionItem value="details">
    <AccordionTrigger headingLevel={2}>Details</AccordionTrigger>
    <AccordionContent>Your content goes here.</AccordionContent>
  </AccordionItem>
</Accordion>
```

Use `type="multiple"` for multiple open panels. The accordion forms one shared Satin surface with inset row dividers. Items default to `variant="satin"`; expanded rows have a purple-pink illuminated edge and a subtle tinted background. Use `variant="outline"` on an item for a quieter surface. Triggers accept an optional `icon` React node, displayed in a decorative accent tile. Triggers default to heading level 3; choose `headingLevel` to match the page structure. Radix handles focus, arrow-key navigation, expanded state, and trigger/panel relationships. Accordion motion respects reduced-motion preferences.

### Radio groups and checkboxes

```tsx
<RadioGroup name="plan" defaultValue="personal" aria-label="Workspace plan">
  <label><RadioGroupItem value="personal" /> Personal</label>
  <label><RadioGroupItem value="team" /> Team</label>
</RadioGroup>

<CheckboxGroup label="Updates" description="Choose the news you want.">
  <label><Checkbox name="updates" value="releases" defaultChecked /> Releases</label>
  <label><Checkbox name="updates" value="community" /> Community</label>
</CheckboxGroup>
```

Radio groups use `value`/`onValueChange` for controlled state, or `defaultValue` for uncontrolled state. Label the group and each item. `Checkbox` keeps its native input API and input ref; `indeterminate` exposes a mixed state. Set the select-all checkbox's `checked` and `indeterminate` from your child selections. CheckboxGroup is a native fieldset: its `disabled` prop disables the contained inputs.

### Custom dropdown

```tsx
<Label htmlFor="region">Deployment region</Label>
<Dropdown name="region" defaultValue="global">
  <DropdownTrigger id="region"><DropdownValue placeholder="Choose a region" /></DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="global">Global edge</DropdownItem>
    <DropdownItem value="india">India · Mumbai</DropdownItem>
    <DropdownItem value="private" disabled>Private cloud</DropdownItem>
  </DropdownContent>
</Dropdown>
```

Use `value`/`onValueChange` for controlled selection and `open`/`onOpenChange` for controlled popup state. Triggers support `variant="satin"` (default) or `"outline"`. Items accept optional decorative `icon` nodes. Use DropdownGroup, DropdownLabel, and DropdownSeparator to organize options. Item values must be nonempty strings; an empty root value displays the placeholder.

The popup supports keyboard navigation, typeahead, Escape, collision handling, scrolling, disabled options, and focus restoration. By default its portal is mounted inside the nearest ThemeProvider, preserving nested themes and custom token overrides. If you specify a custom `container` on DropdownContent, make sure it is inside an appropriate theme boundary. `Dropdown` selects a form value; it is not an action menu or a searchable combobox.

### Chips

```tsx
<Chip variant="satin">React</Chip>
<ChipButton selected={selected} onClick={() => setSelected(!selected)}>React</ChipButton>
<Chip variant="neutral">
  TypeScript
  <ChipRemoveButton aria-label="Remove TypeScript" onClick={removeTag} />
</Chip>
```

Chip is a display span; ChipButton is a controlled toggle button with `aria-pressed`. ChipRemoveButton requires an accessible label and defaults to a non-submitting button. Compose removal inside Chip, not inside ChipButton, to avoid nested buttons. Group related toggle chips with a labeled `role="group"`. Variants are satin, neutral, and outline; sizes are sm and md.

### Customization

Components accept `className` and forward refs. `cn` resolves conflicting **prefixed** Tailwind utilities, so `className="q:px-6"` overrides a component's built-in horizontal padding. New utility classes must be compiled by your app's Tailwind build; importing the package stylesheet only provides the utilities used by Qevryn itself. Regular custom CSS classes also work. Non-prefixed Tailwind classes are preserved, but do not get conflict resolution against Qevryn's prefixed utilities.

Theme tokens can be changed without recompiling Tailwind:

```css
/* Load your overrides after the Qevryn stylesheet. */
.my-theme {
  --qv-pink: #f58aca;
  --qv-purple: #aa8bff;
}
```

```tsx
<ThemeProvider theme="dark" className="my-theme">...</ThemeProvider>
```

Public color tokens: `--qv-canvas`, `--qv-surface`, `--qv-control`, `--qv-foreground`, `--qv-muted`, `--qv-border`, `--qv-pink`, `--qv-purple`, `--qv-on-accent`, `--qv-danger`, `--qv-success`, and `--qv-shadow`. Check contrast when changing colors, particularly `--qv-on-accent` against pink and purple fills.

## Validation and next steps

Tests cover native form values/reset, controlled switching and radio selection, mixed checkboxes, loading clicks, refs, accordion keyboard navigation and controlled/multiple states, dropdown selection/Escape and nested-theme portals, chip toggling/removal, nested themes, separators, class overrides, and structural accessibility. jsdom tests do not measure rendered color contrast.

Later additions can include searchable comboboxes, action menus, tabs, and a separate composed-components package. The library is MIT licensed.

## Publishing a release

The public package is `@qevryn/ui`; the root workspace and preview app remain private. Only the library's compiled output, TypeScript declarations, README, package metadata, and license are included in the archive.

Update `packages/ui/package.json` to a new version, update the changelog, commit the release, then run:

```sh
npm login
pnpm check
pnpm --filter @qevryn/ui publish --access public
```

The prepack step builds the library before publishing. npm may require browser authorization or two-factor verification. Never commit npm tokens. Each published version is immutable; use a new version number for subsequent releases.

Architecture references: [Turborepo task configuration](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks), [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite), [Vite library mode](https://vite.dev/guide/build#library-mode), [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion).
