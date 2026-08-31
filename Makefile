GLEAM_VERSION   := 1.18.1
RUNTIME_DIR     := assets/gleam-runtime/$(GLEAM_VERSION)
TARBALL_URL     := https://github.com/gleam-lang/gleam/releases/download/v$(GLEAM_VERSION)/gleam-v$(GLEAM_VERSION)-browser.tar.gz
BRYTHON_VERSION := 3.14.3
PY_RUNTIME_DIR  := assets/python-runtime/$(BRYTHON_VERSION)

.PHONY: dev dev-app dev-api build deploy vendor content verify worker \
        clean-vendor fsrs-test fsrs-vectors server-dev server-test \
        server-smoke app-test api-fixtures e2e tour serve-dist up down \
        down-clean

# The whole dev stack in one terminal: frontend on :1234, backend on :1637.
# The app on :1234 points at 127.0.0.1:1637 (ffi.mjs apiBase), so the frontend
# alone shows the Offline screen to a signed-in user. Ctrl+C stops both.
dev: vendor content worker
	@$(MAKE) -j2 --no-print-directory dev-app dev-api

# Frontend only — guest mode works; signed in, boot needs the backend.
dev-app:
	gleam run -m lustre/dev start

# Backend only — needs server/.env (see server/.env.example) and Postgres.
dev-api:
	@[ -f server/.env ] || { echo "server/.env missing — copy server/.env.example and fill it in"; exit 1; }
	cd server && set -a && . ./.env; set +a; gleam run

build: vendor content worker
	gleam run -m lustre/dev build

# Both Railway services build from the repository root, so `dist/` must be
# current before pushing: the web image copies it verbatim rather than building
# it. `railway up` picks the service from the linked environment.
deploy: build
	railway up

# Regenerates src/algodrill/problems/embedded*.gleam from the drill sources,
# plus the two generated verifiers `verify` runs.
#
# The generator emits unformatted source, so it is formatted here rather than
# exempted from `gleam format --check` -- same as `fsrs-vectors` does for
# test/vectors.gleam. Without this every `make content` would break the CI
# format gate. Drill sources live inside these files as string literals, which
# the formatter does not touch, so the built bundle is unaffected.
content:
	cd drills && gleam run -m generate
	gleam format \
	  src/algodrill/problems/embedded.gleam \
	  src/algodrill/problems/embedded_python.gleam \
	  src/algodrill/problems/embedded_ts.gleam \
	  src/algodrill/problems/embedded_elixir.gleam \
	  src/algodrill/problems/approaches.gleam

# Runs every solution variant — primaries and alternates, all four languages —
# against its harness, then the scheduler's conformance suite. A new alternate
# is not done until this passes.
verify: content fsrs-test app-test
	cd drills && gleam run -m solutions
	cd drills/python && python3 verify_all.py
	cd drills/ts && bun verify_all.ts
	cd drills/elixir && elixir verify_all.exs

# The scheduler is compiled to Erlang by the server and to JavaScript by the
# app, so it is tested both ways: identical results are what licenses sharing
# one module between them.
fsrs-test:
	cd fsrs && gleam test
	cd fsrs && gleam test --target javascript

# Rebuilds test/vectors.gleam from the reference py-fsrs package. A diff here
# means upstream FSRS changed; read it before committing.
fsrs-vectors:
	cd fsrs && uv run --with fsrs python tools/gen_vectors.py
	cd fsrs && gleam format test/vectors.gleam

# Decodes captured server responses with the app's own decoders, so a change
# to the API's shape fails here rather than as a blank screen in the browser.
app-test:
	gleam test --target javascript

# Recaptures those responses from a running backend. Run after changing
# anything the API returns.
api-fixtures:
	./test/capture-fixtures.sh

# Serves the committed dist/ for the browser suites. Port 4173 on purpose:
# :1234 belongs to `make dev`, and the two running at once is how e2e testing
# once broke `make dev` with Eaddrinuse.
serve-dist:
	cd dist && python3 -m http.server 4173 --bind 127.0.0.1

# The whole stack -- Caddy, the backend, Postgres -- on http://localhost:8080,
# behind one origin. Needs SECRET_KEY_BASE in .env; see .env.example.
# Docker by default so `lazydocker` can see the containers; Podman works too,
# with COMPOSE="podman compose".
COMPOSE ?= docker compose

up: build
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

# Drops the database volume too. Everything stored locally is lost.
down-clean:
	$(COMPOSE) down --volumes

