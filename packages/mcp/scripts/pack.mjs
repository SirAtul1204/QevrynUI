import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, lstat, readdir, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { root, pluginRoot } from './paths.mjs';
import YAML from 'yaml';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
async function inspect(directory) {
  for (const name of await readdir(directory)) {
    const path = resolve(directory, name);
    const info = await lstat(path);
    if (info.isSymbolicLink() || name === 'node_modules' || name.startsWith('.env')) throw new Error(`Forbidden archive entry: ${path}`);
    if (info.isDirectory()) await inspect(path);
  }
}
await inspect(pluginRoot);
const manifest = JSON.parse(await readFile(resolve(pluginRoot, 'plugin.json'), 'utf8'));
if (manifest.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') throw new Error('Invalid portable manifest schema');
const presentation = manifest.extensions['com.openai'].interface;
if (presentation.shortDescription.length > 30 || presentation.category !== 'Developer Tools') throw new Error('Invalid plugin presentation');
for (const icon of [presentation.logo, presentation.composerIcon]) if (!(await lstat(resolve(pluginRoot, icon))).isFile()) throw new Error('Missing icon');
for (const name of await readdir(resolve(pluginRoot, 'skills'))) {
  const directory = resolve(pluginRoot, 'skills', name);
  const text = await readFile(resolve(directory, 'SKILL.md'), 'utf8');
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const metadata = frontmatter && YAML.parse(frontmatter[1]);
  if (!metadata || metadata.name !== name || typeof metadata.description !== 'string' || !metadata.description.trim()) throw new Error('Invalid skill frontmatter');
  const agent = YAML.parse(await readFile(resolve(directory, 'agents/openai.yaml'), 'utf8'));
  if (typeof agent.interface.display_name !== 'string' || typeof agent.interface.short_description !== 'string' || typeof agent.policy.allow_implicit_invocation !== 'boolean') throw new Error('Invalid agent metadata');
  for (const match of text.matchAll(/\]\((references\/[^)]+)\)/g)) await lstat(resolve(directory, match[1]));
}
const mcp = JSON.parse(await readFile(resolve(pluginRoot, 'mcp.json'), 'utf8'));
if (mcp.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json' || mcp.mcpServers.qevryn.type !== 'stdio') throw new Error('Invalid MCP manifest');
await mkdir(resolve(root, 'artifacts'), { recursive: true });
const archive = resolve(root, `artifacts/qevryn-ui-plugin-${manifest.version}.tgz`);
execFileSync('tar', ['-czf', archive, '-C', resolve(root, 'plugins'), 'qevryn-ui']);
const entries = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' }).trim().split(/\r?\n/);
for (const required of ['plugin.json', 'mcp.json', '.codex-plugin/plugin.json', '.mcp.json', 'server/index.mjs', 'skills/build-with-qevryn/SKILL.md', 'LICENSE', 'THIRD_PARTY_LICENSES.txt']) if (!entries.includes(`qevryn-ui/${required}`)) throw new Error(`Missing ${required}`);
if (entries.some(entry => !entry.startsWith('qevryn-ui/') || entry.includes('../'))) throw new Error('Invalid archive root');
const extracted = await mkdtemp(resolve(root, 'artifacts/plugin-package-'));
execFileSync('tar', ['-xzf', archive, '-C', extracted]);
const client = new Client({ name: 'qevryn-archive-verifier', version: manifest.version });
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [resolve(extracted, 'qevryn-ui/server/index.mjs')], cwd: extracted }));
  const { tools } = await client.listTools();
  if (tools.length !== 5) throw new Error('Packed tools missing');
  const result = await client.callTool({ name: 'get_component', arguments: { name: 'Dialog' } });
  if (result.isError || !JSON.parse(result.content[0].text).example.includes('DialogTitle')) throw new Error('Packed component lookup failed');
} finally { await client.close(); }
console.error(`Inspected ${entries.length} archive entries: ${relative(root, archive)}`);
