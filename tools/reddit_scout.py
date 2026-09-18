#!/usr/bin/env python3
"""Rank subreddits for a "here is a thing I built" post.

reddit.com refuses unauthenticated requests outright (403 on every JSON
endpoint, a JS shell on old.reddit), so this reads the Arctic Shift archive
(https://arctic-shift.photon-reddit.com), which mirrors Reddit's public data
and needs no key.  Posts are pulled in date windows and filtered locally;
the archive's title-search endpoint times out on busy subreddits.

    tools/reddit_scout.py fetch          # pull posts for every sub in SUBS (cached)
    tools/reddit_scout.py report         # rank from the cache
    tools/reddit_scout.py showcase leetcode   # list the showcase posts for one sub

Every number in the report is computed, and the formula is in `score_sub`.
"""

import json
import re
import statistics as st
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://arctic-shift.photon-reddit.com/api"
UA = "gleamdrill-subreddit-research/0.1 (contact gudetimes1234@gmail.com)"
CACHE = Path(__file__).resolve().parent.parent / "build" / "reddit_scout"
DAYS = 90          # baseline window
MAX_PAGES = 80     # 100 posts a page; caps the busiest subs at 8000 posts

SUBS = [
    # audience: people grinding interview problems
    "leetcode", "cscareerquestions", "csMajors", "codinginterview",
    "developersIndia", "learnprogramming", "ExperiencedDevs", "interviews",
    # audience: spaced-repetition people
    "Anki",
    # audience: the stack
    "gleamlang", "elixir", "Python", "typescript", "learnpython",
    # audience: people who like new projects
    "SideProject", "coolgithubprojects", "opensource", "InternetIsBeautiful",
    "webdev", "programming", "coding", "selfhosted", "commandline", "vim",
]

# A post that presents something the author made.
SHOWCASE = re.compile(
    r"\b(i (built|made|created|wrote|launched|developed|open.?sourced|released)"
    r"|(built|made|created|wrote|launched|developed|released) (a|an|my|this|the|free)"
    r"|open.?source(d)?\b"
    r"|show(ing)? ?off"
    r"|check out my"
    r"|(my|our) (new |free |little |first |side |open.?source )?(app|tool|project|website|site|extension|cli|game))\b",
    re.I,
)
# Problems specifically about interview-prep grinding.
TOPIC = re.compile(
    r"\b(leetcode|neetcode|dsa|data structures|algorithms?|interview prep|"
    r"technical interview|coding interview|spaced.?repetition|anki|fsrs|"
    r"blind ?75|grind ?75|system design)\b",
    re.I,
)
# Direct competitors/peers: same idea as GleamDrill.
PEER = re.compile(r"spaced.?repetition|anki|fsrs|srs\b|flashcard", re.I)

RULE_HINTS = [
    ("bans self-promo", re.compile(r"no (self[- ]?promotion|advertising|promotion|promo)|self[- ]?promotion (is )?(not allowed|prohibited|banned)", re.I)),
    ("self-promo day", re.compile(r"(showoff|show-off|self[- ]?promo(tion)?|promotion) (saturday|sunday|monday|tuesday|wednesday|thursday|friday|thread|day)", re.I)),
    ("10% rule", re.compile(r"\b(10|ten) ?%|9:1|9 to 1", re.I)),
    ("flair required", re.compile(r"flair (is )?(required|mandatory)|must (use|add|have) (a )?flair", re.I)),
]


def get(path, **params):
    url = f"{API}/{path}?" + urllib.parse.urlencode(params)
    for attempt in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=90) as r:
                body = json.load(r)
            if body.get("error"):
                raise RuntimeError(body["error"])
            return body["data"]
        except Exception as e:  # noqa: BLE001 - archive is flaky, retry everything
            wait = 3 * (attempt + 1)
            print(f"  retry in {wait}s: {e}", file=sys.stderr)
            time.sleep(wait)
    raise SystemExit(f"gave up on {url}")


def fetch_sub(name):
    CACHE.mkdir(parents=True, exist_ok=True)
    out = CACHE / f"{name}.json"
    if out.exists():
        return json.loads(out.read_text())
    meta = get("subreddits/search", subreddit=name, limit=1)
    meta = meta[0] if meta else {}
    now = int(time.time())
    before = now
    after = now - DAYS * 86400
    posts = []
    for page in range(MAX_PAGES):
        batch = get("posts/search", subreddit=name, limit=100, sort="desc",
                    after=after, before=before)
        if not batch:
            break
        posts.extend(batch)
        before = min(p["created_utc"] for p in batch)
        print(f"  {name}: {len(posts)} posts, back to {time.strftime('%Y-%m-%d', time.gmtime(before))}", file=sys.stderr)
        time.sleep(0.4)
        if len(batch) < 100:
            break
    slim = [{k: p.get(k) for k in (
        "id", "title", "selftext", "score", "num_comments", "created_utc",
        "removed_by_category", "link_flair_text", "author", "url", "is_self",
        "upvote_ratio")} for p in posts]
    data = {
        "name": name,
        "subscribers": meta.get("subscribers"),
        "description": (meta.get("description") or ""),
        "public_description": meta.get("public_description") or "",
        "submit_text": meta.get("submit_text") or "",
        "fetched_at": now,
        "window_days": DAYS,
        "truncated": len(posts) >= MAX_PAGES * 100,
        "oldest": before,
        "posts": slim,
    }
    out.write_text(json.dumps(data))
    return data


