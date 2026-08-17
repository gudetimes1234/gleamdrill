//// Multiple-choice questions drawn from *Acing the System Design Interview*,
//// via the 14-day sprint guide in ~/github/system_design/study-plan.html. The
//// nine subcategories are the scoring buckets: the exam report breaks a score
//// down by these, so a sitting ends pointing at a chapter to reread.
////
//// Two authoring rules, both of which exist to stop the score being a lie:
////
////  1. Every distractor is something the book actually discusses. An
////     obviously-absurd option turns a four-way question into a two-way one
////     and inflates the score.
////  2. `correct` is spread evenly across 0-3. Authoring is easier with the
////     right answer written first, but shipping it that way means you can
////     score 100% by always picking the top option.

import algodrill/problem.{
  type Category, type Problem, type Subcategory, Category, Concept, Problem,
  Quiz, Subcategory,
}
import gleam/list
import gleam/option.{None, Some}

pub fn category() -> Category {
  Category(
    "System Design",
    // Sections with no questions written yet are dropped, so the menu has no
    // dead ends while the pool is still being filled in.
    [
      Subcategory("Interview flow & requirements", flow()),
      Subcategory("Observability & search", observability()),
      Subcategory("Non-functional requirements", non_functional()),
      Subcategory("Storage, replication & sharding", storage()),
      Subcategory("ETL, denormalization & caching", etl()),
      Subcategory("Events & distributed transactions", events()),
      Subcategory("Services & API paradigms", services()),
      Subcategory("Case studies", case_studies()),
      Subcategory("Terminology", terminology()),
    ]
      |> list.filter(fn(s: Subcategory) { s.problems != [] }),
  )
}

/// The category name, shared with the exam sampler so it does not have to
/// hardcode the string.
pub const name = "System Design"

// ---------------------------------------------------------------------------
// Non-functional requirements — Ch 3.1-3.12 (sprint sessions S05, S06)
// ---------------------------------------------------------------------------

