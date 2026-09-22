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

# Dependencies first, in their own layers, so editing a drill or a view does
# not re-fetch anything. That is not only about speed: Hex rate-limits per IP,
# CI builds this image and the api image back to back on one runner, and the
# first version of this file failed there because `make bundle` re-resolved
# from scratch on every build. A cached layer is what keeps a busy runner --
# or a busy Railway builder -- from failing on somebody else's traffic.
#
# `gleam deps download` needs the path dependencies present to read their
# manifests, which is why fsrs and wire are copied before the rest.
COPY gleam.toml manifest.toml ./
COPY fsrs fsrs
COPY wire wire
RUN gleam deps download

# The TypeScript worker bundles `sucrase` out of node_modules, so the bundle
# step needs the dependency tree even though nothing else here does.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN make bundle

FROM docker.io/library/caddy:2-alpine

COPY --from=build /build/dist /srv
COPY deploy/Caddyfile /etc/caddy/Caddyfile

ENV PORT=8080
EXPOSE 8080
