import gleam/list

pub fn merge_k_lists(lists: List(List(Int))) -> List(Int) {
  // Take the smallest head across all the lists, over and over. This is the
  // heap solution with the heap spelled out as a scan, since Gleam has no
  // priority queue: O(k) per element rather than O(log k), which is the entire
  // difference the heap makes. What it does not need is any pairing structure —
  // it works just as well on lists arriving one at a time.
  list.reverse(take_smallest(list.filter(lists, fn(l) { l != [] }), []))
}

fn take_smallest(lists: List(List(Int)), out: List(Int)) -> List(Int) {
  case lists {
    [] -> out
    [head, ..tail] -> {
      let smallest =
        list.fold(tail, head, fn(best: List(Int), candidate: List(Int)) {
          case first_of(candidate) < first_of(best) {
            True -> candidate
            False -> best
          }
        })
      let taken = first_of(smallest)
      let rest =
        remove_once(lists, smallest, [])
        |> list.filter(fn(l) { l != [] })
      // The emptied list is dropped rather than kept: an empty list has no head
      // to compare, so leaving it in would make it win every round from then on.
      case list.drop(smallest, 1) {
        [] -> take_smallest(rest, [taken, ..out])
        remainder -> take_smallest([remainder, ..rest], [taken, ..out])
      }
    }
  }
}

fn remove_once(
  lists: List(List(Int)),
  target: List(Int),
  kept: List(List(Int)),
) -> List(List(Int)) {
  case lists {
    [] -> list.reverse(kept)
    [head, ..tail] ->
      case head == target {
        True -> list.append(list.reverse(kept), tail)
        False -> remove_once(tail, target, [head, ..kept])
      }
  }
}

fn first_of(values: List(Int)) -> Int {
  case values {
    [head, ..] -> head
    [] -> 0
  }
}
