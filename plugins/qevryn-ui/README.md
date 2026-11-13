# Qevryn UI agent plugin

Helps AI coding agents discover and use `@qevryn/ui` to build React apps and pages. Version 0.1.0 documents **UI 0.1.0**, with **83 public exports**, complete typed examples, and four page recipes.

## What the agent gets

| Tool | Purpose |
| --- | --- |
| `search_components` | Search by component name, intent, or category; return compact summaries |
| `get_component` | Exact import, related parts, usage example, accessibility notes, and actual public declarations |
| `get_setup` | React/Next.js installation, separate app files, themes, styling constraints, and responsive rules |
| `list_recipes` | Discover complete page examples |
| `get_recipe` | Get a dashboard, settings form, pricing page, or controlled edit dialog |

MCP resources: `qevryn://catalog`, `qevryn://setup`. Prompt: `build_qevryn_page`. The bundled `build-with-qevryn` skill guides implementation and has offline references when tools are unavailable.

## Install in Codex

Requires Node.js 22.12+ on the agent host. The server is bundled, so users do not need to install this monorepo's dependencies to use the plugin.

From a local checkout:

```sh
codex plugin marketplace add /absolute/path/to/QevrynUI
codex plugin add qevryn-ui@qevryn
```

The marketplace can also be registered from the GitHub repository once this source is pushed:

```sh
codex plugin marketplace add https://github.com/SirAtul1204/QevrynUI.git
codex plugin add qevryn-ui@qevryn
```

Reload the agent session if newly installed tools do not appear. The portable `plugin.json`/`mcp.json` package and `.codex-plugin` compatibility overlay are included. This is a local, stdio plugin; it is not a hosted web/mobile connector or a public plugin-directory listing.

## Use in another MCP client

Point a stdio-capable client at the bundled server (replace the path):

```json
{
  "mcpServers": {
    "qevryn": {
      "command": "node",
      "args": ["/absolute/path/to/QevrynUI/plugins/qevryn-ui/server/index.mjs"]
    }
  }
}
```

In Codex, the equivalent server-only registration is:

```sh
codex mcp add qevryn -- node /absolute/path/to/QevrynUI/plugins/qevryn-ui/server/index.mjs
```

Use either the full plugin or server-only configuration in the same client, to avoid duplicate tool sets. Full plugin installation adds the skill and offline references too.

Try: “Build a responsive workspace settings page with Qevryn UI.” The agent should fetch setup, discover components, read their exact APIs, then implement and verify the app.

## Privacy and behavior

The server reads its embedded versioned catalog. It requires no credentials and makes no network requests. It does not inspect the user's filesystem, execute supplied code, install packages, or edit app files. All five tools are marked read-only, non-destructive, idempotent, and closed-world. Application implementation uses the host agent's normal tools under the user's request.

The bundled catalog is a snapshot, not a live npm query. Tool responses identify the supported UI version. A newly released UI version needs regenerated documentation; compare the catalog version with the consuming app before using examples.

## Maintain and package

From the monorepo root:

```sh
pnpm install
pnpm check
pnpm pack:plugin
```

Source lives in `packages/mcp`. The generator parses the UI's public exports and compiled declarations; every export must have curated guidance. All example modules, setup files, and recipes compile against the actual library. Builds regenerate the bundled server, compatibility manifests, offline references, and third-party notices. Generated deliverables are checked in so GitHub marketplace installs work without a build step; do not edit them by hand.

After UI API changes, update the corresponding family guidance, bump/release the UI version and plugin version as appropriate, regenerate, and run checks before distributing. No automatic npm publication or account installation is performed by this package.

The archive is written to `artifacts/qevryn-ui-plugin-0.1.0.tgz` with one `qevryn-ui/` root. It contains the plugin manifests, bundled runtime, skill/references, icon, README, MIT license, and bundled dependency notices. It excludes dependencies, symlinks, credentials, caches, and unrelated source files.
