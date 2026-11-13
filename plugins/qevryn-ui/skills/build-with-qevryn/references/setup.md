# Qevryn 0.1.0 setup

```sh
npm install @qevryn/ui
```

```tsx
import { ThemeProvider, Button } from '@qevryn/ui';
import '@qevryn/ui/styles.css';

export default function App() {
  return <ThemeProvider theme="dark"><main style={{ background: 'var(--qv-canvas)', minHeight: '100vh', padding: '1rem' }}><h1>Your next idea</h1><Button>Launch</Button></main></ThemeProvider>;
}
```

- Requires React and React DOM 18 or 19. This catalog targets the recorded UI version, not arbitrary future releases.
- Import the compiled stylesheet once. Consuming projects do not need Tailwind.
- Wrap library components in ThemeProvider; theme is dark, light, or system. Set a matching canvas background in your app when wanted.
- Only q: utilities already compiled by the library exist without a consumer Tailwind build. Use native style or app CSS for additional styling.
- Use mobile-first Responsive<T> values: base then sm 640, md 768, lg 1024, xl 1280, 2xl 1536 pixels. Use gap/padding tokens, not pixel counts.
- Use Button for actions, Link for navigation. Icons are normal React children, supplied by the app; add accessible names to icon-only actions.
- Use native Input/Select/Checkbox fields or Radix-backed components according to their actual APIs. Do not invent Form, Combobox, Tabs, DropdownMenu, or AlertDialog exports.
- Use labels, helper/error associations, semantic page headings, focus visibility, and the title/description parts of dialogs and drawers.
- Wrap ToastProvider inside ThemeProvider. Tooltip requires TooltipProvider. Modal/select content handles its own themed portal.
- Examples with placeholder callbacks demonstrate composition. Replace them with real state, navigation, and save logic when implementing an app.
- For Next.js, import CSS in the root layout, and put event handlers/hooks in a client component. Package entry carries use client.
- Check the consuming app at small and large viewports and exercise keyboard interactions. No tool here writes project files, executes code, or makes network requests.

Theme tokens: --qv-canvas, --qv-surface, --qv-control, --qv-foreground, --qv-muted, --qv-border, --qv-pink, --qv-purple, --qv-on-accent, --qv-danger, --qv-success, --qv-warning, --qv-info, --qv-shadow.

## Next.js App Router

Root layout (app/layout.tsx):

```tsx
import type { ReactNode } from 'react';
import { ThemeProvider } from '@qevryn/ui';
import '@qevryn/ui/styles.css';
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body><ThemeProvider theme="dark">{children}</ThemeProvider></body></html>; }

```

Client page (app/page.tsx):

```tsx
'use client';
import { Button } from '@qevryn/ui';
export default function Page() { return <main><h1>Your next idea</h1><Button onClick={() => {}}>Launch</Button></main>; }

```