def is_removed(p):
    return bool(p.get("removed_by_category"))


def med(xs, default=0):
    return st.median(xs) if xs else default


def p75(xs, default=0):
    if not xs:
        return default
    xs = sorted(xs)
    return xs[min(len(xs) - 1, int(0.75 * len(xs)))]


def analyze(d):
    posts = d["posts"]
    # The freshest posts have not had time to collect votes or get removed.
    cutoff = d["fetched_at"] - 3 * 86400
    settled = [p for p in posts if p["created_utc"] < cutoff]
    live = [p for p in settled if not is_removed(p)]
    span_days = max(1, (d["fetched_at"] - d["oldest"]) / 86400)

    show = [p for p in settled if SHOWCASE.search(p["title"] or "")]
    show_live = [p for p in show if not is_removed(p)]
    topic = [p for p in settled if TOPIC.search((p["title"] or "") + " " + (p["selftext"] or "")[:400])]
    peer = [p for p in settled if PEER.search((p["title"] or "") + " " + (p["selftext"] or "")[:400])]
    peer_live = [p for p in peer if not is_removed(p)]

    rules = [label for label, rx in RULE_HINTS
             if rx.search(d["description"] + " " + d["submit_text"])]

    return {
        "sub": d["name"],
        "subscribers": d["subscribers"] or 0,
        "posts_per_day": len(posts) / span_days,
        "n_settled": len(settled),
        "removal_rate": (len(settled) - len(live)) / len(settled) if settled else 0,
        "base_med_score": med([p["score"] for p in live]),
        "base_p75_score": p75([p["score"] for p in live]),
        "base_med_comments": med([p["num_comments"] for p in live]),
        "show_n": len(show),
        "show_share": len(show) / len(settled) if settled else 0,
        "show_removal_rate": (len(show) - len(show_live)) / len(show) if show else None,
        "show_med_score": med([p["score"] for p in show_live], None),
        "show_p75_score": p75([p["score"] for p in show_live], None),
        "show_med_comments": med([p["num_comments"] for p in show_live], None),
        "show_top": sorted(show_live, key=lambda p: -p["score"])[:3],
        "topic_share": len(topic) / len(settled) if settled else 0,
        "peer_n": len(peer),
        "peer_med_score": med([p["score"] for p in peer_live], None),
        "peer_top": sorted(peer_live, key=lambda p: -p["score"])[:3],
        "rules": rules,
        "truncated": d["truncated"],
    }


def score_sub(a):
    """Expected reach of one showcase post, then discounted by fit.

    reach   = p75 score of surviving showcase posts (what a good-but-not-viral
              post gets here), times survival rate (chance it is not removed).
    fit     = share of posts already about interview prep / SRS, so an upvote
              here is from someone who might use the thing. Floored at 0.05
              so pure "show your project" subs are not zeroed out.
    crowd   = 1 / sqrt(posts per day): a post's hours on the new page.
    """
    if a["show_n"] < 5 or a["show_p75_score"] is None:
        return 0.0
    survival = 1 - (a["show_removal_rate"] or 0)
    reach = a["show_p75_score"] * survival
    fit = max(0.05, a["topic_share"])
    crowd = 1 / max(1.0, a["posts_per_day"]) ** 0.5
    return reach * fit * crowd * 100


def report(analyses):
    ranked = sorted(analyses, key=lambda a: -score_sub(a))
    hdr = f"{'sub':<20}{'score':>7}{'subs':>8}{'post/d':>7}{'show n':>7}{'rm%':>6}{'showP75':>8}{'showMed':>8}{'cmts':>6}{'fit%':>6}{'peer n':>7}  rules"
    print(hdr)
    print("-" * len(hdr))
    for a in ranked:
        rm = f"{100 * a['show_removal_rate']:.0f}" if a["show_removal_rate"] is not None else "-"
        print(f"{a['sub']:<20}{score_sub(a):>7.1f}{a['subscribers'] / 1000:>7.0f}k{a['posts_per_day']:>7.0f}"
              f"{a['show_n']:>7}{rm:>6}{str(a['show_p75_score'] or '-'):>8}{str(a['show_med_score'] or '-'):>8}"
              f"{str(a['show_med_comments'] if a['show_med_comments'] is not None else '-'):>6}"
              f"{100 * a['topic_share']:>6.0f}{a['peer_n']:>7}  {', '.join(a['rules'])}{' [truncated]' if a['truncated'] else ''}")
    print()
    print("score = showP75 * (1 - rm) * max(0.05, fit) * 100 / sqrt(post/d)   (see score_sub)")
    print("show n = posts in the last 90d that present something the author built; rm% = share of those mods removed")
    print("showP75/showMed = score of the 75th/50th-percentile surviving showcase post; fit% = posts about interview prep / SRS")


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "report"
    if cmd == "fetch":
        for s in SUBS:
            fetch_sub(s)
        return
    if cmd == "showcase":
        a = analyze(fetch_sub(sys.argv[2]))
        for label, key in (("showcase", "show_top"), ("peer (SRS/anki)", "peer_top")):
            print(f"== top {label} posts in r/{a['sub']}")
            for p in a[key]:
                print(f"  {p['score']:>5} pts {p['num_comments']:>4} cmts  {p['title'][:90]}")
        return
    analyses = [analyze(json.loads(f.read_text())) for f in sorted(CACHE.glob("*.json"))]
    report(analyses)


if __name__ == "__main__":
    main()
