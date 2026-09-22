#!/usr/bin/env python3
"""Score every first-party Gleam file with Jev and rank what is worth improving.

Jev (TypeSafe's System One model) does not write prose.  It takes a `state` and a
set of typed questions and returns calibrated numbers: a `score` is a
probability-weighted position on ordered levels, a `noul` is the probability that
a condition holds, a `choice` picks one option and reports the distribution.  So
every file gets asked the *same* rubric and the answers are comparable across
files.  Ranking, weighting and filtering happen here in Python, never in the
model -- see WEIGHTS and `composite`.

    export TYPESAFE_API_KEY=...           # https://typesafe.ai
    tools/jev_audit.py fetch --dry-run    # file list + one request, no network
    tools/jev_audit.py fetch              # one batched call per changed file
    tools/jev_audit.py report             # ranked reading list
    tools/jev_audit.py explain src/gleamdrill/model.gleam
    tools/jev_audit.py deep --top 10      # follow-up pass on the worst offenders

Answers are cached under build/jev_audit/ keyed by the SHA-1 of the file's
contents, so `fetch` is idempotent and a re-run after a refactor only pays for
the files that changed.  Re-weighting never re-queries: delete the cache only
when the rubric wording changes.

The output is a reading list, not a verdict.  Typed output guarantees the
interface, not the truth of the judgment.
"""

import argparse
import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "build" / "jev_audit"
API = "https://api.typesafe.ai/v1/systemone"
MODEL = "jev-latest"
KEY_VAR = "TYPESAFE_API_KEY"

# $0.042 per million input tokens; output tokens are free.
USD_PER_INPUT_TOKEN = 0.042 / 1_000_000
# Jev allows 32k tokens for `state` plus the longest question.  Gleam runs about
# three characters to the token, so stop well short of the wall.
STATE_CHAR_BUDGET = 80_000

# Which tracked .gleam files are our own code rather than content or output.
INCLUDE = (
    "src/",
    "server/src/",
    "fsrs/src/",
    "fsrs/test/",
    "wire/src/",
    "wire/test/",
    "test/",
    "drills/src/generate.gleam",
    "drills/src/bundle_stdlib.gleam",
)
# Drill content and generated output rather than program logic.  Everything under
# src/gleamdrill/problems/ is either emitted by `gleam run -m generate` with a
# "do not edit" banner or is a hand-maintained catalogue of problems; the code
# that *uses* it lives in src/gleamdrill/problem.gleam and problems.gleam, which
# are not in that directory and so are kept.
EXCLUDE = (
    "/src/gleamdrill/problems/",
    "/fsrs/test/vectors.gleam",
)

# ---------------------------------------------------------------------------
# The rubric.  Levels describe concrete situations, not adjectives: the model
# can only place a file on a scale it can picture.
# ---------------------------------------------------------------------------