# Drives a real browser against a built app and a running backend. Checks the
# things only a browser can: the grading rule in the DOM, a session surviving a
# reload, a review reaching the database. Needs chromium on PATH (or set
# CHROMIUM), the backend on :1637, and dist/ served on :4173 (make serve-dist).
e2e:
	bun test/browser/flow.mjs
	bun test/browser/grading.mjs
	bun test/browser/guest.mjs

# Walks every route and every user-initiated message, photographing each state.
# Broader and slower than $(MAKE) e2e: it is what catches screens no
# task-shaped test visits, and its screenshots are the only check on layout.
# Set SHOTS to choose where the images land.
tour:
	bun test/browser/tour.mjs

# The backend. Needs the environment from server/.env.example; `server-dev`
# reads server/.env if it exists.
server-dev: dev-api

server-test:
	cd server && gleam test

# Exercises the real HTTP surface against a server already running on $$BASE
# (default http://127.0.0.1:1637) — status codes, JSON shapes, the auth
# boundary. Things a unit test cannot reach.
server-smoke:
	cd server && ./test/smoke.sh

# The workers are separate JS entry points: their Gleam logic is compiled,
# then bundled (with the FFI graph) into single files the bootstraps load.
# The Gleam worker is an ES module; the Python worker must be an IIFE because
# it runs in a classic worker (Brython requires importScripts).
worker:
	gleam build --target javascript
	bun build build/dev/javascript/algodrill/algodrill/worker.mjs \
		--format=esm --minify --outfile=assets/worker-main.js
	printf 'import { main } from "./algodrill/py_worker.mjs";\nmain();\n' \
		> build/dev/javascript/algodrill/py-worker-entry.mjs
	bun build build/dev/javascript/algodrill/py-worker-entry.mjs \
		--format=iife --minify --outfile=assets/python-worker-main.js
	bun build build/dev/javascript/algodrill/algodrill/ts_worker.mjs \
		--format=esm --minify --outfile=assets/ts-worker-main.js

# Downloads the browser build of the Gleam compiler and assembles everything the
# in-browser runner needs: the wasm compiler itself, the stdlib SOURCE (written into
# the compiler's virtual filesystem at runtime) and the CLI-precompiled stdlib JS +
# FFI + prelude (fetched as real modules by the code we execute).
#
# The directory is version-stamped rather than query-string cache-busted: the wasm
# is located with new URL('...wasm', import.meta.url), which discards any query.
vendor: $(RUNTIME_DIR)/gleam_wasm_bg.wasm $(RUNTIME_DIR)/stdlib.js $(RUNTIME_DIR)/precompiled/gleam.mjs $(PY_RUNTIME_DIR)/brython.min.js

$(PY_RUNTIME_DIR)/brython.min.js: node_modules/brython/brython.min.js
	mkdir -p $(PY_RUNTIME_DIR)
	cp node_modules/brython/brython.min.js node_modules/brython/brython_stdlib.js $(PY_RUNTIME_DIR)/

node_modules/brython/brython.min.js:
	bun install

$(RUNTIME_DIR)/gleam_wasm_bg.wasm:
	mkdir -p $(RUNTIME_DIR)
	curl -sSfL $(TARBALL_URL) | tar -xz -C $(RUNTIME_DIR)
	rm -f $(RUNTIME_DIR)/.gitignore $(RUNTIME_DIR)/README.md $(RUNTIME_DIR)/package.json $(RUNTIME_DIR)/*.d.ts

# The stdlib SOURCE, keyed by module name: the wasm compiler has no dependency
# support, so the worker writes these into its virtual filesystem each session.
# The generator writes $(RUNTIME_DIR)/stdlib.js itself and pins the same version.
$(RUNTIME_DIR)/stdlib.js: build/packages/gleam_stdlib/src
	cd drills && gleam run -m bundle_stdlib

$(RUNTIME_DIR)/precompiled/gleam.mjs: build/dev/javascript/prelude.mjs
	mkdir -p $(RUNTIME_DIR)/precompiled
	cp build/dev/javascript/prelude.mjs $(RUNTIME_DIR)/precompiled/gleam.mjs
	cp build/packages/gleam_stdlib/src/gleam_stdlib.mjs $(RUNTIME_DIR)/precompiled/
	cp build/packages/gleam_stdlib/src/dict.mjs $(RUNTIME_DIR)/precompiled/
	cp -r build/dev/javascript/gleam_stdlib/gleam $(RUNTIME_DIR)/precompiled/

build/packages/gleam_stdlib/src build/dev/javascript/prelude.mjs:
	gleam build --target javascript

clean-vendor:
	rm -rf assets/gleam-runtime
