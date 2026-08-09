import gleam/list
import gleam/string
import solution

/// Groups may come back in any order, and so may their members.
fn normalise(groups: List(List(String))) -> List(String) {
  groups
  |> list.map(fn(group) {
    group |> list.sort(string.compare) |> string.join(",")
  })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "group_anagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"])",
      string.inspect(["ate,eat,tea", "bat", "nat,tan"]),
      string.inspect(
        normalise(solution.group_anagrams([
          "eat", "tea", "tan", "ate", "nat", "bat",
        ])),
      ),
    ),
    #(
      "group_anagrams([])",
      string.inspect([]),
      string.inspect(normalise(solution.group_anagrams([]))),
    ),
    #(
      "group_anagrams([\"a\"])",
      string.inspect(["a"]),
      string.inspect(normalise(solution.group_anagrams(["a"]))),
    ),
  ]
}
