"""Emit fsrs/test/vectors.gleam from the reference py-fsrs implementation.

Run with `make fsrs-vectors`, which invokes it as
`uv run --with fsrs python tools/gen_vectors.py` -- no install needed.

This is the one piece of tooling in the repo that is deliberately NOT Gleam,
and it has to be: its entire job is to run the canonical FSRS implementation
and record what it produces, so the Gleam port can be diffed against upstream
rather than against my reading of the spec. A Gleam reimplementation here would
just be the code under test, checking itself.

The emitted file is committed. Regenerate it when bumping the pinned py-fsrs
version; a diff means FSRS itself changed and the port needs revisiting."""
import os
from datetime import datetime, timezone, timedelta
import fsrs as pkg
from fsrs import Scheduler, Card, Rating, State
import fsrs.scheduler as sched_mod

def gf(x):
    s = repr(float(x))
    if "e" in s or "E" in s:
        mant, exp = s.lower().split("e")
        if "." not in mant:
            mant += ".0"
        return f"{mant}e{int(exp)}"
    if "." not in s:
        s += ".0"
    return s

S = Scheduler(enable_fuzzing=False)
L = []
w = lambda s: L.append(s)

w("//// GENERATED from the reference py-fsrs implementation -- do not edit.")
w("////")
w("//// Regenerate with `make fsrs-vectors`. Every value here is upstream's")
w("//// output for the same input, so a diff in this file means FSRS itself")
w("//// changed and the port needs revisiting.")
w("")
w("pub const parameters: List(Float) = [")
w("  " + ", ".join(gf(p) for p in S.parameters))
w("]")
w("")
w(f"pub const decay: Float = {gf(S._DECAY)}")
w("")
w(f"pub const factor: Float = {gf(S._FACTOR)}")
w("")

# --- scalar vectors ---
w("/// #(rating, expected)")
w("pub const initial_stability: List(#(Int, Float)) = [")
w("  " + ", ".join(f"#({int(r)}, {gf(S._initial_stability(rating=r))})" for r in Rating))
w("]")
w("")
w("/// #(rating, expected)")
w("pub const initial_difficulty: List(#(Int, Float)) = [")
w("  " + ", ".join(f"#({int(r)}, {gf(S._initial_difficulty(rating=r, clamp=True))})" for r in Rating))
w("]")
w("")

def block(name, ty, rows):
    w(f"pub const {name}: List({ty}) = [")
    for i in range(0, len(rows), 3):
        w("  " + ", ".join(rows[i:i+3]) + ("," if i + 3 < len(rows) else ""))
    w("]")
    w("")

w("/// #(difficulty, rating, expected)")
block("next_difficulty", "#(Float, Int, Float)",
      [f"#({gf(d)}, {int(r)}, {gf(S._next_difficulty(difficulty=d, rating=r))})"
       for d in [1.0, 2.5, 5.0, 7.3, 9.9, 10.0] for r in Rating])

w("/// #(stability, rating, expected)")
block("short_term_stability", "#(Float, Int, Float)",
      [f"#({gf(s)}, {int(r)}, {gf(S._short_term_stability(stability=s, rating=r))})"
       for s in [0.001, 0.212, 1.0, 3.5, 10.0, 100.0] for r in Rating])

w("/// #(stability, difficulty, retrievability, rating, expected)")
block("recall_stability", "#(Float, Float, Float, Int, Float)",
      [f"#({gf(s)}, {gf(d)}, {gf(r)}, {int(g)}, {gf(S._next_recall_stability(difficulty=d, stability=s, retrievability=r, rating=g))})"
       for s in [0.5, 2.0, 10.0, 60.0, 365.0] for d in [1.0, 5.0, 9.0]
       for r in [0.2, 0.6, 0.9, 0.99] for g in [Rating.Hard, Rating.Good, Rating.Easy]])

w("/// #(stability, difficulty, retrievability, expected)")
block("forget_stability", "#(Float, Float, Float, Float)",
      [f"#({gf(s)}, {gf(d)}, {gf(r)}, {gf(S._next_forget_stability(difficulty=d, stability=s, retrievability=r))})"
       for s in [0.5, 2.0, 10.0, 60.0, 365.0] for d in [1.0, 5.0, 9.0]
       for r in [0.2, 0.6, 0.9, 0.99]])

w("/// #(stability, expected_days)")
block("next_interval", "#(Float, Int)",
      [f"#({gf(s)}, {S._next_interval(stability=s)})"
       for s in [0.001, 0.5, 1.0, 3.7, 25.0, 400.0, 100000.0]])

