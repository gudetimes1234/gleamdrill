@external(javascript, "./ffi.mjs", "spliceTab")
pub fn splice_tab(value: String, start: Int, end: Int) -> String

@external(javascript, "./ffi.mjs", "setSelection")
pub fn set_selection(id: String, position: Int) -> Nil

@external(javascript, "./ffi.mjs", "confirmDialog")
pub fn confirm(message: String) -> Bool

@external(javascript, "./ffi.mjs", "alertDialog")
pub fn alert(message: String) -> Nil
