//// The system design board: one fixed palette of architecture pieces, shown
//// whole on every board drill, and the grading of a selection against it.
////
//// The palette never varies between drills. Learning which thirty-six things
//// exist and which shelf each sits on is half of what the drill teaches; a
//// per-drill shortlist would turn recall into recognition, and the score
//// would stop meaning anything.
////
//// Imports nothing from the app -- `fsrs` and the stdlib only -- because
//// `gleamdrill/problem` imports this, and `problem` is the leaf that
//// `gleamdrill/api` and `gleamdrill/insights` already sit on top of. Reaching
//// back up from here would close a cycle.

import fsrs
import gleam/int
import gleam/list

// ---------------------------------------------------------------------------
// The board
// ---------------------------------------------------------------------------

/// The six shelves, in the order the board lays them out.
pub type Family {
  Storage
  Cache
  Async
  Traffic
  Scale
  Ops
}

/// One thing you can put on the board.
///
/// `id` is the stable key: it is what a pick is recorded as and what the
/// keyboard cursor addresses, and it must never change once written. `why` is
/// the one-line "what is this for" shown under the label -- written once,
/// here, because what a message queue is for does not depend on which system
/// you are designing.
///
/// `Piece` rather than `Element`: every view module already imports
/// `lustre/element.{type Element}`, and two things called Element in one file
/// is a trap.
pub type Piece {
  Piece(id: String, label: String, family: Family, why: String)
}

/// Which layer a board drill belongs to.
///
/// A `Primitive` is a small scenario -- one to three required pieces, all from
/// one family -- answering "what do you reach for when ...". A `Design` is the
/// payoff: five to nine pieces across families. Primitives are listed first in
/// the catalogue, which is what makes the queue introduce them first.
pub type Tier {
  Primitive
  Design
}

