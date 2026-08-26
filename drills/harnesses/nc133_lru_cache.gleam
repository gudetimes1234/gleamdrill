import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  // The LeetCode example, threaded through: capacity 2, then put(1,1),
  // put(2,2), get(1), put(3,3) — which must evict key 2, not key 1.
  let cache =
    solution.new(2)
    |> solution.put(1, 1)
    |> solution.put(2, 2)
  let #(first, cache) = solution.get(cache, 1)
  let cache = solution.put(cache, 3, 3)
  let #(evicted, cache) = solution.get(cache, 2)
  let #(kept, cache) = solution.get(cache, 3)
  let cache = solution.put(cache, 4, 4)
  let #(gone, cache) = solution.get(cache, 1)
  let #(still_there, cache) = solution.get(cache, 3)
  let #(newest, cache) = solution.get(cache, 4)

  let overwritten =
    solution.new(1)
    |> solution.put(5, 5)
    |> solution.put(5, 9)
  let #(updated, _) = solution.get(overwritten, 5)

  [
    #(
      "get(1) after put(1,1), put(2,2)",
      string.inspect(1),
      string.inspect(first),
    ),
    #(
      "get(2) after put(3,3) — 2 was least recently used",
      string.inspect(-1),
      string.inspect(evicted),
    ),
    #("get(3) after put(3,3)", string.inspect(3), string.inspect(kept)),
    #(
      "get(1) after put(4,4) — reading 3 saved it, so 1 went",
      string.inspect(-1),
      string.inspect(gone),
    ),
    #("get(3) after put(4,4)", string.inspect(3), string.inspect(still_there)),
    #("get(4) after put(4,4)", string.inspect(4), string.inspect(newest)),
    #(
      "get(5) after put(5,5) then put(5,9) — an update, not an insert",
      string.inspect(9),
      string.inspect(updated),
    ),
    #(
      "get(99) on a key never stored",
      string.inspect(-1),
      string.inspect({ solution.get(cache, 99) }.0),
    ),
  ]
}
