// Stops Gleam re-resolving dependency versions in a fresh build directory.
//
//   bun tools/gleam-path-fingerprints.mjs [project-dir]
//
// Why: before trusting manifest.toml, Gleam 1.18 checks that each PATH
// dependency's gleam.toml is unchanged, against a fingerprint it keeps in
// build/packages/<name>.config_fingerprint. A missing fingerprint counts as
// "changed" and forces a full version resolution -- about forty requests to
// repo.hex.pm. Worse, it writes only ONE missing fingerprint per command and
// returns early, so with two path dependencies (fsrs, wire) the first TWO
// gleam commands in any fresh directory each resolve against Hex.
// (compiler-cli/src/dependencies.rs, path_dependency_configs_unchanged.)
//
// That is what broke the web image: `gleam deps download` resolved, then the
// first `gleam build` inside `make bundle` resolved again, on a CI runner that
// had already made several resolutions, and Hex answered 429.
//
// This writes every path dependency's fingerprint up front, exactly as Gleam
// would (decimal xxh3_64 of the gleam.toml bytes; Bun.hash.xxHash3 is the same
// function, checked against files Gleam wrote). With them in place and the
// manifest's requirements unchanged, Gleam trusts the manifest and only
// downloads tarballs.
//
// Safe to be wrong: if a Gleam upgrade renames the file or changes the hash,
// Gleam ignores or rejects these and resolves as it always did. It is also only
// ever run right before resolution would happen anyway, against the configs
// that are on disk, so it cannot hide a real change in fsrs or wire.

import { mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? ".";
const config = await Bun.file(join(root, "gleam.toml")).text();

// Path dependencies can sit in either table; Gleam checks both.
const pathDeps = [];
let section = "";
for (const line of config.split("\n")) {
  const header = line.match(/^\s*\[([^\]]+)\]\s*$/);
  if (header) {
    section = header[1].trim();
    continue;
  }
  if (section !== "dependencies" && section !== "dev-dependencies") continue;
  const dep = line.match(/^\s*([a-z][a-z0-9_]*)\s*=\s*\{\s*path\s*=\s*"([^"]+)"\s*\}/);
  if (dep) pathDeps.push({ name: dep[1], path: dep[2] });
}

const packages = join(root, "build", "packages");
mkdirSync(packages, { recursive: true });

for (const { name, path } of pathDeps) {
  const bytes = await Bun.file(join(root, path, "gleam.toml")).arrayBuffer();
  const fingerprint = Bun.hash.xxHash3(bytes).toString();
  await Bun.write(join(packages, `${name}.config_fingerprint`), fingerprint);
  console.log(`fingerprinted ${name} (${path}/gleam.toml)`);
}