SCORES = {
    "duplication": (
        "Judge how much of `source` restates logic that belongs in one shared "
        "place, either repeated inside this file or visibly re-implementing "
        "something the rest of a Gleam application would keep in a helper.",
        [
            "Nothing restates logic found elsewhere; shared behaviour is already called through a helper.",
            "A short expression or a literal appears twice; cheap to leave alone.",
            "One helper-sized block, roughly 5 to 20 lines, is copied within this file or restated from another module.",
            "Several blocks are copied, or one copy has already drifted so the copies now behave differently.",
            "Large stretches are near-identical; changing the behaviour would mean editing three or more places.",
        ],
    ),
    "complexity": (
        "Judge how hard `source` is to follow relative to the work it actually "
        "does. Long but linear data tables are not complex; branching that hides "
        "the decision is.",
        [
            "Every function is short and linear; the shape of the file matches the work it does.",
            "One function is long or nested but still reads top to bottom without surprises.",
            "A function mixes two or three unrelated concerns, or nests case/use expressions three deep.",
            "Several functions are long with deep nesting and many branches; following one path means holding a lot in mind.",
            "Control flow is hard to follow at all: very long functions, deep nesting, branching that obscures what the code decides.",
        ],
    ),
    "error_handling": (
        "Judge how failure is handled in `source`. In Gleam that means `let "
        "assert`, unwrapped Results, `result.replace_error` that throws away "
        "detail, and case branches that map an Error to a silent default.",
        [
            "Every failure path is in the types and handled where it arises.",
            "A `let assert` or unwrap appears where the invariant is genuinely local and obvious from the lines around it.",
            "A `let assert` guards something that can fail for reasons outside this file, or an Error is flattened to a vaguer value without a comment saying why.",
            "Errors are swallowed or collapsed into a default, so a real failure would pass silently.",
            "Failure paths are ignored throughout; a runtime error here would crash or corrupt state with no diagnostic.",
        ],
    ),
    "naming": (
        "Judge whether the names in `source` tell a reader what the thing is and "
        "does. Terse is not the same as unclear.",
        [
            "Names say what the thing is and stay consistent across the file.",
            "One or two names are terse but unambiguous in context.",
            "Several names are generic -- data, result, handle, do_thing -- where a specific name was available.",
            "Names mislead: a name promises behaviour the code does not have, or one concept goes by two names in the same file.",
            "Naming obstructs reading; nothing can be understood without reading every body.",
        ],
    ),
    "test_risk": (
        "Judge the consequence of this file being silently wrong. Weigh how "
        "load-bearing the logic is and how many branches could go wrong "
        "unnoticed, not whether tests happen to be visible.",
        [
            "The logic is trivial or purely declarative; a mistake would be obvious immediately.",
            "Mostly straightforward; a little untested branching with low consequence.",
            "Contains a non-obvious rule -- arithmetic, ordering, a boundary -- whose failure would be noticed fairly quickly.",
            "Contains state transitions or scheduling rules where a wrong answer would be silently wrong for a long time.",
            "Carries load-bearing rules such as persistence, auth, grading or scheduling, with many branches and no sign of coverage.",
        ],
    ),
}

NOULS = {
    "dead_code": (
        "Does `source` define anything that looks unused or unreachable -- a "
        "function, constant, type or case branch that nothing in this file "
        "reaches and that is not exported for outside use?",
        {
            "true": "At least one definition or branch looks unreachable or unused.",
            "false": "Everything defined here is plausibly reached or exported for use elsewhere.",
        },
    ),
    "comment_drift": (
        "Does any comment or doc comment in `source` describe behaviour that the "
        "code beneath it no longer has?",
        {
            "true": "At least one comment contradicts or overstates what the code now does.",
            "false": "Comments match the code, or there are no claims specific enough to be wrong.",
        },
    ),
    "layering": (
        "Given `path`, does this file put logic in the wrong layer? Examples: a "
        "view module making scheduling or grading decisions instead of "
        "rendering; client code re-implementing a rule the server must enforce; "
        "a shared package reaching into application concerns.",
        {
            "true": "Some logic here belongs in a different layer than this path implies.",
            "false": "The logic here matches the layer its path places it in.",
        },
    ),
}

PRIMARY_ISSUE = {
    "type": "choice",
    "instructions": (
        "If someone had time to improve exactly one thing about `source`, which "
        "of these would it be? Choose `none` when the file is in good shape and "
        "any change would be a matter of taste."
    ),
    "criteria": {
        "duplication": "Pull repeated logic into one shared place.",
        "complexity": "Break up or flatten control flow that is hard to follow.",
        "error_handling": "Make failure paths explicit instead of asserted or swallowed.",
        "naming": "Rename things so the code says what it means.",
        "test_risk": "Cover load-bearing logic that could be silently wrong.",
        "dead_code": "Delete definitions or branches nothing reaches.",
        "comment_drift": "Fix comments that no longer match the code.",
        "layering": "Move logic to the layer it belongs in.",
        "none": "Nothing worth doing; the file is fine as it stands.",
    },
}

