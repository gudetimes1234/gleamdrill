#!/usr/bin/env bash
#
# End-to-end API smoke test. Exercises the real HTTP surface against a running
# server and a real database -- the things gleeunit cannot reach: status codes,
# JSON shapes, CORS, and the auth boundary.
#
#   make server-smoke          (starts nothing; expects a server on $BASE)
#   BASE=https://... test/smoke.sh
#
set -u
B="${BASE:-http://127.0.0.1:1637}"
pass=0
fail=0

check() {
  if [ "$2" = "$3" ]; then
    pass=$((pass + 1)); printf '  ok   %s\n' "$1"
  else
    fail=$((fail + 1)); printf '  FAIL %s: expected %s got %s\n' "$1" "$2" "$3"
  fi
}

# Subscript expressions are relative to the document; anything else is a full
# expression with `d` in scope.
j() { python3 -c "
import sys, json
d = json.load(sys.stdin)
e = sys.argv[1]
print(eval(('d' + e) if e.startswith('[') else e))
" "$1"; }

status() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

CT="content-type: application/json"
PW="correct-horse-battery"
EMAIL="smoke-$RANDOM$RANDOM@example.com"
REF='"category":"NeetCode 150 · Python","subcategory":"Arrays & Hashing","title":"Contains Duplicate"'

echo "== accounts ($EMAIL)"
BODY=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}")
TOKEN=$(echo "$BODY" | j "['token']")
AUTH="authorization: Bearer $TOKEN"
[ -n "$TOKEN" ] && { pass=$((pass+1)); echo "  ok   signup returns a token"; } \
                || { fail=$((fail+1)); echo "  FAIL signup returned no token"; }
check "duplicate signup is 409" 409 "$(status -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}")"
check "short password is 422" 422 "$(status -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"s-$RANDOM@example.com\",\"password\":\"tiny\"}")"
check "malformed email is 422" 422 "$(status -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"nope\",\"password\":\"$PW\"}")"
check "me with token is 200" 200 "$(status "$B/api/me" -H "$AUTH")"
check "me without token is 401" 401 "$(status "$B/api/me")"
check "me with a bad token is 401" 401 "$(status "$B/api/me" -H "authorization: Bearer nonsense")"
check "me without the Bearer scheme is 401" 401 "$(status "$B/api/me" -H "authorization: $TOKEN")"
check "login is 200" 200 "$(status -X POST "$B/api/auth/login" -H "$CT" -d "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}")"
check "login is case-insensitive on email" 200 "$(status -X POST "$B/api/auth/login" -H "$CT" -d "{\"email\":\"${EMAIL^^}\",\"password\":\"$PW\"}")"
check "wrong password is 401" 401 "$(status -X POST "$B/api/auth/login" -H "$CT" -d "{\"email\":\"$EMAIL\",\"password\":\"wrong-password-xx\"}")"
# An unknown account must be indistinguishable from a wrong password, or the
# API becomes an account-enumeration oracle.
check "unknown account is 401, not 404" 401 "$(status -X POST "$B/api/auth/login" -H "$CT" -d "{\"email\":\"ghost-$RANDOM@example.com\",\"password\":\"$PW\"}")"

echo "== boot state"
S=$(curl -s "$B/api/state" -H "$AUTH")
check "starts with no cards" 0 "$(echo "$S" | j "len(d['cards'])")"
check "ships 21 FSRS parameters" 21 "$(echo "$S" | j "len(d['settings']['parameters'])")"
check "new-card budget is 10" 10 "$(echo "$S" | j "['today']['newRemaining']")"
check "nothing is due" 0 "$(echo "$S" | j "['today']['dueNow']")"

echo "== scheduling"
R=$(curl -s -X POST "$B/api/reviews" -H "$AUTH" -H "$CT" -d "{$REF,\"rating\":3,\"durationMs\":42000}")
check "a new card enters learning" 1 "$(echo "$R" | j "['card']['state']")"
check "reps is 1" 1 "$(echo "$R" | j "['card']['reps']")"
check "stability seeds from w2" 2.3065 "$(echo "$R" | j "['card']['stability']")"
check "the review is counted today" 1 "$(echo "$R" | j "['today']['reviewsDone']")"
check "the card counts as introduced" 1 "$(echo "$R" | j "['today']['newIntroduced']")"
check "second learning step is 10 minutes out" 600 \
  "$(python3 -c "print(round($(echo "$R" | j "['card']['due']") - $(echo "$R" | j "['now']")))")"

R=$(curl -s -X POST "$B/api/reviews" -H "$AUTH" -H "$CT" -d "{$REF,\"rating\":3}")
check "clearing the last step graduates the card" 2 "$(echo "$R" | j "['card']['state']")"
check "step is cleared on graduation" None "$(echo "$R" | j "['card']['step']")"

