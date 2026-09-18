# The backend ships as an OTP release built from the Gleam sources.
#
# Note the build context is the REPOSITORY ROOT, not server/: the scheduler is
# a path dependency at ../fsrs, shared verbatim with the browser app, so both
# directories have to be present with their relative layout intact.
#
#   podman build -f server/Dockerfile -t gleamdrill-api .
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
# A deliberately odd uid: RLIMIT_NPROC (server/priv/run-elixir) counts every
# process of that uid on the *host*, and on a shared platform uid 1000 is
# everyone's first user -- the cap tripped on other tenants' processes before
# a single attempt had forked.
RUN apk add --no-cache libstdc++ openssl ncurses go \
 && adduser -D -H -s /sbin/nologin -u 31337 runner

# Go drills run here too (server/priv/run-go). Compiling an attempt means
# compiling the standard library packages it imports unless they are in
# the build cache, so the cache is warmed once, here, as the user the
# attempts run as -- encoding/json and friends take twenty seconds cold and
# under a second warm. GOFLAGS as in run-go, so the cache keys match.
RUN mkdir -p /opt/gocache /tmp/gowarm && chown runner /opt/gocache \
 && printf 'module warm\n\ngo 1.21\n' > /tmp/gowarm/go.mod \
 && printf 'package main\nimport (_ "encoding/json"; _ "fmt"; _ "os"; _ "runtime/debug"; _ "sort"; _ "strconv"; _ "strings"; _ "math"; _ "container/heap"; _ "container/list"; _ "math/bits"; _ "slices"; _ "unicode"; _ "bytes"; _ "math/rand")\nfunc main() {}\n' > /tmp/gowarm/main.go \
 && chmod -R a+rX /tmp/gowarm \
 && su -s /bin/sh runner -c 'cd /tmp/gowarm && HOME=/tmp GOCACHE=/opt/gocache GOFLAGS=-mod=mod GOTOOLCHAIN=local CGO_ENABLED=0 GOPROXY=off GOMAXPROCS=1 go build -o /dev/null .' \
 && rm -rf /tmp/gowarm

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
