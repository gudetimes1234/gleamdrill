import gleam/int
import gleam/list

pub fn subsets_with_dup(nums: List(Int)) -> List(List(Int)) {
  // A different framing: the answer is not a choice per *element* but a choice
  // per distinct *value* \u{2014} how many copies of it to take, from none up to
  // however many there are. Duplicates then cannot arise at all, so there is
  // no skipping rule to remember.
  nums
  |> list.sort(int.compare)
  |> runs([])
  |> list.fold([[]], fn(subsets, run: #(Int, Int)) {
    list.flat_map(subsets, fn(subset) {
      counts(run.1)
      |> list.map(fn(taken) { list.append(subset, list.repeat(run.0, taken)) })
    })
  })
}

/// Equal values collapsed into #(value, how many).
fn runs(sorted: List(Int), acc: List(#(Int, Int))) -> List(#(Int, Int)) {
  case sorted {
    [] -> list.reverse(acc)
    [first, ..] -> {
      let same = list.take_while(sorted, fn(n) { n == first })
      runs(list.drop(sorted, list.length(same)), [
        #(first, list.length(same)),
        ..acc
      ])
    }
  }
}

fn counts(most: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, most + 1), fn(_, i) { i })
}