echo "== the grading invariant is enforced server-side"
R=$(curl -s -X POST "$B/api/reviews" -H "$AUTH" -H "$CT" -d "{$REF,\"rating\":4,\"autoFailed\":true}")
check "a failed harness forces Again despite rating 4" 3 "$(echo "$R" | j "['card']['state']")"
check "the lapse is counted" 1 "$(echo "$R" | j "['card']['lapses']")"
R=$(curl -s -X POST "$B/api/reviews" -H "$AUTH" -H "$CT" -d "{$REF,\"rating\":4,\"revealed\":true}")
check "a revealed solution forces Again too" 3 "$(echo "$R" | j "['card']['state']")"
check "a rating outside 1-4 is 422" 422 "$(status -X POST "$B/api/reviews" -H "$AUTH" -H "$CT" -d "{$REF,\"rating\":9}")"
check "reviewing without a token is 401" 401 "$(status -X POST "$B/api/reviews" -H "$CT" -d "{$REF,\"rating\":3}")"

echo "== the first encounter grades freely"
FE="first-$RANDOM$RANDOM@example.com"
FET=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"$FE\",\"password\":\"$PW\"}" | j "['token']")
FA="authorization: Bearer $FET"
# Revealing the solution on the very first review is the learning step: the
# self-grade stands, and the log still records revealed=true.
R=$(curl -s -X POST "$B/api/reviews" -H "$FA" -H "$CT" -d "{$REF,\"rating\":3,\"revealed\":true}")
check "a revealed first review keeps its grade" 2.3065 "$(echo "$R" | j "['card']['stability']")"
check "and schedules as Good, not Again" 1 "$(echo "$R" | j "['card']['state']")"
# Second review: memory now exists, so the honesty rule bites. An Easy claim
# with the solution revealed would graduate the card; coercion keeps it in
# learning at step zero.
R=$(curl -s -X POST "$B/api/reviews" -H "$FA" -H "$CT" -d "{$REF,\"rating\":4,\"revealed\":true}")
check "a later revealed review is coerced to Again" 1 "$(echo "$R" | j "['card']['state']")"
check "back to the first learning step" 0 "$(echo "$R" | j "['card']['step']")"

echo "== suspend"
R=$(curl -s -X PATCH "$B/api/cards" -H "$AUTH" -H "$CT" -d "{$REF,\"suspended\":true}")
check "a card can be parked" True "$(echo "$R" | j "['card']['suspended']")"
check "a parked card leaves the due count" 0 "$(echo "$R" | j "['today']['dueNow']")"
R=$(curl -s -X PATCH "$B/api/cards" -H "$AUTH" -H "$CT" -d "{$REF,\"suspended\":false}")
check "and can be resumed" False "$(echo "$R" | j "['card']['suspended']")"
check "an unseen problem has no card to park" 404 "$(status -X PATCH "$B/api/cards" -H "$AUTH" -H "$CT" -d "{\"category\":\"NeetCode 150\",\"subcategory\":\"Nope\",\"title\":\"Nope\",\"suspended\":true}")"
check "parking without a token is 401" 401 "$(status -X PATCH "$B/api/cards" -H "$CT" -d "{$REF,\"suspended\":true}")"
check "a body without the flag is 422" 422 "$(status -X PATCH "$B/api/cards" -H "$AUTH" -H "$CT" -d "{$REF}")"

echo "== drafts"
check "a draft saves" 204 "$(status -X PUT "$B/api/drafts" -H "$AUTH" -H "$CT" -d "{$REF,\"body\":\"def f(): pass\"}")"
S=$(curl -s "$B/api/state" -H "$AUTH")
check "the draft round-trips" "def f(): pass" "$(echo "$S" | j "['drafts'][0]['body']")"
check "state now holds one card" 1 "$(echo "$S" | j "len(d['cards'])")"

