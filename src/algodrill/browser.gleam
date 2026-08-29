@external(javascript, "./ffi.mjs", "debounce")
pub fn debounce(key: String, delay_ms: Int, callback: fn() -> Nil) -> Nil

@external(javascript, "./ffi.mjs", "confirmDialog")
pub fn confirm(message: String) -> Bool

@external(javascript, "./ffi.mjs", "alertDialog")
pub fn alert(message: String) -> Nil

/// Uniform in [0, bound), and 0 when bound is not positive.
@external(javascript, "./ffi.mjs", "randomInt")
pub fn random_int(bound: Int) -> Int

/// Origin of the backend. Defaults to this page's own origin, where a reverse
/// proxy is expected to forward /api/* to the server; a
/// `<meta name="algodrill-api">` tag overrides that for a split-origin
/// deployment. Only empty in a context with no `location` to read.
@external(javascript, "./ffi.mjs", "apiBase")
pub fn api_base() -> String

/// Wall-clock milliseconds since the epoch. Used only as a difference, to time
/// how long a drill took.
@external(javascript, "./ffi.mjs", "nowMs")
pub fn now_ms() -> Int

/// Start of the current study day, as epoch seconds, rolling over at the given
/// local hour. Guest mode's equivalent of the server's Postgres date maths.
@external(javascript, "./ffi.mjs", "studyDayStart")
pub fn study_day_start(day_start_hour: Int) -> Int

/// The current study day as an integer day number. Keys the daily tallies,
/// and is DST-proof in a way that dividing the boundary timestamp is not.
@external(javascript, "./ffi.mjs", "studyDayIndex")
pub fn study_day_index(day_start_hour: Int) -> Int

/// The browser's IANA timezone name, or "UTC" if it cannot be determined.
@external(javascript, "./ffi.mjs", "timeZone")
pub fn time_zone() -> String

/// Document-level keyboard listener; see ffi.mjs for the classification and
/// preventDefault rules. Registered once, at init.
@external(javascript, "./ffi.mjs", "onKey")
pub fn on_keys(callback: fn(String, Bool, Bool, String) -> Nil) -> Nil

@external(javascript, "./ffi.mjs", "focusElement")
pub fn focus_element(selector: String) -> Nil

@external(javascript, "./ffi.mjs", "blurActive")
pub fn blur_active() -> Nil

@external(javascript, "./ffi.mjs", "scrollIntoViewById")
pub fn scroll_into_view(id: String) -> Nil