BASE = datetime(2026, 1, 1, tzinfo=timezone.utc)
rows = []
for s in [0.5, 2.0, 10.0, 365.0]:
    for t in [0, 1, 5, 30, 365]:
        c = Card(state=State.Review, stability=s, difficulty=5.0, due=BASE, last_review=BASE)
        rows.append(f"#({gf(s)}, {t}, {gf(S.get_card_retrievability(card=c, current_datetime=BASE + timedelta(days=t)))})")
w("/// #(stability, elapsed_days, expected)")
block("retrievability", "#(Float, Int, Float)", rows)

# --- end-to-end scenarios ---
w("/// One review in a scenario: what was pressed, when, and the card that")
w("/// came out. `state` is 1 Learning / 2 Review / 3 Relearning; `step` is -1")
w("/// once the card has graduated (upstream's `None`).")
w("pub type Step {")
w("  Step(")
w("    rating: Int,")
w("    at_seconds: Int,")
w("    state: Int,")
w("    stability: Float,")
w("    difficulty: Float,")
w("    step: Int,")
w("    due_seconds: Int,")
w("  )")
w("}")
w("")
w("pub type Scenario {")
w("  Scenario(name: String, fuzz: Float, steps: List(Step))")
w("}")
w("")

START = datetime(2026, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
D = 1440

def run(scheduler, steps):
    card = Card(due=START)
    card.card_id = 1
    out = []
    for rating, mins in steps:
        when = START + timedelta(minutes=mins)
        card, _ = scheduler.review_card(card, rating, when)
        out.append((rating, mins, card))
    return out

SCENARIOS = [
    ("all_good", [(Rating.Good, 0), (Rating.Good, 10), (Rating.Good, 1*D), (Rating.Good, 5*D), (Rating.Good, 20*D)]),
    ("all_again", [(Rating.Again, 0), (Rating.Again, 1), (Rating.Again, 2), (Rating.Again, 3)]),
    ("easy_first", [(Rating.Easy, 0), (Rating.Easy, 15*D), (Rating.Easy, 90*D)]),
    ("hard_grind", [(Rating.Hard, 0), (Rating.Hard, 1), (Rating.Hard, 10), (Rating.Hard, 2*D)]),
    ("lapse_recovery", [(Rating.Good, 0), (Rating.Good, 10), (Rating.Good, 3*D), (Rating.Again, 10*D), (Rating.Good, 10*D+10), (Rating.Good, 12*D)]),
    ("same_day_repeats", [(Rating.Good, 0), (Rating.Good, 5), (Rating.Good, 10), (Rating.Good, 15), (Rating.Good, 20)]),
    ("mixed", [(Rating.Good, 0), (Rating.Hard, 10), (Rating.Good, 1*D), (Rating.Easy, 4*D), (Rating.Again, 30*D), (Rating.Hard, 30*D+10), (Rating.Good, 31*D), (Rating.Good, 45*D)]),
    ("new_hard_start", [(Rating.Hard, 0), (Rating.Good, 10), (Rating.Good, 2*D)]),
    ("long_horizon", [(Rating.Good, 0), (Rating.Good, 10), (Rating.Easy, 1*D), (Rating.Easy, 30*D), (Rating.Easy, 200*D), (Rating.Easy, 1000*D)]),
    ("relearn_chain", [(Rating.Good, 0), (Rating.Good, 10), (Rating.Good, 5*D), (Rating.Again, 20*D), (Rating.Again, 20*D+10), (Rating.Hard, 20*D+20), (Rating.Good, 20*D+30), (Rating.Good, 25*D)]),
]

emitted = []
# Fuzz off, then three pinned fuzz samples so the fuzz path is locked down too.
for fuzz_sample in [None, 0.0, 0.5, 0.999]:
    if fuzz_sample is None:
        scheduler = Scheduler(enable_fuzzing=False)
        tag, fz = "", -1.0
    else:
        scheduler = Scheduler(enable_fuzzing=True)
        sched_mod.random = lambda v=fuzz_sample: v
        tag, fz = f"_fuzz{str(fuzz_sample).replace('.','')}", fuzz_sample
    for name, steps in SCENARIOS:
        body = []
        for rating, mins, card in run(scheduler, steps):
            body.append(
                "    Step({}, {}, {}, {}, {}, {}, {}),".format(
                    int(rating), mins * 60, int(card.state),
                    gf(card.stability), gf(card.difficulty),
                    -1 if card.step is None else card.step,
                    round((card.due - START).total_seconds()),
                )
            )
        emitted.append((name + tag, fz, body))
    sched_mod.random = __import__("random").random

w("pub fn scenarios() -> List(Scenario) {")
w("  [")
for name, fz, body in emitted:
    w(f'    Scenario("{name}", {gf(fz)}, [')
    for line in body:
        w("  " + line)
    w("    ]),")
w("  ]")
w("}")

open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "test", "vectors.gleam"), "w").write("\n".join(L) + "\n")
print(f"wrote {len(L)} lines, {len(emitted)} scenarios")
