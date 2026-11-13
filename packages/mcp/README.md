# @qevryn/mcp

Private build/test workspace for the Qevryn UI agent plugin. It is not an npm-published package.

- `content/`: curated component-family intent, complete usage examples, setup guidance, and page recipes.
- `scripts/generate.mjs`: checks coverage of real public exports, reads UI declarations, emits a catalog and type-checkable examples, and writes offline skill references.
- `src/server.ts`: five read-only MCP tools, two resources, and a page-building prompt using the official MCP v2 SDK.
- `scripts/build.mjs`: creates a portable bundled server with dependency licenses and synchronized compatibility manifests.
- `tests/protocol.test.mjs`: launches the actual bundle through a stdio MCP client and exercises discovery, validation, every component, resources, and prompts.
- `scripts/pack.mjs`: validates manifests, YAML, references, and archive contents.

Use root `pnpm check` so Turborepo builds the UI first, generates the plugin once, then runs its type and protocol checks. Use root `pnpm pack:plugin` for the distributable archive. End-user installation is documented in [the plugin README](../../plugins/qevryn-ui/README.md).