fn non_functional() -> List(Problem) {
  [
    q(
      title: "Buying a bigger host",
      prompt: "Your service is saturating its single host. Finance has approved a mainframe-class replacement with four times the cores and eight times the RAM, and a migration window is agreed. Setting the invoice aside, what is the strongest argument against making this your scaling strategy?",
      choices: [
        "You lose the ability to do gradual rollouts, because there is no second host to shift a fraction of traffic onto",
        "It trades higher latency for lower cost, because one host cannot be placed close to every region of users",
        "Past a point, monetary cost rises faster than the hardware's performance; current technology imposes hard limits on processing power, RAM and storage per host; and the swap may require downtime unless the service's state lives elsewhere",
        "A single host cannot implement the bulkhead pattern, so one saturated endpoint will starve all the others",
      ],
      correct: 2,
      explanation: "Three disadvantages of vertical scaling. Past a point, monetary cost rises faster than the hardware's performance - a multi-processor mainframe costs more than the same number of commodity single-processor machines. Current technology imposes hard limits on processing power, RAM and storage per host. And it may require downtime, unless you provision a new host, which is only possible if the service's state lives elsewhere.",
      page: "p88",
    ),
    q(
      title: "Choosing the load balancer layer",
      prompt: "You need the load balancer to reject requests missing an authorization header with a 401, terminate TLS, and forward events by key range based on a field in the request body. Which balancer do you specify, and why?",
      choices: [
        "Level 7 - it works at the application layer, so it can route on packet contents, authenticate, and terminate TLS",
        "Level 4 - it works at the transport layer, which is faster and sufficient for header inspection",
        "Level 4 with TLS passthrough, delegating authentication to an API gateway behind it",
        "Either - the layers differ only in throughput, not in what they can inspect",
      ],
      correct: 0,
      explanation: "A level 4 balancer works at the transport layer (TCP), makes routing decisions from address information in the first few packets of the stream, and can only forward. A level 7 balancer works at the application layer (HTTP), so it can route on packet contents, authenticate (returning 401 when a header is absent), and terminate TLS.",
      page: "p89-90",
    ),
    q(
      title: "Reading an availability SLA",
      prompt: "A contract permits roughly five minutes of unplanned downtime per year. Which availability target are you being asked to hit?",
      choices: [
        "99.99% - 52.6 minutes per year, 8.64 seconds per day",
        "99.9% - 8.77 hours per year, 1.44 minutes per day",
        "99.95% - 4.38 hours per year, 43 seconds per day",
        "99.999% - 5.26 minutes per year, 864 milliseconds per day",
      ],
      correct: 3,
      explanation: "99.9% is 8.77 hours per year (1.44 minutes per day). 99.99% is 52.6 minutes per year (8.64 seconds per day). 99.999% is 5.26 minutes per year (864 milliseconds per day).",
      page: "p91",
    ),
    q(
      title: "The circuit breaker that hid the limit",
      prompt: "Your team wraps every downstream call in a circuit breaker. A load test that previously overwhelmed the payment service now passes cleanly, so you ship. Real customer traffic then causes an outage in that same service. What went wrong?",
      choices: [
        "The breaker's failure counter reset between test runs, so the threshold was never actually reached",
        "The breaker makes the system harder to test - it opened under the test load and masked the downstream limit the test existed to find",
        "The breaker's probe requests counted against the payment service's rate limit and exhausted it",
        "Retries without jitter arrived in unison and caused a retry storm against the recovering service",
      ],
      correct: 1,
      explanation: "A circuit breaker counts failures in a recent interval and stops calling downstream past a threshold, later probing with a limited number of requests. Its hidden cost: the breaker makes the system harder to test - a load test that should have overwhelmed downstream now passes, and real customer load causes the outage.",
      page: "p93-94",
    ),
    q(
      title: "What per-endpoint thread pools cost",
      prompt: "You adopt the bulkhead pattern, giving each endpoint its own thread pool so an exhausted pool cannot starve the others. What have you given up in exchange?",
      choices: [
        "Requests can no longer be traced across services, because each pool logs under its own identifier",
        "You can no longer terminate TLS at the load balancer, since pools are selected after decryption",
        "Thread pools force synchronous I/O, so a long downstream call blocks a whole pool",
        "Pools cannot support each other during a spike - an idle pool's capacity is unavailable to a saturated one",
      ],
      correct: 3,
      explanation: "Divide the system into isolated pools so a fault in one cannot affect the whole. Per-endpoint thread pools mean an exhausted pool does not starve other endpoints. Host pools per requestor stop a crash-inducing request from taking down every host, and stop one noisy requestor consuming all capacity. The tradeoff: pools cannot support each other during a spike.",
      page: "p95-96",
    ),
    q(
      title: "Which consistency are you talking about",
      prompt: "You have said \"consistency\" four times and the interviewer stops you: which consistency do you mean? What is the distinction they are fishing for?",
      choices: [
        "ACID consistency means synchronous replication; CAP consistency means asynchronous replication with a bounded lag",
        "CAP consistency is read-after-write for the writing client; ACID consistency is the durability guarantee that survives a crash",
        "ACID consistency is about data relationships - foreign keys, uniqueness, the invariants a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time and begin serving a change at the same time",
        "ACID consistency applies within a single node; CAP consistency applies across the cluster, but both mean reads never return stale data",
      ],
      correct: 2,
      explanation: "ACID consistency is about data relationships - foreign keys, uniqueness, and the invariants that a transaction must preserve. CAP consistency is actually linearizability: all nodes contain the same data at a moment in time, and when data changes all nodes start serving the change at the same time. Emphasize the distinction out loud in the interview.",
      page: "p98",
    ),
    q(
      title: "Accepting writes during a partition",
      prompt: "A hard requirement: the store must keep accepting writes during a network partition between data centers. Stale reads for a few seconds are acceptable. Which of these do you pick, and what rules the others out?",
      choices: [
        "Redis - being in-memory, it is unaffected by partitions between data centers",
        "Cassandra - an ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did",
        "MongoDB - it favors availability, and its replica sets elect a new primary on either side of the partition",
        "HBase - its write-ahead log lets it accept writes and reconcile them once the partition heals",
      ],
      correct: 1,
      explanation: "Databases favoring linearizability: HBase, MongoDB, Redis. Databases favoring availability: Cassandra, CouchDB, Dynamo, Hadoop, Riak. An ACID database cannot accept writes during a network partition, because it could not maintain ACID consistency if it did.",
      page: "p98",
    ),
    q(
      title: "Propagating state across a small cluster",
      prompt: "Eight hosts need to share a small amount of mutable state. You want low latency, simple operations and independent scaling of the state store, and you accept that nothing will validate the shape of what gets written. Which technique fits?",
      choices: [
        "A full mesh, where every host broadcasts state changes to every other host",
        "A coordination service such as ZooKeeper, using Paxos, Raft or Zab",
        "A gossip protocol with random leader selection",
        "A distributed cache such as Redis - simple, low latency and independently scalable, at the cost of no schema validation, so bad data goes undetected until it is read, and no encryption",
      ],
      correct: 3,
      explanation: "Full mesh - every host broadcasts to every other; simplest, but message count grows quadratically, so small clusters only. Coordination service - Paxos, Raft, Zab; ZooKeeper gives access control, in-memory speed, horizontal scaling and ordered reads, but is complex and must guarantee exactly one leader or you get split brain. Distributed cache - Redis; simple, low latency, independently scalable, but no schema validation, so bad data goes undetected until read, and no encryption. Gossip protocol and random leader selection trade consistency and accuracy for lower cost.",
      page: "p99-103",
    ),
    q(
      title: "Approximating a distinct count",
      prompt: "A dashboard needs the number of unique visitors over a huge event stream. An exact COUNT DISTINCT is too expensive, and a few percent of error is fine. Which algorithm?",
      choices: [
        "HyperLogLog, which estimates cardinality - it is what Presto uses for this",
        "Count-min sketch, which is the standard structure for estimating distinct values in a stream",
        "A bloom filter, testing each visitor for membership and counting the misses",
        "A quorum read across the aggregation tier, summing each node's local count",
      ],
      correct: 0,
      explanation: "HyperLogLog for cardinality - COUNT DISTINCT, as used in Presto. Count-min sketch for estimating the frequency of events in a data stream. Estimation algorithms trade accuracy for lower complexity.",
      page: "p103-104",
    ),
    q(
      title: "What PACELC adds to CAP",
      prompt: "The interviewer asks whether CAP is the whole story. What does PACELC add to it?",
      choices: [
        "It adds durability as a fourth property, alongside consistency, availability and partition tolerance",
        "It formalizes eventual consistency as a fourth choice available during a partition",
        "Else - during normal operation with no partition, you must still choose between latency and consistency",
        "Else - during normal operation, you must still choose between availability and partition tolerance",
      ],
      correct: 2,
      explanation: "PACELC is an extension of CAP: when a network Partition occurs you must choose between Availability and Consistency; Else, during normal operation, you must choose between Latency and Consistency. The book flags it as further reading rather than covering it in depth.",
      page: "p107",
    ),
  ]
}

