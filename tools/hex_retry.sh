#!/usr/bin/env bash
# Runs a command, and runs it again after a pause if it failed on Hex's rate
# limit. Gleam re-resolves versions against the Hex API on a cold build and
# again on the first `gleam test` after it, a few dozen calls each, and a CI
# job that does that for several projects inside a minute can go over the
# limit for its shared runner address. Any other failure fails at once.
set -o pipefail
log=$(mktemp)
for attempt in 1 2 3; do
  if "$@" 2>&1 | tee "$log"; then exit 0; fi
  grep -q "rate limit for the Hex API" "$log" || exit 1
  [ "$attempt" -lt 3 ] || exit 1
  echo "::warning::Hex rate limit; retrying in $((attempt * 60))s"
  sleep $((attempt * 60))
done
