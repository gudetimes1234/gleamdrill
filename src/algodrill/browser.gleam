@external(javascript, "./ffi.mjs", "debounce")
pub fn debounce(key: String, delay_ms: Int, callback: fn() -> Nil) -> Nil

@external(javascript, "./ffi.mjs", "confirmDialog")
pub fn confirm(message: String) -> Bool

@external(javascript, "./ffi.mjs", "alertDialog")
pub fn alert(message: String) -> Nil
