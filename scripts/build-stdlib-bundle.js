// Emits assets/gleam-runtime/<version>/stdlib.js — the Gleam stdlib SOURCE, keyed by
// module name. The wasm compiler has no dependency support, so the stdlib has to be
// written into its virtual filesystem as if it were part of the user's own package.
const fs = require('fs');
const path = require('path');

const [, , stdlibSrc, outFile] = process.argv;
if (!stdlibSrc || !outFile) {
  console.error('usage: build-stdlib-bundle.js <gleam_stdlib/src> <out.js>');
  process.exit(1);
}

const gleamDir = path.join(stdlibSrc, 'gleam');

function collect(dir, prefix, into) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collect(full, `${prefix}${entry.name}/`, into);
    } else if (entry.name.endsWith('.gleam')) {
      into[`${prefix}${entry.name.slice(0, -'.gleam'.length)}`] = fs.readFileSync(full, 'utf8');
    }
  }
  return into;
}

const modules = collect(gleamDir, 'gleam/', {});

// Comments and blank lines are dead weight in the VFS; the compiler doesn't need them
// and they are a third of the payload.
const strip = src =>
  src
    .split('\n')
    .filter(line => line.trim() !== '' && !line.trimStart().startsWith('//'))
    .join('\n');

const escape = src => src.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

const body = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, src]) => `  ${JSON.stringify(name)}: \`${escape(strip(src))}\`,`)
  .join('\n');

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `export default {\n${body}\n};\n`);

const bytes = fs.statSync(outFile).size;
console.log(`stdlib.js: ${Object.keys(modules).length} modules, ${bytes} bytes`);