# Policy, not model output.  Change these and re-run `report`: no requests.
WEIGHTS = {
    "test_risk": 0.30,
    "error_handling": 0.25,
    "complexity": 0.20,
    "duplication": 0.15,
    "naming": 0.10,
}
# A noul this high is reported as a flag in its own right rather than averaged in.
NOUL_FLAG = 0.70


def questions():
    q = {}
    for name, (instructions, criteria) in SCORES.items():
        q[name] = {"type": "score", "instructions": instructions, "criteria": criteria}
    for name, (instructions, criteria) in NOULS.items():
        q[name] = {"type": "noul", "instructions": instructions, "criteria": criteria}
    q["primary_issue"] = PRIMARY_ISSUE
    return q


DEEP_QUESTIONS = {
    "refactor": {
        "type": "choice",
        "instructions": (
            "`source` was already judged one of the weaker files in this "
            "codebase; `findings` holds that judgment and `siblings` lists the "
            "other modules in the same package. Which single concrete change "
            "would do the most good here?"
        ),
        "criteria": {
            "extract_helper": "Lift repeated logic into a helper, in this file or a shared module.",
            "split_module": "The file carries two or more responsibilities and should become separate modules.",
            "flatten_control_flow": "Restructure long or deeply nested functions without changing behaviour.",
            "tighten_error_handling": "Replace asserts and swallowed errors with explicit Result handling.",
            "move_layer": "Move logic to the layer that should own it.",
            "add_tests": "Leave the code as is and cover it with tests first.",
            "delete_dead_code": "Remove definitions or branches nothing reaches.",
            "rename": "Rename things; the structure is otherwise sound.",
            "none": "No single change stands out as worth making.",
        },
    },
    "effort": {
        "type": "score",
        "instructions": "How much work is the change chosen above, for someone who already knows this codebase?",
        "criteria": [
            "Minutes: a rename or a deletion, mechanical and local.",
            "Under an hour: one function reshaped, no callers affected.",
            "Half a day: several functions move and a handful of call sites change.",
            "A day or more: the module's shape changes and many call sites follow.",
            "Multi-day: the change crosses package boundaries and needs its own plan.",
        ],
    },
    "worth_doing": {
        "type": "noul",
        "instructions": (
            "Is this change worth making now, weighing what it costs against what "
            "goes wrong if the file stays as it is?"
        ),
        "criteria": {
            "true": "The cost is justified by the risk or friction the file creates today.",
            "false": "It would be tidier, but nothing real is being paid for leaving it alone.",
        },
    },
}


# ---------------------------------------------------------------------------
# Files
# ---------------------------------------------------------------------------