echo "== settings"
SET=$(curl -s "$B/api/settings" -H "$AUTH" | python3 -c "import sys,json;print(json.dumps(json.load(sys.stdin)['settings']))")
mutate() { echo "$SET" | python3 -c "import sys,json;d=json.load(sys.stdin);d.update(json.loads(sys.argv[1]));print(json.dumps(d))" "$1"; }
check "retention below 0.7 is rejected" 422 "$(status -X PUT "$B/api/settings" -H "$AUTH" -H "$CT" -d "$(mutate '{"desiredRetention":0.5}')")"
check "an unknown timezone is rejected" 422 "$(status -X PUT "$B/api/settings" -H "$AUTH" -H "$CT" -d "$(mutate '{"timezone":"Mars/Olympus"}')")"
check "a short parameter list is rejected" 422 "$(status -X PUT "$B/api/settings" -H "$AUTH" -H "$CT" -d "$(mutate '{"parameters":[1.0,2.0]}')")"
check "a zero-minute learning step is rejected" 422 "$(status -X PUT "$B/api/settings" -H "$AUTH" -H "$CT" -d "$(mutate '{"learningSteps":[0,10]}')")"
check "valid settings are accepted" 200 "$(status -X PUT "$B/api/settings" -H "$AUTH" -H "$CT" -d "$(mutate '{"newPerDay":25,"timezone":"America/New_York"}')")"
S=$(curl -s "$B/api/state" -H "$AUTH")
check "the new limit takes effect" 24 "$(echo "$S" | j "['today']['newRemaining']")"
check "the timezone persists" "America/New_York" "$(echo "$S" | j "['settings']['timezone']")"

echo "== stats"
T=$(curl -s "$B/api/stats" -H "$AUTH")
check "every review is counted" 4 "$(echo "$T" | j "['totalReviews']")"
# Only one of the four reviews began from the Review state: reviews 1 and 2
# were the learning steps, and review 4 began from Relearning after review 3
# lapsed the card. So true retention is 0 of 1.
check "mature reviews exclude learning and relearning" 1 "$(echo "$T" | j "['matureReviews']")"
check "the forced failure counts against retention" 0 "$(echo "$T" | j "['matureCorrect']")"
check "a study day today makes a streak of 1" 1 "$(echo "$T" | j "['streakDays']")"
check "today appears in the history" 4 "$(echo "$T" | j "next(h['total'] for h in d['history'] if h['daysAgo'] == 0)")"
check "the card appears in the forecast" 1 "$(echo "$T" | j "sum(f['count'] for f in d['forecast'])")"

echo "== timezone is taken from the client at signup"
TZE="tz-$RANDOM$RANDOM@example.com"
TZT=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" \
  -d "{\"email\":\"$TZE\",\"password\":\"$PW\",\"timezone\":\"America/New_York\"}" | j "['token']")
check "the browser's zone is stored" "America/New_York" \
  "$(curl -s "$B/api/state" -H "authorization: Bearer $TZT" | j "['settings']['timezone']")"
# Study days roll over at 04:00 LOCAL. Without this the boundary would land at
# 04:00 UTC for everyone, which is around midnight in the US.
check "the day boundary follows that zone" True \
  "$(curl -s "$B/api/state" -H "authorization: Bearer $TZT" | python3 -c "
import sys, json, datetime, zoneinfo
d = json.load(sys.stdin)
start = datetime.datetime.fromtimestamp(d['today']['dayStart'], zoneinfo.ZoneInfo('America/New_York'))
print(start.hour == d['settings']['dayStartHour'])
")"
BADTZ=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" \
  -d "{\"email\":\"badtz-$RANDOM@example.com\",\"password\":\"$PW\",\"timezone\":\"Mars/Olympus\"}" | j "['token']")
check "a bogus zone falls back to UTC rather than failing signup" "UTC" \
  "$(curl -s "$B/api/state" -H "authorization: Bearer $BADTZ" | j "['settings']['timezone']")"
check "omitting the zone still works" 200 \
  "$(status -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"notz-$RANDOM@example.com\",\"password\":\"$PW\"}")"

echo "== guest upgrade: cards arrive with the scheduling they earned"
GE="guest-$RANDOM$RANDOM@example.com"
GT=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"$GE\",\"password\":\"$PW\"}" | j "['token']")
GA="authorization: Bearer $GT"
# A card a guest drilled to maturity: 40 days of stability, due in 40 days.
DUE=$(python3 -c "import time; print(time.time() + 40*86400)")
LAST=$(python3 -c "import time; print(time.time() - 86400)")
GCARD="{$REF,\"state\":2,\"step\":null,\"stability\":40.5,\"difficulty\":5.25,\"due\":$DUE,\"lastReview\":$LAST,\"reps\":7,\"lapses\":2}"
check "guest cards import" 204 \
  "$(status -X POST "$B/api/import" -H "$GA" -H "$CT" -d "{\"cards\":[$GCARD],\"drafts\":[],\"solved\":[]}")"
GS=$(curl -s "$B/api/state" -H "$GA")
check "stability is preserved, not reseeded" 40.5 "$(echo "$GS" | j "['cards'][0]['stability']")"
check "difficulty is preserved" 5.25 "$(echo "$GS" | j "['cards'][0]['difficulty']")"
check "reps are preserved" 7 "$(echo "$GS" | j "['cards'][0]['reps']")"
check "lapses are preserved" 2 "$(echo "$GS" | j "['cards'][0]['lapses']")"
check "the card is in review state" 2 "$(echo "$GS" | j "['cards'][0]['state']")"
check "it is not due today" 0 "$(echo "$GS" | j "['today']['dueNow']")"
# Card state carries over; the review log deliberately does not.
check "no reviews are fabricated from imported cards" 0 \
  "$(curl -s "$B/api/stats" -H "$GA" | j "['totalReviews']")"
