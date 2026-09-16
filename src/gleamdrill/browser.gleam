@external(javascript, "./ffi.mjs", "debounce")
pub fn debounce(key: String, delay_ms: Int, callback: fn() -> Nil) -> Nil

/// Uniform in [0, bound), and 0 when bound is not positive.
@external(javascript, "./ffi.mjs", "randomInt")
pub fn random_int(bound: Int) -> Int

/// Origin of the backend. Defaults to this page's own origin, where a reverse
/// proxy is expected to forward /api/* to the server; a
/// `<meta name="gleamdrill-api">` tag overrides that for a split-origin
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

/// Installs the service worker that keeps a guest sitting working offline.
@external(javascript, "./ffi.mjs", "registerServiceWorker")
pub fn register_service_worker() -> Nil

/// Fetches every runtime file into the offline cache. The callback gets
/// (ok, done, total, finished) after each file; `ok` is False once a fetch
/// fails, and `finished` is True on the last call either way.
@external(javascript, "./ffi.mjs", "warmRuntimeCache")
pub fn warm_runtime_cache(callback: fn(Bool, Int, Int, Bool) -> Nil) -> Nil

/// Bytes held by the runtime cache.
@external(javascript, "./ffi.mjs", "runtimeCacheSize")
pub fn runtime_cache_size(callback: fn(Int) -> Nil) -> Nil

/// The study day a past moment fell on, keyed like `study_day_index`.
@external(javascript, "./ffi.mjs", "studyDayIndexAt")
pub fn study_day_index_at(epoch_seconds: Int, day_start_hour: Int) -> Int

/// Hands the browser a text file to save.
@external(javascript, "./ffi.mjs", "downloadText")
pub fn download_text(filename: String, text: String) -> Nil

/// Opens the file picker; the callback gets the chosen file's text, and is
/// not called at all if the picker is cancelled.
@external(javascript, "./ffi.mjs", "pickFile")
pub fn pick_file(callback: fn(String) -> Nil) -> Nil

@external(javascript, "./ffi.mjs", "focusElement")
pub fn focus_element(selector: String) -> Nil

@external(javascript, "./ffi.mjs", "blurActive")
pub fn blur_active() -> Nil

@external(javascript, "./ffi.mjs", "scrollIntoViewById")
pub fn scroll_into_view(id: String) -> Nil
