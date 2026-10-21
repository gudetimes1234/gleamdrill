//// The queue manager's own state: what it is looking at (search, status,
//// the named queue being edited), its cursor, the name being typed, and the
//// rows whose change is in flight. The queues and cards themselves are
//// shared.

import gleam/option.{type Option, None}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/queue

/// A queue name being typed: a new queue, or a rename of `from`.
pub type Naming {
  NewQueue(text: String)
  RenameQueue(from: String, text: String)
}

pub type Model {
  Model(
    filter: queue.Filter,
    cursor: Int,
    naming: Option(Naming),
    /// Rows whose change is in flight, so a second click cannot race the
    /// first. Cleared wholesale when the answer lands: the requests are bulk
    /// and sequential from one user, so there is never a second to keep.
    pending: List(ProblemRef),
  )
}

/// Opens on `editing`: the queue being studied, the one most likely to
/// need a problem added.
pub fn init(editing: Option(String)) -> Model {
  Model(
    filter: queue.Filter(search: "", status: queue.AnyStatus, editing:),
    cursor: 0,
    naming: None,
    pending: [],
  )
}
