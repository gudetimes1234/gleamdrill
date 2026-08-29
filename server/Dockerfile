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
COPY fsrs ./fsrs
COPY server ./server

WORKDIR /build/server
RUN gleam export erlang-shipment

# The shipment carries its own compiled beam files; the runtime image needs
# only the VM and the C libraries the NIF links against.
FROM ghcr.io/gleam-lang/gleam:v1.18.1-elixir-alpine

RUN apk add --no-cache libstdc++ openssl ncurses \
 && adduser -D -h /app algodrill

COPY --from=build --chown=algodrill:algodrill /build/server/build/erlang-shipment /app

WORKDIR /app
USER algodrill

ENV PORT=8080 BIND=0.0.0.0
EXPOSE 8080

# `run` is the shipment's own entrypoint verb; it boots the release and stays
# in the foreground, which is what the platform expects.
CMD ["./entrypoint.sh", "run"]