/// One board drill's answer key.
///
/// `required` is what the selection is scored against. `neutral` is defensible
/// but not the point -- a CDN in front of a chat system -- and is neither
/// credited nor penalised. It is per-drill rather than a property of the piece
/// because neutrality is exactly what varies: a CDN is neutral for chat and
/// required for video. Without it a thorough answer is punished for being
/// thorough, which is the same way an absurd quiz distractor makes a score a
/// lie.
///
/// Everything else on the palette is a wrong pick, and subtracts.
///
/// `why` is the per-drill justification for a piece, shown only after
/// submitting. It is a sparse override: a piece with no entry falls back to
/// its palette `why`, so authoring a board costs a `required` list and nothing
/// else until there is something drill-specific to say.
pub type Board {
  Board(
    tier: Tier,
    required: List(Piece),
    neutral: List(Piece),
    why: List(#(Piece, String)),
  )
}

// ---------------------------------------------------------------------------
// The palette -- thirty-six pieces, six to a shelf
// ---------------------------------------------------------------------------
//
// Constants rather than id strings in the content modules: a drill's answer
// key references these values, so a typo is a compile error instead of a pick
// that can never be matched and silently scores zero.

pub const relational_db = Piece(
  "relational_db",
  "Relational DB",
  Storage,
  "Rows, joins and transactions. The default until something forces otherwise.",
)

pub const document_store = Piece(
  "document_store",
  "Document store",
  Storage,
  "Whole objects by key, schema per document. For records read as a unit.",
)

pub const wide_column = Piece(
  "wide_column",
  "Wide-column store",
  Storage,
  "Huge row counts, queried by partition key. Writes cheap, ad-hoc queries not.",
)

pub const object_store = Piece(
  "object_store",
  "Object store",
  Storage,
  "Blobs too big for a database: images, video, backups, exports.",
)

pub const search_index = Piece(
  "search_index",
  "Search index",
  Storage,
  "Inverted index for text and faceted queries a database cannot serve.",
)

pub const timeseries_db = Piece(
  "timeseries_db",
  "Time-series DB",
  Storage,
  "Append-heavy points keyed by time, rolled up as they age.",
)

pub const cdn = Piece(
  "cdn",
  "CDN",
  Cache,
  "Copies at the edge, near the user. For bytes that are the same for everyone.",
)

pub const client_cache = Piece(
  "client_cache",
  "Client cache",
  Cache,
  "Cache-Control and ETags. The request that never leaves the device is free.",
)

pub const memory_cache = Piece(
  "memory_cache",
  "In-memory cache",
  Cache,
  "Redis or memcached in front of a store, for reads that repeat.",
)

pub const cache_aside = Piece(
  "cache_aside",
  "Cache-aside read path",
  Cache,
  "Read cache, miss, read store, fill. The invalidation story you can explain.",
)

pub const write_behind = Piece(
  "write_behind",
  "Write-behind buffer",
  Cache,
  "Absorb writes in memory, flush in batches. Trades durability for throughput.",
)

pub const materialised_view = Piece(
  "materialised_view",
  "Materialised view",
  Cache,
  "The answer computed ahead of the question and stored as a row.",
)

pub const message_queue = Piece(
  "message_queue",
  "Message queue",
  Async,
  "Hand work to a consumer and return. One delivery, one worker.",
)

pub const pubsub = Piece(
  "pubsub",
  "Pub/sub topic",
  Async,
  "One event, many independent subscribers, none of which the publisher knows.",
)

pub const stream_log = Piece(
  "stream_log",
  "Append-only stream log",
  Async,
  "An ordered, replayable log. Consumers keep their own offset.",
)

pub const batch_job = Piece(
  "batch_job",
  "Batch/ETL job",
  Async,
  "Periodic bulk pass over everything, for work that does not need to be live.",
)

pub const scheduler = Piece(
  "scheduler",
  "Scheduler",
  Async,
  "Fires work at a time: retries, expiries, reminders, rollups.",
)

pub const worker_pool = Piece(
  "worker_pool",
  "Worker pool",
  Async,
  "Fixed fleet draining a queue. What makes the queue's depth bounded.",
)

pub const geodns = Piece(
  "geodns",
  "GeoDNS",
  Traffic,
  "Resolve a user to their nearest region before a packet is sent.",
)

pub const l4_balancer = Piece(
  "l4_balancer",
  "L4 load balancer",
  Traffic,
  "Transport-layer forwarding. Fast, and blind to what the request says.",
)

pub const l7_proxy = Piece(
  "l7_proxy",
  "L7 reverse proxy",
  Traffic,
  "Routes on the request itself, terminates TLS, rewrites, redirects.",
)

pub const api_gateway = Piece(
  "api_gateway",
  "API gateway",
  Traffic,
  "One front door: authentication, quotas, versioning, request shaping.",
)

pub const rate_limiter = Piece(
  "rate_limiter",
  "Rate limiter",
  Traffic,
  "A ceiling per caller. The control that keeps one client from being all of them.",
)

pub const circuit_breaker = Piece(
  "circuit_breaker",
  "Circuit breaker",
  Traffic,
  "Stop calling a failing dependency so the failure does not become yours.",
)

pub const read_replicas = Piece(
  "read_replicas",
  "Read replicas",
  Scale,
  "Copies that serve reads. Scales reads; everything is slightly stale.",
)

pub const sharding = Piece(
  "sharding",
  "Sharding",
  Scale,
  "Split the data across independent stores. The answer when one cannot hold it.",
)

pub const consistent_hashing = Piece(
  "consistent_hashing",
  "Consistent hashing",
  Scale,
  "Placement that survives a resize without remapping everything.",
)

pub const autoscaling = Piece(
  "autoscaling",
  "Autoscaling group",
  Scale,
  "Instance count follows load. For traffic with a shape.",
)

pub const bulkheads = Piece(
  "bulkheads",
  "Bulkhead pools",
  Scale,
  "Separate pools per workload, so one saturated endpoint cannot starve the rest.",
)

pub const read_model = Piece(
  "read_model",
  "Denormalised read model",
  Scale,
  "A second shape of the data built for the query, written on the way in.",
)

pub const metrics = Piece(
  "metrics",
  "Metrics & dashboards",
  Ops,
  "Counters and latencies over time. How you know before the user tells you.",
)

pub const tracing = Piece(
  "tracing",
  "Distributed tracing",
  Ops,
  "One request stitched across services. How you find which hop is slow.",
)

pub const logging = Piece(
  "logging",
  "Centralised logging",
  Ops,
  "Structured lines in one searchable place, for the question you did not plan for.",
)

pub const health_checks = Piece(
  "health_checks",
  "Health checks",
  Ops,
  "How the balancer learns an instance is gone before the user does.",
)

pub const feature_flags = Piece(
  "feature_flags",
  "Feature flags",
  Ops,
  "Turn behaviour on for some traffic, off again without a deploy.",
)

pub const canary_deploy = Piece(
  "canary_deploy",
  "Canary deploy",
  Ops,
  "Ship to a slice first and watch it, so a bad release is a small one.",
)

/// Every piece, in board order. The one definition: the view lays this out and
/// the grader scores against it.
pub fn palette() -> List(Piece) {
  [
    relational_db,
    document_store,
    wide_column,
    object_store,
    search_index,
    timeseries_db,
    cdn,
    client_cache,
    memory_cache,
    cache_aside,
    write_behind,
    materialised_view,
    message_queue,
    pubsub,
    stream_log,
    batch_job,
    scheduler,
    worker_pool,
    geodns,
    l4_balancer,
    l7_proxy,
    api_gateway,
    rate_limiter,
    circuit_breaker,
    read_replicas,
    sharding,
    consistent_hashing,
    autoscaling,
    bulkheads,
    read_model,
    metrics,
    tracing,
    logging,
    health_checks,
    feature_flags,
    canary_deploy,
  ]
}

/// The shelves, in board order.
pub fn families() -> List(Family) {
  [Storage, Cache, Async, Traffic, Scale, Ops]
}

pub fn pieces_in(family: Family) -> List(Piece) {
  list.filter(palette(), fn(piece: Piece) { piece.family == family })
}

pub fn family_label(family: Family) -> String {
  case family {
    Storage -> "Storage"
    Cache -> "Cache"
    Async -> "Async"
    Traffic -> "Traffic"
    Scale -> "Scale"
    Ops -> "Ops"
  }
}

/// Lowercase identifier, used as a CSS class suffix.
pub fn family_slug(family: Family) -> String {
  case family {
    Storage -> "storage"
    Cache -> "cache"
    Async -> "async"
    Traffic -> "traffic"
    Scale -> "scale"
    Ops -> "ops"
  }
}

/// The piece at a flat index into `palette`, which is what the keyboard cursor
/// holds. The columns reflow with the viewport, so the cursor walks the list
/// rather than pretending to be two-dimensional.
pub fn at(index: Int) -> Result(Piece, Nil) {
  palette()
  |> list.drop(index)
  |> list.first
}

/// Where a piece sits in `palette`, or -1. The click path dispatches an id, so
/// this is how the cursor follows a mouse pick.
pub fn index_of(piece: Piece) -> Int {
  find_index(palette(), piece, 0)
}

fn find_index(pieces: List(Piece), wanted: Piece, seen: Int) -> Int {
  case pieces {
    [] -> -1
    [first, ..rest] ->
      case first == wanted {
        True -> seen
        False -> find_index(rest, wanted, seen + 1)
      }
  }
}

/// The piece with this id. Used by the click path, which carries an id rather
/// than an index so it does not depend on palette ordering.
pub fn find(id: String) -> Result(Piece, Nil) {
  list.find(palette(), fn(piece: Piece) { piece.id == id })
}

// ---------------------------------------------------------------------------
// Grading
// ---------------------------------------------------------------------------

/// What the grader found. The verdict renders from this; nothing recomputes it.
pub type Grade {
  Grade(
    hit: List(Piece),
    missed: List(Piece),
    wrong: List(Piece),
    /// Neutral pieces that were picked: shown in the verdict, never scored.
    neutral: List(Piece),
    /// `hit - wrong` as a percentage of `required`, floored at zero.
    percent: Int,
    rating: fsrs.Rating,
  )
}

/// What happened to one piece, for the view's chip classes.
pub type Verdict {
  Hit
  Missed
  WrongPick
  NeutralPick
  Ignored
}

/// Under three minutes: the line the stats screen already calls fluent
/// (`gleamdrill/insights.fluent_ms`), reused here rather than a fresh number
/// invented for this screen.
///
/// Repeated rather than imported, because `insights` reaches `gleamdrill/api`,
/// which reaches `gleamdrill/problem`, which imports this module. A test
/// asserts the two agree, the way `tools/check-versions.sh` asserts the copies
/// of the Gleam version do.
pub const design_easy_ms = 180_000

/// A primitive is one to three pieces on a board you have already learned, so
/// it gets a third of the design's allowance.
pub const primitive_easy_ms = 60_000

pub fn easy_ms(tier: Tier) -> Int {
  case tier {
    Design -> design_easy_ms
    Primitive -> primitive_easy_ms
  }
}

/// The one grading rule.
///
/// A wrong pick cancels a right one, one for one. Naming all six pieces plus
/// three you do not need is a system somebody has to build and operate, and it
/// is not a clean answer -- on a six-piece board that lands at 50%, a Hard,
/// which is what "you knew it but you would have overbuilt it" deserves.
///
/// Neutral picks are removed before anything is counted: neither a hit nor a
/// wrong pick, and the denominator does not move.
///
/// Floored at zero, because there is nothing worse than Again and a score of
/// -2 must not be distinguishable from a score of 0.
pub fn grade(picks: List(String), board: Board, duration_ms: Int) -> Grade {
  let picked = fn(piece: Piece) { list.contains(picks, piece.id) }
  let hit = list.filter(board.required, picked)
  let missed = list.filter(board.required, fn(piece) { !picked(piece) })
  let neutral = list.filter(board.neutral, picked)
  let wrong =
    palette()
    |> list.filter(fn(piece) {
      picked(piece)
      && !list.contains(board.required, piece)
      && !list.contains(board.neutral, piece)
    })

  let total = list.length(board.required)
  let score = list.length(hit) - list.length(wrong)
  let percent = case total {
    // A board with no required pieces is an authoring bug, not a perfect
    // score. The content tests reject one, but the grader must not divide by
    // it either way.
    0 -> 0
    _ -> int.clamp(score * 100 / total, min: 0, max: 100)
  }

  Grade(
    hit:,
    missed:,
    wrong:,
    neutral:,
    percent:,
    rating: rating(percent, list.length(wrong), board.tier, duration_ms),
  )
}

/// The thresholds, deliberately coarse: the score is a proportion of a five-
/// to-nine item answer, so a finer scale would be reading noise.
///
///   Easy   everything, nothing spurious, inside the fluent line
///   Good   three quarters
///   Hard   half
///   Again  less
///
/// Time only ever costs you Easy. A complete board answered slowly is a Good;
/// nowhere else on the scale is there a speed penalty, because a board is
/// thirty-six things to read and a clock there would punish care.
pub fn rating(
  percent: Int,
  wrong: Int,
  tier: Tier,
  duration_ms: Int,
) -> fsrs.Rating {
  case percent, wrong, duration_ms <= easy_ms(tier) {
    100, 0, True -> fsrs.Easy
    p, _, _ if p >= 75 -> fsrs.Good
    p, _, _ if p >= 50 -> fsrs.Hard
    _, _, _ -> fsrs.Again
  }
}

/// What to say about one piece once the board has been submitted.
pub fn verdict(board: Board, piece: Piece, picks: List(String)) -> Verdict {
  let picked = list.contains(picks, piece.id)
  case
    list.contains(board.required, piece),
    list.contains(board.neutral, piece),
    picked
  {
    True, _, True -> Hit
    True, _, False -> Missed
    _, True, True -> NeutralPick
    _, _, True -> WrongPick
    _, _, False -> Ignored
  }
}

/// The justification for a piece: the drill's own line if it wrote one, the
/// palette's otherwise. One lookup, so the view never has to know there are
/// two places to ask.
pub fn why(board: Board, piece: Piece) -> String {
  case list.key_find(board.why, piece) {
    Ok(written) -> written
    Error(Nil) -> piece.why
  }
}
