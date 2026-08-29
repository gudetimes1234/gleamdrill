//// Small formatters shared between views.

import gleam/int

/// Compact "3d" style text for an interval.
///
/// Anything under an hour reads in minutes, because that is the range learning
/// steps live in and "0d" would be a lie. Beyond two months it switches to
/// months, where a day of precision stops meaning anything.
pub fn interval(seconds: Int) -> String {
  case seconds {
    _ if seconds <= 0 -> "now"
    // Ceiling, not `/ 60 + 1`: a ten-minute step must read "10m", and a
    // thirty-second one must not read "0m".
    _ if seconds < 3600 -> int.to_string({ seconds + 59 } / 60) <> "m"
    _ if seconds < 86_400 -> int.to_string(seconds / 3600) <> "h"
    _ if seconds < 5_184_000 -> int.to_string(seconds / 86_400) <> "d"
    _ -> int.to_string(seconds / 2_592_000) <> "mo"
  }
}