check "introducedAt crosses the wire" True \
  "$(echo "$GS" | j "d['cards'][0]['introducedAt'] is not None")"
# A second import must not clobber the real scheduling already there.
STALE="{$REF,\"state\":1,\"step\":0,\"stability\":1.0,\"difficulty\":9.0,\"due\":$DUE,\"lastReview\":null,\"reps\":0,\"lapses\":0}"
curl -s -X POST "$B/api/import" -H "$GA" -H "$CT" -d "{\"cards\":[$STALE],\"drafts\":[],\"solved\":[]}" > /dev/null
check "re-importing cannot overwrite existing scheduling" 40.5 \
  "$(curl -s "$B/api/state" -H "$GA" | j "['cards'][0]['stability']")"

echo "== one-time legacy import"
IMP="{\"solved\":[{$REF}],\"drafts\":[{$REF,\"body\":\"imported draft\"}]}"
T3TOK=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"legacy-$RANDOM$RANDOM@example.com\",\"password\":\"$PW\"}" | j "['token']")
A3="authorization: Bearer $T3TOK"
check "import accepted" 204 "$(status -X POST "$B/api/import" -H "$A3" -H "$CT" -d "$IMP")"
S=$(curl -s "$B/api/state" -H "$A3")
check "a solved problem became a card" 1 "$(echo "$S" | j "len(d['cards'])")"
check "seeded straight into review state" 2 "$(echo "$S" | j "['cards'][0]['state']")"
check "seeded from a Good first answer" 2.3065 "$(echo "$S" | j "['cards'][0]['stability']")"
check "the draft came across" "imported draft" "$(echo "$S" | j "['drafts'][0]['body']")"
# Seeding must never invent review history -- that is what the optimizer would
# later be trained on.
check "no reviews were fabricated" 0 "$(curl -s "$B/api/stats" -H "$A3" | j "['totalReviews']")"
check "re-importing is harmless" 204 "$(status -X POST "$B/api/import" -H "$A3" -H "$CT" -d "$IMP")"
check "and does not duplicate the card" 1 "$(curl -s "$B/api/state" -H "$A3" | j "len(d['cards'])")"

echo "== insights and history"
# The main account so far: Good(42s, clean), Good(untimed, clean),
# autoFailed(4), revealed(4). Insights must count only the timed clean solve,
# and the history must keep the truth of every row.
I=$(curl -s "$B/api/insights" -H "$AUTH")
check "one timed clean solve" 1 "$(echo "$I" | j "len(d['cleanSolves'])")"
check "with its real duration" 42000 "$(echo "$I" | j "['cleanSolves'][0]['durationMs']")"
check "the reveal is counted" 1 "$(echo "$I" | j "['reveals'][0]['count']")"
check "calibration rows exist" True "$(echo "$I" | j "len(d['calibration']) > 0")"
H=$(curl -s "$B/api/history?category=NeetCode%20150%20%C2%B7%20Python&subcategory=Arrays%20%26%20Hashing&title=Contains%20Duplicate" -H "$AUTH")
check "history returns every review" 4 "$(echo "$H" | j "len(d['reviews'])")"
check "with reveal truth per row" "[False, False, False, True]" \
  "$(echo "$H" | j "list(r['revealed'] for r in d['reviews'])")"
check "and the coerced ratings" "[3, 3, 1, 1]" \
  "$(echo "$H" | j "list(r['rating'] for r in d['reviews'])")"
check "history without a token is 401" 401 "$(status "$B/api/history?category=x&subcategory=y&title=z")"
check "history without the key is 422" 422 "$(status "$B/api/history" -H "$AUTH")"

echo "== isolation and routing"
T2=$(curl -s -X POST "$B/api/auth/signup" -H "$CT" -d "{\"email\":\"other-$RANDOM$RANDOM@example.com\",\"password\":\"$PW\"}" | j "['token']")
check "a second account sees none of the first's cards" 0 "$(curl -s "$B/api/state" -H "authorization: Bearer $T2" | j "len(d['cards'])")"
check "logout is 204" 204 "$(status -X POST "$B/api/auth/logout" -H "$AUTH")"
check "the token is dead after logout" 401 "$(status "$B/api/me" -H "$AUTH")"
check "an unknown route is 404" 404 "$(status "$B/api/nonsense")"
check "health is 200" 200 "$(status "$B/health")"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
