//// How many server-side runs may be in flight at once.
////
//// Each run is a whole Erlang VM booting, compiling and dying, on the same
//// host as the API. Two at a time is plenty for the traffic this has, and a
//// hard cap is what keeps a burst -- or a loop hammering the endpoint --
//// from starving the API of the CPU it needs to answer everything else. A
//// refused run is a 429 the app shows as "busy, try again", not a queue.

/// One shared counter for the whole node, created once at boot so no two
/// requests can race to create their own.
@external(erlang, "run_gate_ffi", "init")
pub fn init() -> Nil

/// Claims a slot if fewer than `max` are taken. A `True` must be paired with
/// a `release`, whatever happens in between.
@external(erlang, "run_gate_ffi", "try_acquire")
pub fn try_acquire(max: Int) -> Bool

@external(erlang, "run_gate_ffi", "release")
pub fn release() -> Nil