def tracked_files(only=None):
    out = subprocess.run(
        ["git", "ls-files", "*.gleam"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    ).stdout.split()
    keep = []
    for path in out:
        if not path.startswith(INCLUDE):
            continue
        if any(bad in "/" + path for bad in EXCLUDE):
            continue
        if only and only not in path:
            continue
        keep.append(path)
    return sorted(keep)


def read(path):
    return (ROOT / path).read_text(encoding="utf-8", errors="replace")


def units(path):
    """A file, or the parts of one too long for a single request.

    Jev allows 32k tokens for `state` plus the longest question, and
    src/gleamdrill.gleam alone is over three times that.  Split on column-zero
    boundaries so every part is a whole run of top-level definitions rather than
    a function cut in half, and pack greedily up to the budget.  Each part is
    still judged against the identical rubric, so parts rank beside whole files.
    """
    source = read(path)
    if len(source) <= STATE_CHAR_BUDGET:
        return [(path, source, None)]

    blocks, current = [], []
    for line in source.split("\n"):
        starts_block = line[:1].strip() and not line.startswith("//")
        if starts_block and current:
            blocks.append("\n".join(current))
            current = []
        current.append(line)
    if current:
        blocks.append("\n".join(current))

    parts, pending = [], []
    size = 0
    for block in blocks:
        if pending and size + len(block) > STATE_CHAR_BUDGET:
            parts.append("\n".join(pending))
            pending, size = [], 0
        pending.append(block)
        size += len(block) + 1
    if pending:
        parts.append("\n".join(pending))

    total = len(parts)
    return [
        (f"{path}#{i + 1}", text, f"part {i + 1} of {total} of {path}")
        for i, text in enumerate(parts)
    ]


def all_units(only=None):
    out = []
    for path in tracked_files(only):
        out.extend(units(path))
    return out


def digest(unit_id, source, salt):
    h = hashlib.sha1()
    h.update(salt.encode())
    h.update(unit_id.encode())
    h.update(b"\0")
    h.update(source.encode("utf-8", errors="replace"))
    return h.hexdigest()


# The rubric text is part of the cache key: reword a question and the old answers
# stop being answers to it.
RUBRIC_SALT = hashlib.sha1(
    json.dumps(questions(), sort_keys=True).encode()
).hexdigest()[:12]
DEEP_SALT = "deep-" + hashlib.sha1(
    json.dumps(DEEP_QUESTIONS, sort_keys=True).encode()
).hexdigest()[:12]


# ---------------------------------------------------------------------------
# API
# ---------------------------------------------------------------------------


def api_key():
    key = os.environ.get(KEY_VAR, "").strip()
    if not key:
        sys.exit(
            f"{KEY_VAR} is not set. Get a key at https://typesafe.ai and export it:\n"
            f"    export {KEY_VAR}=..."
        )
    return key


def ask(key, state, qs, attempts=5):
    """One batched request. Every question shares the same state, which is where
    the batching saving comes from: the source text dominates the bill."""
    payload = json.dumps({"model": MODEL, "state": state, "questions": qs}).encode()
    request = urllib.request.Request(
        API,
        data=payload,
        headers={
            "authorization": f"Bearer {key}",
            "content-type": "application/json",
        },
    )
    delay = 2.0
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                return json.loads(response.read())
        except urllib.error.HTTPError as err:
            if err.code in (429, 529) and attempt < attempts - 1:
                time.sleep(delay)
                delay *= 2
                continue
            body = err.read().decode(errors="replace")[:400]
            raise SystemExit(f"typesafe.ai answered {err.code}: {body}")
        except urllib.error.URLError as err:
            if attempt < attempts - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise SystemExit(f"could not reach typesafe.ai: {err.reason}")
    raise SystemExit("gave up after retries")


# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------


def state_for(unit_id, source, note):
    state = {"path": unit_id.split("#")[0], "language": "gleam", "source": source}
    if note:
        state["note"] = note
    return state


def cmd_fetch(args):
    CACHE.mkdir(parents=True, exist_ok=True)
    work = all_units(args.only)
    if args.limit:
        work = work[: args.limit]
    qs = questions()

    if args.dry_run:
        files = len({u.split("#")[0] for u, _, _ in work})
        print(f"{files} files -> {len(work)} requests (rubric {RUBRIC_SALT}):")
        for unit_id, source, _ in work:
            over = "  OVER BUDGET: one indivisible definition" if len(source) > STATE_CHAR_BUDGET else ""
            print(f"  {len(source):>7}  {unit_id}{over}")
        if work:
            unit_id, source, note = work[0]
            request = {"model": MODEL, "state": state_for(unit_id, source, note), "questions": qs}
            print(f"\nrequest for {unit_id}:")
            print(json.dumps(request, indent=2)[:4000])
        return

    key = api_key()
    tokens = fetched = skipped = 0
    for unit_id, source, note in work:
        out = CACHE / f"{digest(unit_id, source, RUBRIC_SALT)}.json"
        if out.exists():
            skipped += 1
            continue
        answer = ask(key, state_for(unit_id, source, note), qs)
        used = answer.get("usage", {}).get("input_tokens", 0)
        tokens += used
        fetched += 1
        out.write_text(
            json.dumps(
                {"path": unit_id, "answers": answer.get("answers", {}), "usage": answer.get("usage", {})},
                indent=1,
            )
        )
        print(f"{unit_id}  ({used} tokens)")
    print(
        f"\n{fetched} fetched, {skipped} already cached, "
        f"{tokens} input tokens, ${tokens * USD_PER_INPUT_TOKEN:.4f}"
    )


def load_cached(salt, only=None):
    rows = []
    for unit_id, source, _ in all_units(only):
        out = CACHE / f"{digest(unit_id, source, salt)}.json"
        if out.exists():
            rows.append(json.loads(out.read_text()))
    return rows


def composite(answers):
    total = 0.0
    for name, weight in WEIGHTS.items():
        answer = answers.get(name)
        if not answer:
            continue
        levels = len(SCORES[name][1]) - 1
        total += weight * (answer.get("score", 0.0) / levels)
    return total


def cmd_report(args):
    rows = load_cached(RUBRIC_SALT, args.only)
    if not rows:
        sys.exit("nothing cached for the current rubric; run `fetch` first")
    for row in rows:
        row["composite"] = composite(row["answers"])
    rows.sort(key=lambda r: r["composite"], reverse=True)

    heads = list(WEIGHTS)
    print(f"{len(rows)} files, ranked worst first. Score columns are 0-4.\n")
    print(f"{'score':>5}  " + "  ".join(f"{h[:4]:>4}" for h in heads) + "  flags  path")
    for row in rows[: args.top]:
        answers = row["answers"]
        cells = "  ".join(f"{answers.get(h, {}).get('score', 0):>4.1f}" for h in heads)
        flags = "".join(
            name[0].upper()
            for name in NOULS
            if answers.get(name, {}).get("noul", 0) >= NOUL_FLAG
        )
        print(f"{row['composite']:>5.2f}  {cells}  {flags:<5}  {row['path']}")
    print("\nflags: D dead_code  C comment_drift  L layering  (noul >= %.2f)" % NOUL_FLAG)
    print("columns: " + ", ".join(f"{h[:4]}={h}" for h in heads))

    print("\nsingle most useful change per file, by the model's own pick:")
    confident, uncertain = [], []
    for row in rows[: args.top]:
        pick = row["answers"].get("primary_issue", {})
        if pick.get("choice") in (None, "none"):
            continue
        line = f"  {pick['choice']:<17} {pick.get('confidence', 0):.2f}  {row['path']}"
        (confident if pick.get("confidence", 0) >= args.min_confidence else uncertain).append(line)
    print("\n".join(confident) or "  (none)")
    if uncertain:
        print(f"\nuncertain (confidence < {args.min_confidence}), read these yourself:")
        print("\n".join(uncertain))


def cmd_explain(args):
    wanted = [u for u in all_units() if u[0] == args.path or u[0].startswith(args.path + "#")]
    if not wanted:
        sys.exit(f"{args.path} is not in the audited set; `fetch --dry-run` lists it")
    for unit_id, source, _ in wanted:
        out = CACHE / f"{digest(unit_id, source, RUBRIC_SALT)}.json"
        if not out.exists():
            print(f"{unit_id}: no cached answers; run `fetch` first\n")
            continue
        row = json.loads(out.read_text())
        print(f"{unit_id}   composite {composite(row['answers']):.2f}\n")
        for name, answer in row["answers"].items():
            if answer.get("type") == "score":
                level = round(answer["score"])
                print(f"{name}: {answer['score']:.2f} (confidence {answer.get('confidence', 0):.2f})")
                print(f"    nearest level {level}: {SCORES[name][1][level]}")
            elif answer.get("type") == "noul":
                print(f"{name}: {answer['noul']:.2f}")
            else:
                print(f"{name}: {answer.get('choice')} (confidence {answer.get('confidence', 0):.2f})")
                top = sorted(answer.get("probabilities", {}).items(), key=lambda kv: -kv[1])[:3]
                print("    " + ", ".join(f"{k} {v:.2f}" for k, v in top))
        deep = CACHE / f"{digest(unit_id, source, DEEP_SALT)}.json"
        if deep.exists():
            print("\ndeep pass:")
            for name, answer in json.loads(deep.read_text())["answers"].items():
                print(f"  {name}: {answer.get('choice', answer.get('noul', answer.get('score')))}")
        print()


def cmd_deep(args):
    rows = load_cached(RUBRIC_SALT, args.only)
    if not rows:
        sys.exit("nothing cached for the current rubric; run `fetch` first")
    for row in rows:
        row["composite"] = composite(row["answers"])
    rows.sort(key=lambda r: r["composite"], reverse=True)
    rows = rows[: args.top]

    key = api_key()
    CACHE.mkdir(parents=True, exist_ok=True)
    sources = {unit_id: (source, note) for unit_id, source, note in all_units()}
    all_paths = tracked_files()
    tokens = 0
    results = []
    for row in rows:
        unit_id = row["path"]
        path = unit_id.split("#")[0]
        source, _ = sources[unit_id]
        out = CACHE / f"{digest(unit_id, source, DEEP_SALT)}.json"
        if out.exists():
            results.append(json.loads(out.read_text()))
            continue
        package = path.split("/")[0]
        siblings = [p for p in all_paths if p.split("/")[0] == package and p != path]
        # Pass one's answers become part of pass two's state: this is the reason
        # it has to be a second request rather than more questions in the first.
        findings = {
            name: answer.get("score", answer.get("noul", answer.get("choice")))
            for name, answer in row["answers"].items()
        }
        answer = ask(
            key,
            {"path": path, "source": source, "findings": findings, "siblings": siblings},
            DEEP_QUESTIONS,
        )
        tokens += answer.get("usage", {}).get("input_tokens", 0)
        record = {"path": unit_id, "answers": answer.get("answers", {})}
        out.write_text(json.dumps(record, indent=1))
        results.append(record)

    print(f"{'effort':>6}  {'worth':>5}  {'change':<22} path")
    for record in results:
        answers = record["answers"]
        effort = answers.get("effort", {}).get("score", 0)
        worth = answers.get("worth_doing", {}).get("noul", 0)
        change = answers.get("refactor", {}).get("choice", "?")
        print(f"{effort:>6.1f}  {worth:>5.2f}  {change:<22} {record['path']}")
    print("\neffort 0-4 (minutes to multi-day), worth = probability it pays for itself now")
    if tokens:
        print(f"{tokens} input tokens, ${tokens * USD_PER_INPUT_TOKEN:.4f}")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="command", required=True)

    fetch = sub.add_parser("fetch", help="query Jev for every changed file")
    fetch.add_argument("--dry-run", action="store_true", help="print the plan and one request, call nothing")
    fetch.add_argument("--limit", type=int, help="only the first N files")
    fetch.add_argument("--only", help="only paths containing this substring")
    fetch.set_defaults(func=cmd_fetch)

    report = sub.add_parser("report", help="ranked reading list from the cache")
    report.add_argument("--top", type=int, default=20)
    report.add_argument("--min-confidence", type=float, default=0.5)
    report.add_argument("--only")
    report.set_defaults(func=cmd_report)

    explain = sub.add_parser("explain", help="every raw answer for one file")
    explain.add_argument("path")
    explain.set_defaults(func=cmd_explain)

    deep = sub.add_parser("deep", help="follow-up pass on the worst-ranked files")
    deep.add_argument("--top", type=int, default=10)
    deep.add_argument("--only")
    deep.set_defaults(func=cmd_deep)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
