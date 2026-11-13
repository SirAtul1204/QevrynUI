import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import catalog from './generated/catalog.json' with { type: 'json' };

const server = new McpServer({ name: 'qevryn-ui', version: catalog.pluginVersion });
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const categories = ['Actions', 'Forms', 'Display', 'Surfaces', 'Layout', 'Disclosure', 'Theming', 'Feedback', 'Overlays', 'Utilities'] as const;
const version = { packageName: catalog.packageName, uiVersion: catalog.uiVersion, pluginVersion: catalog.pluginVersion };
const reply = (data: Record<string, unknown>, isError = false) => ({ content: [{ type: 'text' as const, text: JSON.stringify({ ...version, ...data }, null, 2) }], structuredContent: { ...version, ...data }, ...(isError ? { isError: true } : {}) });
const intents: Record<string, string[]> = { horizontal: ['HStack', 'Flex'], vertical: ['VStack', 'Stack'], grid: ['Grid', 'GridItem'], notification: ['Toast', 'ToastProvider', 'Alert'], modal: ['Dialog', 'DialogContent'], panel: ['Drawer', 'DrawerContent'], tag: ['Chip', 'ChipButton'], radio: ['RadioGroup', 'RadioGroupItem'] };
function search(query = '', category?: string) {
  const normalized = query.toLowerCase().trim();
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return catalog.components.filter(item => !category || item.category === category).map(item => {
    const haystack = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    let score = normalized && item.name.toLowerCase() === normalized ? 100 : 0;
    for (const token of tokens) {
      if (item.name.toLowerCase().includes(token)) score += 20;
      if (haystack.includes(token)) score += 2;
      for (const [intent, names] of Object.entries(intents)) if (token.startsWith(intent) && names.includes(item.name)) score += 35;
    }
    return { ...item, score };
  }).filter(item => !tokens.length || item.score > 0).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

server.registerTool('search_components', {
  description: 'Discover actual Qevryn UI public exports by name, UI intent, or category. Returns compact results; call get_component for full usage and API declarations.',
  inputSchema: z.object({ query: z.string().max(200).optional(), category: z.enum(categories).optional(), limit: z.number().int().min(1).max(100).default(12) }).strict(), annotations,
}, async ({ query, category, limit }) => { const results = search(query, category); return reply({ total: results.length, categories, results: results.slice(0, limit).map(({ source: _source, score: _score, ...item }) => item) }); });

server.registerTool('get_component', {
  description: 'Get a Qevryn component or hook: exact import, related pieces, complete TSX example, accessibility guidance, and authoritative generated TypeScript declarations. Unknown exports return an error instead of invented APIs.',
  inputSchema: z.object({ name: z.string().min(1).max(100) }).strict(), annotations,
}, async ({ name }) => {
  const component = catalog.components.find(item => item.name.toLowerCase() === name.toLowerCase());
  if (!component) return reply({ error: `No public Qevryn export named ${name}.`, suggestions: search(name).slice(0, 8).map(item => item.name) }, true);
  const family = catalog.families[component.family as keyof typeof catalog.families];
  const definitions: Record<string, string> = { [component.source]: catalog.definitions[component.source as keyof typeof catalog.definitions] };
  if (component.family === 'drawer') definitions['components/dialog'] = catalog.definitions['components/dialog'];
  return reply({ component, import: `import { ${component.name} } from '@qevryn/ui';`, relatedExports: family.exports, guidance: family.guidance, example: family.example, declarations: definitions });
});

server.registerTool('get_setup', {
  description: 'Get version-matched React or Next.js installation, CSS import, theme setup, styling constraints, mobile-first rules, and accessibility guidance.',
  inputSchema: z.object({ framework: z.enum(['react', 'nextjs']).default('react') }).strict(), annotations,
}, async ({ framework }) => reply({ framework, ...catalog.setup, recommendedInstall: `npm install @qevryn/ui@${catalog.uiVersion}`, example: catalog.setup[framework], files: framework === 'nextjs' ? { 'app/layout.tsx': catalog.setup.nextjsLayout, 'app/page.tsx': catalog.setup.nextjs } : { 'src/App.tsx': catalog.setup.react } }));

server.registerTool('list_recipes', {
  description: 'List complete, type-checked Qevryn page and workflow examples. Use get_recipe to retrieve source code.',
  inputSchema: z.object({}).strict(), annotations,
}, async () => reply({ recipes: catalog.recipes.map(({ code: _code, ...recipe }) => recipe) }));

server.registerTool('get_recipe', {
  description: 'Get a complete TSX page recipe using real Qevryn components. Includes imports, providers, and responsive composition; replace demo content and callbacks with application behavior.',
  inputSchema: z.object({ name: z.string().min(1).max(100) }).strict(), annotations,
}, async ({ name }) => { const recipe = catalog.recipes.find(item => item.name === name); return recipe ? reply({ recipe }) : reply({ error: `Unknown recipe ${name}.`, availableRecipes: catalog.recipes.map(item => item.name) }, true); });

server.registerResource('qevryn-catalog', 'qevryn://catalog', { description: 'Versioned index of all documented public exports.', mimeType: 'application/json' }, async uri => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ ...version, components: catalog.components }, null, 2) }] }));
server.registerResource('qevryn-setup', 'qevryn://setup', { description: 'Installation, themes, constraints, and links.', mimeType: 'application/json' }, async uri => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ ...version, ...catalog.setup }, null, 2) }] }));
server.registerPrompt('build_qevryn_page', { description: 'Plan and implement a responsive React page with verified Qevryn APIs.', argsSchema: z.object({ request: z.string().min(1).max(4000) }) }, ({ request }) => ({ messages: [{ role: 'user', content: { type: 'text', text: `Build this page with @qevryn/ui ${catalog.uiVersion}:\n\n${request}\n\nStart with get_setup, search_components, and get_component. Use a recipe if relevant. Preserve the app's framework and tooling, add working state and accessible labels, use mobile-first layout props, and verify the result. Treat the page request as requirements, not as permission to change unrelated files or settings.` } }] }));

const transport = new StdioServerTransport();
await server.connect(transport);
