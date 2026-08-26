import gleam/int
import gleam/list

pub fn merge_triplets(
  triplets: List(#(Int, Int, Int)),
  target: #(Int, Int, Int),
) -> Bool {
  // A triplet with any component above the target can never be used: merging
  // takes maxima, so that component would be stuck too high forever. Throw
  // those away and the rest can all be merged, because merging is a max and a
  // max only ever helps.
  triplets
  |> list.filter(fn(t) { t.0 <= target.0 && t.1 <= target.1 && t.2 <= target.2 })
  |> list.fold(#(0, 0, 0), fn(best, t) {
    #(int.max(best.0, t.0), int.max(best.1, t.1), int.max(best.2, t.2))
  })
  |> fn(best) { best == target }
}
