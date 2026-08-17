@external(javascript, "./ffi.mjs", "debounce")
pub fn debounce(key: String, delay_ms: Int, callback: fn() -> Nil) -> Nil

@external(javascript, "./ffi.mjs", "confirmDialog")
pub fn confirm(message: String) -> Bool

@external(javascript, "./ffi.mjs", "alertDialog")
pub fn alert(message: String) -> Nil

/// Uniform in [0, bound), and 0 when bound is not positive.
@external(javascript, "./ffi.mjs", "randomInt")
pub fn random_int(bound: Int) -> Int
