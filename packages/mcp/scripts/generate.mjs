import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { families } from '../content/families.mjs';
import { recipes } from '../content/recipes.mjs';
import { setup } from '../content/setup.mjs';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
export const pluginRoot = resolve(root, 'plugins/qevryn-ui');
const ui = JSON.parse(await readFile(resolve(root, 'packages/ui/package.json'), 'utf8'));
const index = ts.createSourceFile('index.ts', await readFile(resolve(root, 'packages/ui/src/index.ts'), 'utf8'), ts.ScriptTarget.Latest, true);
const components = [];
const definitions = {};
for (const statement of index.statements) {
  if (!ts.isExportDeclaration(statement) || statement.isTypeOnly || !statement.exportClause || !ts.isNamedExports(statement.exportClause)) continue;
  for (const symbol of statement.exportClause.elements) {
    if (symbol.isTypeOnly) continue;
    const name = symbol.name.text;
    const family = families.find(item => item.exports.includes(name));
    if (!family) throw new Error(`Public export ${name} has no agent documentation.`);
    const source = statement.moduleSpecifier.text.replace(/^\.\//, '');
    const declaration = resolve(root, `packages/ui/dist/types/${source}.d.ts`);
    definitions[source] = await readFile(declaration, 'utf8');
    components.push({ name, family: family.id, category: family.category, kind: name === 'cn' || name === 'buttonVariants' ? 'utility' : name.startsWith('use') ? 'hook' : 'component', description: family.description, source });
  }
}
for (const family of families) for (const name of family.exports) if (!components.some(item => item.name === name)) throw new Error(`Documented export ${name} is not public.`);

export function exampleCode(item) {
  const imports = [...new Set(['ThemeProvider', ...item.imports])];
  for (const name of imports) if (!components.some(item => item.name === name)) throw new Error(`Example imports missing export ${name}`);
  return `${item.reactImports?.length ? `import { ${item.reactImports.join(', ')} } from 'react';\n` : ''}import { ${imports.join(', ')} } from '@qevryn/ui';\nimport '@qevryn/ui/styles.css';\n\n${item.setup ?? ''}\nexport default function Example() {\n  return <ThemeProvider theme="dark">${item.body}</ThemeProvider>;\n}\n`;
}
export const catalog = {
  schemaVersion: 1, pluginVersion: '0.1.0', uiVersion: ui.version, packageName: ui.name,
  components: components.sort((a, b) => a.name.localeCompare(b.name)),
  families: Object.fromEntries(families.map(family => [family.id, { title: family.title, description: family.description, category: family.category, exports: family.exports, guidance: family.guidance, example: exampleCode(family) }])),
  definitions, setup,
  recipes: recipes.map(recipe => ({ name: recipe.name, title: recipe.title, description: recipe.description, code: exampleCode(recipe) })),
};
const generated = resolve(root, 'packages/mcp/src/generated');
await mkdir(generated, { recursive: true });
await mkdir(resolve(generated, 'examples'), { recursive: true });
await writeFile(resolve(generated, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
for (const family of families) await writeFile(resolve(generated, `examples/${family.id}.tsx`), exampleCode(family));
for (const recipe of catalog.recipes) await writeFile(resolve(generated, `examples/recipe-${recipe.name}.tsx`), recipe.code);
await writeFile(resolve(generated, 'examples/setup-react.tsx'), setup.react);
await writeFile(resolve(generated, 'examples/setup-nextjs-page.tsx'), setup.nextjs);
await writeFile(resolve(generated, 'examples/setup-nextjs-layout.tsx'), setup.nextjsLayout);
await mkdir(resolve(pluginRoot, 'skills/build-with-qevryn/references'), { recursive: true });
const references = resolve(pluginRoot, 'skills/build-with-qevryn/references');
await writeFile(resolve(references, 'setup.md'), `# Qevryn ${ui.version} setup\n\n\`\`\`sh\n${setup.install}\n\`\`\`\n\n\`\`\`tsx\n${setup.react}\n\`\`\`\n\n${setup.guidelines.map(item => `- ${item}`).join('\n')}\n\nTheme tokens: ${setup.tokens.join(', ')}.\n`);
await writeFile(resolve(references, 'setup.md'), `\n## Next.js App Router\n\nRoot layout (app/layout.tsx):\n\n\`\`\`tsx\n${setup.nextjsLayout}\n\`\`\`\n\nClient page (app/page.tsx):\n\n\`\`\`tsx\n${setup.nextjs}\n\`\`\`\n`, { flag: 'a' });
await writeFile(resolve(references, 'catalog.md'), `# Component index — @qevryn/ui ${ui.version}\n\n` + families.map(family => `## ${family.title}\n\nExports: ${family.exports.join(', ')}.\n\n${family.description}\n\nRead [${family.title}](${family.id}.md) before implementing.\n`).join('\n'));
for (const family of families) {
  const sources = [...new Set(components.filter(item => item.family === family.id).map(item => item.source))];
  // Drawer aliases refer to dialog props; include those declarations too.
  if (family.id === 'drawer') sources.push('components/dialog');
  await writeFile(resolve(references, `${family.id}.md`), `# ${family.title}\n\nVersion: @qevryn/ui ${ui.version}.\n\n${family.guidance}\n\n\`\`\`tsx\n${exampleCode(family)}\n\`\`\`\n\n## Actual public declarations\n\n` + sources.map(source => `\`\`\`ts\n${definitions[source]}\n\`\`\`\n`).join('\n'));
}
await writeFile(resolve(references, 'recipes.md'), '# Page recipes\n\n' + catalog.recipes.map(recipe => `## ${recipe.title}\n\n${recipe.description}\n\n\`\`\`tsx\n${recipe.code}\n\`\`\`\n`).join('\n'));
