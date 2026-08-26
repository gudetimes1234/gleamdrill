import gleam/string
import solution

/// Only the round trip is specified: any encoding is fine as long as decode
/// undoes it, so every case runs both directions.
fn round_trip(strs: List(String)) -> List(String) {
  solution.decode(solution.encode(strs))
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "decode(encode([\"neet\", \"code\", \"love\", \"you\"]))",
      string.inspect(["neet", "code", "love", "you"]),
      string.inspect(round_trip(["neet", "code", "love", "you"])),
    ),
    #("decode(encode([]))", string.inspect([]), string.inspect(round_trip([]))),
    #(
      "decode(encode([\"\", \"\"]))",
      string.inspect(["", ""]),
      string.inspect(round_trip(["", ""])),
    ),
    #(
      "decode(encode([\"3#x\", \"a|b\"]))",
      string.inspect(["3#x", "a|b"]),
      string.inspect(round_trip(["3#x", "a|b"])),
    ),
    #(
      "decode(encode([\"\\\\\", \"|\", \"#\"]))",
      string.inspect(["\\", "|", "#"]),
      string.inspect(round_trip(["\\", "|", "#"])),
    ),
  ]
}
