//// Board drills: a scenario, the whole thirty-six piece palette, and a
//// selection graded against an answer key.
////
//// Two authoring rules, both of which exist to stop the score being a lie:
////
////  1. `required` is only what the scenario forces. A piece you would
////     probably reach for but the constraints do not demand belongs in
////     `neutral`, which is neither credited nor penalised. Requiring the
////     merely sensible punishes a correct, minimal answer.
////  2. Every constraint in the prompt earns its place. A number that does not
////     change which pieces are right is decoration, and decoration teaches
////     the reader to skim the constraints -- which is the one habit a design
////     interview cannot afford.
////
//// Primitives come first in the subcategory list because catalogue order is
//// introduction order: `queue.fresh` walks the catalogue, so listing them
//// first is what teaches the vocabulary before the designs that need it.

import gleam/list
import gleam/option.{None, Some}
import gleamdrill/board.{type Piece, Design, Primitive}
import gleamdrill/problem.{type Category, type Problem, Category, Subcategory}

pub fn category() -> Category {
  Category(
    "System Design Board",
    [
      Subcategory("Primitives", primitives()),
      Subcategory("Designs", designs()),
    ]
      |> list.filter(fn(s: problem.Subcategory) { s.problems != [] }),
  )
}

/// The category name, shared with anything that needs to name the board
/// without hardcoding the string.
pub const name = "System Design Board"

// ---------------------------------------------------------------------------
// Primitives -- one family, one to three pieces
// ---------------------------------------------------------------------------

fn primitives() -> List(Problem) {
  [
    b(
      title: "Reads that repeat",
      prompt: "A product page is fetched eight thousand times a minute and its contents change twice a day. The database is at seventy percent CPU serving byte-identical rows to every caller. The page is personalised with the viewer's name, so it cannot be served whole from an edge. What do you put in front of the database?",
      tier: Primitive,
      required: [board.memory_cache, board.cache_aside],
      neutral: [board.client_cache],
      why: [
        #(
          board.cache_aside,
          "Naming the cache is half an answer. The read path -- miss, read through, fill, and a stated expiry -- is the half that says what happens when the row changes.",
        ),
      ],
    ),
    b(
      title: "Work that can wait",
      prompt: "An upload endpoint accepts a video, then transcodes it to four resolutions and extracts a thumbnail. Transcoding takes two to nine minutes. Today the request holds the connection open until it finishes, and the p99 upload latency is nine minutes. The user does not need the renditions before the page reloads. What changes?",
      tier: Primitive,
      required: [board.message_queue, board.worker_pool],
      neutral: [board.object_store, board.scheduler],
      why: [
        #(
          board.worker_pool,
          "A queue without a bounded set of consumers is a backlog with no ceiling. The pool is what makes queue depth a number you can reason about.",
        ),
      ],
    ),
    b(
      title: "One caller, everybody's problem",
      prompt: "A public read API is falling over roughly once a week. Each time, the traffic is one integration retrying a failed call in a tight loop -- a few hundred requests a second from a single key, against a service sized for a few thousand from everyone. Legitimate callers get timeouts. What is the missing control?",
      tier: Primitive,
      required: [board.rate_limiter],
      neutral: [board.api_gateway, board.bulkheads],
      why: [
        #(
          board.rate_limiter,
          "Per-caller, not global: a global ceiling sheds the innocent traffic alongside the abusive, which is the failure you already have.",
        ),
      ],
    ),
    b(
      title: "One box cannot hold it",
      prompt: "An events table has reached four billion rows and eleven terabytes. It is already on the largest instance the provider sells, writes are the bottleneck, and every query carries a tenant id. The fleet is resized about twice a year and a resize currently means a weekend of downtime. What do you reach for?",
      tier: Primitive,
      required: [board.sharding, board.consistent_hashing],
      neutral: [board.wide_column, board.read_replicas],
      why: [
        #(
          board.consistent_hashing,
          "Sharding alone answers where a row lives today. Twice-yearly resizes are what make how placement survives a resize part of the answer rather than a detail.",
        ),
      ],
    ),
  ]
}

// ---------------------------------------------------------------------------
// Designs -- five to nine pieces, across families
// ---------------------------------------------------------------------------

fn designs() -> List(Problem) {
  [
    b(
      title: "Design a URL shortener",
      prompt: "Two hundred million new links a month, ten billion redirects. A redirect must complete in under fifty milliseconds at the ninety-ninth percentile anywhere in the world. A link's target never changes once created, and links are read roughly fifty times for every one written. The service is a standing target for spam. Put the system on the board.",
      tier: Design,
      required: [
        board.relational_db,
        board.memory_cache,
        board.cdn,
        board.l7_proxy,
        board.consistent_hashing,
        board.rate_limiter,
        board.metrics,
      ],
      neutral: [board.read_replicas, board.geodns, board.api_gateway],
      why: [
        #(
          board.cdn,
          "Fifty milliseconds at the ninety-ninth percentile anywhere in the world is a distance constraint, not a throughput one. No origin tier answers it; only a copy near the user does.",
        ),
        #(
          board.consistent_hashing,
          "Ten billion reads means the key space is partitioned. Hashing the short code is what keeps growing the fleet from remapping every existing link.",
        ),
        #(
          board.rate_limiter,
          "Shorteners are abused for spam. It is the one write-path control you cannot leave out.",
        ),
        #(
          board.l7_proxy,
          "The redirect itself is an application-layer decision -- read the path, look up the code, return a 301 or a 302. A transport-layer balancer cannot see the path.",
        ),
      ],
    ),
    b(
      title: "Design a news feed",
      prompt: "Three hundred million daily users. The median account follows two hundred others; a handful of accounts have forty million followers each. Opening the app must render the first screen of the feed in under two hundred milliseconds, and a new post should appear in followers' feeds within a few seconds. Feeds are read far more often than posts are written. Put the system on the board.",
      tier: Design,
      required: [
        board.relational_db,
        board.read_model,
        board.memory_cache,
        board.pubsub,
        board.worker_pool,
        board.sharding,
        board.cdn,
        board.metrics,
      ],
      neutral: [board.stream_log, board.object_store, board.l7_proxy],
      why: [
        #(
          board.read_model,
          "Two hundred milliseconds does not permit assembling two hundred timelines at read time. The feed is built on the way in and stored as its own shape.",
        ),
        #(
          board.pubsub,
          "One post reaches every follower's feed builder, and the poster's write path must not know how many of them there are.",
        ),
        #(
          board.worker_pool,
          "Forty million followers is a fan-out that has to be drained by something with a bounded size, or one celebrity post becomes an outage.",
        ),
        #(
          board.cdn,
          "The media attached to posts is the same bytes for every viewer, and it is the overwhelming majority of what is transferred.",
        ),
      ],
    ),
  ]
}

// ---------------------------------------------------------------------------

/// One board drill.
///
/// `approach` is deliberately empty, as it is for the quiz: the drill view
/// offers the hint ladder before an answer is submitted, and on a board the
/// plan would be the answer.
fn b(
  title title: String,
  prompt prompt: String,
  tier tier: board.Tier,
  required required: List(Piece),
  neutral neutral: List(Piece),
  why why: List(#(Piece, String)),
) -> Problem {
  problem.Problem(
    title: title,
    prompt: prompt,
    prompt_html: False,
    approach: [],
    solutions: [],
    language: problem.Board,
    check: None,
    quiz: None,
    board: Some(board.Board(
      tier: tier,
      required: required,
      neutral: neutral,
      why: why,
    )),
    difficulty: None,
  )
}
