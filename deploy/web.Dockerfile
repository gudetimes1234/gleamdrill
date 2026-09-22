# The static half of the app, fronted by Caddy. Build context is the REPOSITORY
# ROOT, same as server/Dockerfile:
#
#   podman build -f deploy/web.Dockerfile -t gleamdrill-web .
#
# The builder compiles `dist/` rather than copying a committed one. That is the
# whole point: `dist/` used to be in the repository, which meant a commit could
# ship a bundle built from source it did not contain, and Railway deploys from
# main on push without waiting for CI -- so the stale bundle went live before
# any red check landed. A pre-push hook and a CI staleness gate both existed to
# paper over that, and both are gone now. If the build breaks, the deploy fails
# and the last good image keeps serving.
#
# `make bundle`, not `make build`: the bundle target skips `make content`, so
# this image needs neither Elixir nor the 1800-file drills tree, and it cannot
# regenerate drill content the commit does not contain.
FROM ghcr.io/gleam-lang/gleam:v1.18.1-erlang-alpine AS build

# Taken from the official image rather than fetched with the bun.sh installer:
# no network dependency on a shell script, and the version cannot drift from
# Makefile's BUN_VERSION without this line changing. `make check-versions`
# holds the two in step.
COPY --from=docker.io/oven/bun:1.3.14-alpine /usr/local/bin/bun /usr/local/bin/bun

RUN apk add --no-cache make

WORKDIR /build
COPY . .

# The TypeScript worker bundles `sucrase` out of node_modules, so the bundle
# step needs the dependency tree even though nothing else here does.
RUN bun install --frozen-lockfile

RUN make bundle

FROM docker.io/library/caddy:2-alpine

COPY --from=build /build/dist /srv
COPY deploy/Caddyfile /etc/caddy/Caddyfile

ENV PORT=8080
EXPOSE 8080
