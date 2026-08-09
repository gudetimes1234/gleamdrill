GLEAM_VERSION := 1.18.1
RUNTIME_DIR   := assets/gleam-runtime/$(GLEAM_VERSION)
TARBALL_URL   := https://github.com/gleam-lang/gleam/releases/download/v$(GLEAM_VERSION)/gleam-v$(GLEAM_VERSION)-browser.tar.gz

.PHONY: dev build deploy vendor content worker clean-vendor

dev: vendor content worker
	gleam run -m lustre/dev start

build: vendor content worker
	gleam run -m lustre/dev build

deploy: build
	vercel deploy --prod

# Regenerates src/algodrill/problems/embedded.gleam from the drill sources.
content:
	cd drills && gleam run -m generate

# The worker is a separate JS entry point: its Gleam logic is compiled, then
# bundled (with its FFI graph) into a single file the bootstrap imports. The
# computed dynamic import()s inside worker_ffi.mjs stay runtime code.
worker:
	gleam build --target javascript
	bun build build/dev/javascript/algodrill/algodrill/worker.mjs \
		--format=esm --minify --outfile=assets/worker-main.js

# Downloads the browser build of the Gleam compiler and assembles everything the
# in-browser runner needs: the wasm compiler itself, the stdlib SOURCE (written into
# the compiler's virtual filesystem at runtime) and the CLI-precompiled stdlib JS +
# FFI + prelude (fetched as real modules by the code we execute).
#
# The directory is version-stamped rather than query-string cache-busted: the wasm
# is located with new URL('...wasm', import.meta.url), which discards any query.
vendor: $(RUNTIME_DIR)/gleam_wasm_bg.wasm $(RUNTIME_DIR)/stdlib.js $(RUNTIME_DIR)/precompiled/gleam.mjs

$(RUNTIME_DIR)/gleam_wasm_bg.wasm:
	mkdir -p $(RUNTIME_DIR)
	curl -sSfL $(TARBALL_URL) | tar -xz -C $(RUNTIME_DIR)
	rm -f $(RUNTIME_DIR)/.gitignore $(RUNTIME_DIR)/README.md $(RUNTIME_DIR)/package.json $(RUNTIME_DIR)/*.d.ts

$(RUNTIME_DIR)/stdlib.js: build/packages/gleam_stdlib/src
	node scripts/build-stdlib-bundle.js build/packages/gleam_stdlib/src $@

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
