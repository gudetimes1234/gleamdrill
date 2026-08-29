# The static half of the app, fronted by Caddy. Build context is the REPOSITORY
# ROOT, same as server/Dockerfile:
#
#   podman build -f deploy/web.Dockerfile -t algodrill-web .
#
# `dist/` is committed and needs no build step to serve, which is how this has
# always been deployed. The tradeoff is that a stale `dist/` ships silently, so
# run `make build` before deploying. Building it in here instead would drag the
# whole gleam + bun + vendored-runtime toolchain into the image.
FROM docker.io/library/caddy:2-alpine

COPY dist /srv
COPY deploy/Caddyfile /etc/caddy/Caddyfile

ENV PORT=8080
EXPOSE 8080
