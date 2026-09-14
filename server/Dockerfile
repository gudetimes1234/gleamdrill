# The backend ships as an OTP release built from the Gleam sources.
#
# Note the build context is the REPOSITORY ROOT, not server/: the scheduler is
# a path dependency at ../fsrs, shared verbatim with the browser app, so both
# directories have to be present with their relative layout intact.
#
#   podman build -f server/Dockerfile -t algodrill-api .
#
# The static half of the app is deploy/web.Dockerfile; compose.yaml wires the
# two together with Postgres.

# Elixir, not plain Erlang: the Argon2 implementation behind `antigone` is an
# Elixir package with a C NIF, so the build stage needs both toolchains.
FROM ghcr.io/gleam-lang/gleam:v1.18.1-elixir-alpine AS build

RUN apk add --no-cache build-base

# The Argon2 NIF is an Elixir package, so its build shells out to `mix` -- which
# stops to ask "Shall I install Hex?" and fails the build non-interactively.
RUN mix local.hex --force && mix local.rebar --force

WORKDIR /build
# Both path dependencies of server/gleam.toml. Miss one and
# `gleam export erlang-shipment` below fails on a path it cannot canonicalise --
# which is exactly how the wire package broke four Railway deploys.
COPY fsrs ./fsrs
COPY wire ./wire
COPY server ./server

WORKDIR /build/server
RUN gleam export erlang-shipment

# The shipment carries its own compiled beam files; the runtime image needs
# only the VM and the C libraries the NIF links against -- and Elixir itself,
# which this image has: Elixir drills run here, on the server, because no
# browser can compile Elixir source (see server/src/server/exec.gleam).
FROM ghcr.io/gleam-lang/gleam:v1.18.1-elixir-alpine

# The API stays root inside its container so it can drop to `runner` for
# each attempt with plain `su`; that uid change is the whole sandbox, since
# a process of another uid cannot read this one's /proc/<pid>/environ, which
# is where DATABASE_URL and SECRET_KEY_BASE live. A non-root API would need a
# setuid helper (doas) for the same switch, and the hosting platform ignores
# setuid bits -- doas fails there with "Operation not permitted" -- so the
# privilege has to already be held by the process that spawns the attempt.
RUN apk add --no-cache libstdc++ openssl ncurses \
 && adduser -D -H -s /sbin/nologin runner

COPY --from=build /build/server/build/erlang-shipment /app

WORKDIR /app

ENV PORT=8080 BIND=0.0.0.0 RUN_AS_USER=runner
EXPOSE 8080

# `run` is the shipment's own entrypoint verb; it boots the release and stays
# in the foreground, which is what the platform expects.
#
# Invoked through `sh` on purpose: the script Gleam generates opens with SPDX
# comments and carries no shebang, so exec-ing it directly fails with
# "Exec format error" (ENOEXEC) however executable its mode bits are.
CMD ["sh", "./entrypoint.sh", "run"]
