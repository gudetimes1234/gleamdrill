//// The settings page's own state: the import question, and the offline
//// cache's size and download progress. The settings themselves are shared.

import gleam/option.{type Option, None}
import wire

/// The scheduler and account knobs the page edits.
pub type Field {
  NewPerDay
  ReviewsPerDay
  DayStartHour
  DesiredRetention
  /// "off" or an hour 0-23, from the reminder select.
  ReminderHour
}

pub type Model {
  Model(
    /// An archive picked for import, waiting on "replace everything?".
    import_pending: Option(wire.Archive),
    /// Bytes the offline runtime cache holds, measured when the page opens.
    cache_bytes: Int,
    /// Runtime files downloaded so far, of the total, while warming.
    warming: Option(#(Int, Int)),
  )
}

pub fn init() -> Model {
  Model(import_pending: None, cache_bytes: 0, warming: None)
}
