#!/usr/bin/env bash
#
# Recaptures test/fixtures/*.json from a running backend.
#
# The contract tests decode real server responses rather than hand-written
# JSON, so that a change to the server's field names or shapes fails the app's
# test suite instead of silently producing an empty screen. Run this after
# changing anything the API returns.
#
#   make api-fixtures            (expects a server on $BASE)
#
set -euo pipefail
B="${BASE:-http://127.0.0.1:1637}"
CT='content-type: application/json'
HERE="$(cd "$(dirname "$0")" && pwd)"

EMAIL="fixture-$RANDOM$RANDOM@example.com"
REF='"category":"NeetCode 150 · Python","subcategory":"Arrays & Hashing","title":"Contains Duplicate"'

SIGNUP=$(curl -sf -X POST "$B/api/auth/signup" -H "$CT" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"correct-horse-battery\"}")
TOKEN=$(printf '%s' "$SIGNUP" | python3 -c 'import sys,json; print(json.load(sys.stdin)["token"])')
AUTH="authorization: Bearer $TOKEN"

# One Good answer on one problem, plus a draft. Small enough to read, and it
# exercises every field the client decodes.
REVIEW=$(curl -sf -X POST "$B/api/reviews" -H "$AUTH" -H "$CT" \
  -d "{$REF,\"rating\":3,\"durationMs\":42000}")
curl -sf -X PUT "$B/api/drafts" -H "$AUTH" -H "$CT" \
  -d "{$REF,\"body\":\"def contains_duplicate(nums):\\n    pass\"}" > /dev/null
STATE=$(curl -sf "$B/api/state" -H "$AUTH")
STATS=$(curl -sf "$B/api/stats" -H "$AUTH")

# A second account with a richer log, so the insight fixtures carry every
# shape: clean solves, a reveal, and calibration pairs. Kept separate so the
# first account's exact numbers (which the contract tests assert) stay put.
EMAIL2="fixture-log-$RANDOM$RANDOM@example.com"
TOKEN2=$(curl -sf -X POST "$B/api/auth/signup" -H "$CT" \
  -d "{\"email\":\"$EMAIL2\",\"password\":\"correct-horse-battery\"}" \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["token"])')
AUTH2="authorization: Bearer $TOKEN2"
curl -sf -X POST "$B/api/reviews" -H "$AUTH2" -H "$CT" \
  -d "{$REF,\"rating\":3,\"durationMs\":150000}" > /dev/null
curl -sf -X POST "$B/api/reviews" -H "$AUTH2" -H "$CT" \
  -d "{$REF,\"rating\":3,\"revealed\":true}" > /dev/null
curl -sf -X POST "$B/api/reviews" -H "$AUTH2" -H "$CT" \
  -d "{$REF,\"rating\":3,\"durationMs\":90000}" > /dev/null
INSIGHTS=$(curl -sf "$B/api/insights" -H "$AUTH2")
HISTORY=$(curl -sf "$B/api/history?category=NeetCode%20150%20%C2%B7%20Python&subcategory=Arrays%20%26%20Hashing&title=Contains%20Duplicate" -H "$AUTH2")

mkdir -p "$HERE/fixtures"
python3 - "$HERE/fixtures" "$SIGNUP" "$STATE" "$REVIEW" "$STATS" "$INSIGHTS" "$HISTORY" <<'PY'
import sys, json

out = sys.argv[1]
def scrub(node):
    """These fixtures are committed, so account identifiers are replaced."""
    if isinstance(node, dict):
        node = dict(node)
        if "email" in node: node["email"] = "drills@example.com"
        if "id" in node: node["id"] = "00000000-0000-0000-0000-000000000000"
        if "token" in node: node["token"] = "fixture-token"
        return {k: scrub(v) for k, v in node.items()}
    if isinstance(node, list):
        return [scrub(v) for v in node]
    return node

for name, raw in zip(
    ["session", "state", "review", "stats", "insights", "history"],
    sys.argv[2:],
):
    path = f"{out}/{name}.json"
    with open(path, "w") as f:
        json.dump(scrub(json.loads(raw)), f, indent=1, ensure_ascii=False)
        f.write("\n")
    print(f"  wrote {path}")
PY