// ---------------------------------------------------------------------------
// Storage, replication & sharding — Ch 4.1-4.4 (sprint session S07)
// ---------------------------------------------------------------------------

fn storage() -> List(Problem) {
  [
    q(
      title: "Partitioning, sharding and replication",
      prompt: "You have used all three words in one sentence and the interviewer asks you to be precise. Which statement is right?",
      choices: [
        "Replication and sharding both divide a data set into subsets; partitioning is the term for copying those subsets to other nodes",
        "Replication makes copies of data on different nodes; partitioning and sharding both divide a data set into subsets, but sharding implies those subsets are distributed across multiple nodes and partitioning does not",
        "Sharding makes copies of data across nodes; partitioning divides a data set into subsets on one node; replication is the general term for both",
        "Partitioning is a physical layout on disk; sharding is the logical division above it; replication is orthogonal to both",
      ],
      correct: 1,
      explanation: "Replication makes copies of data - replicas - stored on different nodes. Partitioning and sharding both divide a data set into subsets; sharding implies the subsets are distributed across multiple nodes, partitioning does not.",
      page: "p111",
    ),
    q(
      title: "Where three-megabyte objects belong",
      prompt: "Your service stores user-uploaded objects averaging 3 MB, read far more often than written, streamed to clients on request. Database or filesystem, and on what grounds?",
      choices: [
        "Database, as a BLOB column, so the object stays transactionally consistent with its metadata row",
        "Either - below about 10 MB the choice makes no measurable difference to read latency",
        "Database, sharded by object ID, so reads spread evenly across the cluster",
        "Filesystem - objects larger than 1 MB belong there; database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow",
      ],
      correct: 3,
      explanation: "The 2006 Microsoft rule of thumb: objects smaller than 256 KB are best stored in a database; objects larger than 1 MB are best on the filesystem. Between 256 KB and 1 MB, the read:write ratio and the rate of overwrite decide. Also: database objects load entirely into memory, so streaming a file out of a database is inefficient, and large rows make replication slow.",
      page: "p111",
    ),
    q(
      title: "Read replicas for a write-heavy load",
      prompt: "Your single-leader database is saturating on writes. A teammate proposes adding four read replicas. Does that solve the problem?",
      choices: [
        "No - single-leader replication scales reads, not writes, and the entire database must still fit on the single leader host",
        "Yes - once provisioned, replicas can accept writes and forward them to the leader asynchronously",
        "Yes, provided the replicas are synchronous, which lets the leader acknowledge writes without waiting for disk",
        "Yes - adding a second tier of replicas below the first spreads write load across both tiers",
      ],
      correct: 0,
      explanation: "Single-leader replication scales reads, not writes. Its limits: the entire database must fit on a single host, and followers are eventually consistent because write replication takes time.",
      page: "p112-115",
    ),
    q(
      title: "Sizing a quorum",
      prompt: "You have 7 nodes and want quorum reads and writes that guarantee consistency. Which pair of quorum sizes does the rule give you?",
      choices: [
        "Read 3, write 3", "Read 2, write 5", "Read 4, write 4",
        "Read 3, write 4",
      ],
      correct: 2,
      explanation: "A quorum is the minimum number of nodes that must agree for consensus. With n nodes, read and write quorums of n/2 + 1 guarantee consistency - here 7/2 + 1 = 4 for both. Every other pair listed sums to 7 or fewer, so a read quorum and a write quorum can miss each other entirely.",
      page: "p117",
    ),
    q(
      title: "Last write wins by timestamp",
      prompt: "Two leaders in different data centers accept conflicting updates to the same row. A teammate proposes resolving it with last-write-wins on a timestamp column. Why does that not work?",
      choices: [
        "It works, but only when both leaders sit in the same data center and share a clock signal",
        "Clocks on different nodes cannot be perfectly synchronized - even periodically synced servers differ by milliseconds or more, so writes made inside that window cannot be ordered",
        "Timestamps require a coordination service to issue them, which reintroduces the single leader you were trying to avoid",
        "Timestamps are not monotonic while NTP is slewing, but the drift is bounded, so the scheme is safe at one-second granularity",
      ],
      correct: 1,
      explanation: "Clocks on different nodes cannot be perfectly synchronized, and sharing one clock fails because each node receives its signal at a different time - clock skew. Even periodically synced servers differ by milliseconds or more, so queries made within that window cannot be ordered.",
      page: "p116",
    ),
    q(
      title: "Tuning quorums for a read-heavy load",
      prompt: "A 5-node cluster serves ten reads for every write, and you need consistency rather than eventual consistency. How do you set the quorums, and what does it cost?",
      choices: [
        "Low write quorum, high read quorum - fast reads, paid for with slower writes",
        "Read and write quorums both set to 5, so every operation sees every node",
        "Read and write quorums both set to 1, accepting eventual consistency for speed on both sides",
        "Low read quorum, high write quorum - fast reads, paid for with slower writes",
      ],
      correct: 3,
      explanation: "If you want consistency you must choose: a low write quorum and high read quorum gives fast writes; the reverse - a low read quorum and high write quorum - gives fast reads. Otherwise only eventual consistency is possible, and UPDATE and DELETE cannot be consistent.",
      page: "p117",
    ),
    q(
      title: "Seeing your own increment",
      prompt: "A user taps like and must immediately see the count include their own tap. Other users continuing to see the old count for a few seconds is fine. Name the guarantee, and the general lesson.",
      choices: [
        "Read-after-write consistency - and the lesson is to look for ways to relax consistency, minimizing the amount of data that must be consistent for all users",
        "Linearizability - and the lesson is that any user-visible counter must be linearizable or users will report it as a bug",
        "Monotonic reads - and the lesson is that a client must be pinned to one replica for the duration of a session",
        "Strong eventual consistency - and the lesson is that conflict-free replicated data types remove the need to choose",
      ],
      correct: 0,
      explanation: "Read-after-write consistency: a user who increments a counter and then reads it sees their own increment, while other users may still be served the pre-increment value. The general lesson: look for ways to relax consistency, and minimize the amount of data that must be consistent for all users.",
      page: "p117",
    ),
    q(
      title: "The JOIN that got slower after sharding",
      prompt: "After sharding two large tables, a JOIN between them became dramatically slower. What is happening, and what is the suggested remedy?",
      choices: [
        "Replication lag means followers hold different snapshots of each table; directing the JOIN at the leader restores speed",
        "The query planner lost its statistics at shard time; a covering index on each shard restores the original plan",
        "Each shard of one table must compare its rows against every row of the other across the network - unless the JOIN is on the shard key, so you may constrain JOINs to those columns",
        "The shard key was hashed rather than ranged, so matching rows are scattered; switching to range sharding colocates them",
      ],
      correct: 2,
      explanation: "Sharding imposes two limits on an RDBMS. JOINs get far slower - each shard of one table must compare its rows against every row of the other across the network, unless the JOIN is on the shard key, so you may constrain JOINs to those columns. And aggregation splits between database and application.",
      page: "p120",
    ),
    q(
      title: "The aggregate that survived sharding worst",
      prompt: "Your reporting queries run sum, count, mean and median over a sharded table. Which one becomes disproportionately harder and slower, and why?",
      choices: [
        "Mean - it needs the full row set in one place before a divisor can be computed",
        "Median - sum and mean are easy because each node returns partial results, but median and percentile are much harder and slower",
        "Sum - each node's partial must be locked across shards to avoid double counting",
        "Count - it requires a distinct pass over every shard before the totals can be added",
      ],
      correct: 1,
      explanation: "Aggregation splits between database and application: sum and mean are easy (each node returns partials), median and percentile are much harder and slower.",
      page: "p120",
    ),
    q(
      title: "Replication lag across thirty followers",
      prompt: "Your leader replicates to thirty followers and the tail of them is falling steadily behind. What is the explanation, and the remedy?",
      choices: [
        "A leader's throughput caps the number of followers it can serve, so multi-level replication adds tiers to scale reads further - at the cost of further-delayed consistency",
        "Followers compete with clients for the leader's read capacity, so moving client reads onto the followers lets the leader catch up",
        "The write quorum has been set too high, so each write waits on too many acknowledgements before the next can start",
        "Eventual consistency means replication lag is unbounded by design, so the only remedy is to make reads tolerate any staleness",
      ],
      correct: 0,
      explanation: "A leader's throughput caps the number of followers, so multi-level replication adds tiers to scale reads further, at the cost of further-delayed consistency.",
      page: "p112-115",
    ),
  ]
}

// ---------------------------------------------------------------------------
// Not yet written — pass 2 fills these in.
// ---------------------------------------------------------------------------

fn flow() -> List(Problem) {
  []
}

fn observability() -> List(Problem) {
  []
}

fn etl() -> List(Problem) {
  []
}

fn events() -> List(Problem) {
  []
}

fn services() -> List(Problem) {
  []
}

fn case_studies() -> List(Problem) {
  []
}

fn terminology() -> List(Problem) {
  []
}

fn q(
  title title: String,
  prompt prompt: String,
  choices choices: List(String),
  correct correct: Int,
  explanation explanation: String,
  page page: String,
) -> Problem {
  Problem(
    title: title,
    prompt: prompt,
    // Deliberately empty. The drill view renders `approach` in a panel that is
    // available before answering, which on a quiz would hand over the answer.
    approach: "",
    solutions: [],
    language: Concept,
    check: None,
    quiz: Some(Quiz(
      choices: choices,
      correct: correct,
      explanation: explanation,
      page: page,
    )),
  )
}
