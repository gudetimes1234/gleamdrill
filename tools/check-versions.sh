#!/usr/bin/env bash
#
# The Gleam and Brython versions are pinned independently in eight places, and
# the comments beside each one say they must agree. Nothing enforced that, so
# this does: it takes the Makefile's variables as the source of truth and
# asserts every other site names the same version.
#
# A mismatch is not cosmetic. The browser runtime under assets/gleam-runtime is
# the wasm build of exactly the compiler in GLEAM_VERSION, and runner.gleam
# builds its fetch URLs from its own copy of the string -- so a drifted pin is
# a 404 at runtime, in a worker, where nobody sees it.
set -euo pipefail

cd "$(dirname "$0")/.."

gleam_version=$(sed -n 's/^GLEAM_VERSION[[:space:]]*:=[[:space:]]*//p' Makefile)
brython_version=$(sed -n 's/^BRYTHON_VERSION[[:space:]]*:=[[:space:]]*//p' Makefile)

[ -n "$gleam_version" ] || { echo "cannot read GLEAM_VERSION from Makefile"; exit 1; }
[ -n "$brython_version" ] || { echo "cannot read BRYTHON_VERSION from Makefile"; exit 1; }

status=0

# expect <file> <literal> <description>
expect() {
  if grep -qF -- "$2" "$1"; then
    printf '  ok    %-40s %s\n' "$3" "$2"
  else
    printf '  FAIL  %-40s expected %s\n' "$3" "$2"
    status=1
  fi
}

echo "Gleam $gleam_version (from Makefile GLEAM_VERSION)"
expect .github/workflows/ci.yml      "gleam-version: \"$gleam_version\""        "ci.yml setup-beam"
expect server/Dockerfile             "gleam:v$gleam_version-elixir-alpine"      "server/Dockerfile images"
expect src/algodrill/runner.gleam    "pub const gleam_version = \"$gleam_version\"" "runner.gleam gleam_version"
expect src/algodrill/worker.gleam    "const default_version = \"$gleam_version\""   "worker.gleam default_version"
expect drills/src/bundle_stdlib.gleam "const runtime_version = \"$gleam_version\""  "bundle_stdlib.gleam"

echo "Brython $brython_version (from Makefile BRYTHON_VERSION)"
expect package.json                  "\"brython\": \"$brython_version\""        "package.json dependency"
expect src/algodrill/runner.gleam    "pub const python_version = \"$brython_version\"" "runner.gleam python_version"

# server/Dockerfile names the image twice (build stage and runtime stage); a
# half-done bump is the likeliest mistake, so count rather than just match.
occurrences=$(grep -cF -- "gleam:v$gleam_version-elixir-alpine" server/Dockerfile)
if [ "$occurrences" -ne 2 ]; then
  printf '  FAIL  %-40s expected 2 pinned images, found %s\n' "server/Dockerfile stages" "$occurrences"
  status=1
fi

if [ "$status" -eq 0 ]; then
  echo "All version pins agree."
else
  echo
  echo "Version pins disagree. Update every site above, plus the vendored"
  echo "runtime: make clean-vendor && make vendor"
fi

exit "$status"
