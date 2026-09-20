import gleam/dict
import gleam/list
import gleam/option

pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  let counts =
    list.fold(nums, dict.new(), fn(acc, n) {
      dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
    })

  // A count can never exceed the input length, so one bucket per possible
  // frequency covers everything. Reading the buckets from the top down gives
  // the answer without ever comparison-sorting the counts.
  let buckets =
    dict.fold(counts, dict.new(), fn(acc, n, count) {
      dict.upsert(acc, count, fn(members) {
        case members {
          option.Some(existing) -> [n, ..existing]
          option.None -> [n]
        }
      })
    })

  countdown(list.length(nums), [])
  |> list.flat_map(fn(frequency) {
    case dict.get(buckets, frequency) {
      Ok(members) -> list.reverse(members)
      Error(Nil) -> []
    }
  })
  |> list.take(k)
}

/// [highest, highest - 1, ..., 1] — the bucket indices, read most frequent
/// first.
fn countdown(highest: Int, acc: List(Int)) -> List(Int) {
  case highest < 1 {
    True -> list.reverse(acc)
    False -> countdown(highest - 1, [highest, ..acc])
  }
}
