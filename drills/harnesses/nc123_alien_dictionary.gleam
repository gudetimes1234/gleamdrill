import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "alien_order([wrt, wrf, er, ett, rftt])",
      string.inspect("wertf"),
      string.inspect(solution.alien_order(["wrt", "wrf", "er", "ett", "rftt"])),
    ),
    #(
      "alien_order([z, x])",
      string.inspect("zx"),
      string.inspect(solution.alien_order(["z", "x"])),
    ),
    #(
      "alien_order([z, x, z]) — contradictory",
      string.inspect(""),
      string.inspect(solution.alien_order(["z", "x", "z"])),
    ),
    #(
      "alien_order([abc, ab]) — a word before its own prefix",
      string.inspect(""),
      string.inspect(solution.alien_order(["abc", "ab"])),
    ),
    #(
      "alien_order([z, z])",
      string.inspect("z"),
      string.inspect(solution.alien_order(["z", "z"])),
    ),
    #(
      "alien_order([x, y, z])",
      string.inspect("xyz"),
      string.inspect(solution.alien_order(["x", "y", "z"])),
    ),
  ]
}
