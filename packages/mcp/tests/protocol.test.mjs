import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const pluginRoot = resolve(import.meta.dirname, '../../../plugins/qevryn-ui');
const catalog = JSON.parse(await readFile(resolve(import.meta.dirname, '../src/generated/catalog.json'), 'utf8'));
let client;
let stderr = '';
before(async () => {
  client = new Client({ name: 'qevryn-plugin-verifier', version: '0.1.0' });
  const transport = new StdioClientTransport({ command: process.execPath, args: [resolve(pluginRoot, 'server/index.mjs')], cwd: process.env.TEMP ?? process.cwd(), stderr: 'pipe' });
  transport.stderr?.on('data', chunk => { stderr += chunk.toString(); });
  await client.connect(transport);
});
after(async () => { await client?.close(); });
const call = async (name, args = {}) => {
  const result = await client.callTool({ name, arguments: args });
  return { result, data: result.structuredContent ?? JSON.parse(result.content[0].text) };
};

test('discovers exactly five read-only tools with no external effects', async () => {
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map(tool => tool.name).sort(), ['get_component', 'get_recipe', 'get_setup', 'list_recipes', 'search_components']);
  for (const tool of tools) {
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.annotations.destructiveHint, false);
    assert.equal(tool.annotations.openWorldHint, false);
  }
});
test('search ranks intent-specific layouts and respects categories and limits', async () => {
  const { data } = await call('search_components', { query: 'horizontal layout', category: 'Layout', limit: 2 });
  assert.equal(data.results.length, 2);
  assert(data.results.some(item => item.name === 'HStack'));
  assert(data.results.every(item => item.category === 'Layout'));
  assert.equal(data.uiVersion, '0.1.0');
});
test('every public export has real declarations and a complete usage example', async () => {
  const { data: index } = await call('search_components', { limit: 100 });
  assert.equal(index.total, catalog.components.length);
  assert(index.total >= 80);
  for (const item of index.results) {
    const { result, data } = await call('get_component', { name: item.name });
    assert(!result.isError, item.name);
    assert.equal(data.component.name, item.name);
    assert(data.import.includes(item.name));
    assert(data.example.includes("from '@qevryn/ui'"));
    assert(Object.values(data.declarations).some(value => value.includes(item.name)), item.name);
  }
});
test('unknown components and path-like inputs produce errors without filesystem access', async () => {
  for (const name of ['Combobox', '../../package.json', 'DialogRoot']) {
    const { result, data } = await call('get_component', { name });
    assert.equal(result.isError, true);
    assert(data.error.includes('No public Qevryn export'));
  }
});
test('validates malformed arguments at the protocol boundary', async () => {
  assert.equal((await client.callTool({ name: 'search_components', arguments: { limit: 101 } })).isError, true);
  assert.equal((await client.callTool({ name: 'get_setup', arguments: { framework: 'vue' } })).isError, true);
});
test('provides separate Next.js server layout and client page files', async () => {
  const { data } = await call('get_setup', { framework: 'nextjs' });
  assert(data.files['app/page.tsx'].startsWith("'use client';"));
  assert(data.files['app/layout.tsx'].includes("import '@qevryn/ui/styles.css'"));
  assert(data.recommendedInstall.endsWith('@0.1.0'));
});
test('serves all page recipes and rejects an invented one', async () => {
  const { data } = await call('list_recipes');
  assert.equal(data.recipes.length, 4);
  for (const item of data.recipes) {
    const { data } = await call('get_recipe', { name: item.name });
    assert(data.recipe.code.includes('export default function Example'));
  }
  assert((await call('get_recipe', { name: 'invented' })).result.isError);
});
test('exposes versioned MCP resources and a page-building prompt', async () => {
  const { resources } = await client.listResources();
  assert.equal(resources.length, 2);
  const resource = await client.readResource({ uri: 'qevryn://catalog' });
  assert.equal(JSON.parse(resource.contents[0].text).components.length, catalog.components.length);
  const prompt = await client.getPrompt({ name: 'build_qevryn_page', arguments: { request: 'A responsive settings page' } });
  assert(prompt.messages[0].content.text.includes('A responsive settings page'));
});
test('keeps protocol output clean and ships a matching portable plugin', async () => {
  assert.equal(stderr, '');
  const manifest = JSON.parse(await readFile(resolve(pluginRoot, 'plugin.json'), 'utf8'));
  const compatibility = JSON.parse(await readFile(resolve(pluginRoot, '.codex-plugin/plugin.json'), 'utf8'));
  assert.equal(manifest.name, compatibility.name);
  assert.equal(manifest.version, compatibility.version);
  assert(manifest.extensions['com.openai'].interface.shortDescription.length <= 30);
  const mcp = JSON.parse(await readFile(resolve(pluginRoot, 'mcp.json'), 'utf8'));
  assert.equal(mcp.mcpServers.qevryn.args[0], '${PLUGIN_ROOT}/server/index.mjs');
  assert((await readFile(resolve(pluginRoot, 'skills/build-with-qevryn/SKILL.md'), 'utf8')).replaceAll('\r\n', '\n').startsWith('---\nname: build-with-qevryn'));
});
