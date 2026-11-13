---
name: build-with-qevryn
description: Use when creating or editing React apps and pages with Qevryn UI, choosing its components, checking their APIs, or applying Prism Satin styling and responsive layouts.
---

# Build with Qevryn UI

Use the published `@qevryn/ui` React library for the user's app. This plugin provides versioned knowledge and read-only MCP tools; it does not modify projects itself.

1. Inspect the consuming app's framework, React version, package manager, and existing styles. Follow its project instructions.
2. Call `get_setup` for React or Next.js. Install the compatible library version, import `@qevryn/ui/styles.css` once, and use ThemeProvider. Do not reinstall or replace an existing setup unnecessarily.
3. Call `search_components` with the user's intent. Call `get_component` for the relevant public export before writing code. Read the returned declarations and guidance; do not invent props or exports.
4. For a complete page, call `list_recipes` and `get_recipe`. Adapt the recipe's layout and components to the user's content and real application state. Replace placeholder callbacks with working behavior.
5. Compose mobile-first layouts with Container, Stack/HStack/VStack, Grid, and GridItem. Use `base` for mobile and progressively enhance at sm/md/lg/xl/2xl.
6. Preserve the Prism Satin tokens and dark/light/system themes. Components already own their surfaces and focus styles. For custom app styling use CSS or native style; arbitrary `q:` classes are not automatically present in the precompiled library CSS.
7. Add labels, accessible names, semantic headings, field errors, and the required dialog/drawer titles. Keep tooltips supplementary and non-interactive. ToastProvider belongs inside ThemeProvider and includes its own viewport.
8. Run the consuming app's type checks/build and verify mobile/desktop layout and keyboard interaction. Summarize the implemented behavior and any real remaining limitation.

## When the MCP tools are unavailable

Use the bundled references directly. Start with [setup](references/setup.md) and the [component index](references/catalog.md), then read only the relevant component-family file. [Page recipes](references/recipes.md) contain complete examples. These files are generated from the same catalog as the tools.

## Version and scope

The tool responses and references record the supported UI version. Compare it with the consuming app's installed version; do not assume a newer package has identical exports. The server reads only its bundled catalog and never installs dependencies, evaluates user code, reads arbitrary files, calls external services, or edits the app. Use normal project tools only when the user requests implementation.
