import gleam/int
import gleam/list

pub fn last_stone_weight(stones: List(Int)) -> Int {
  smash(stones)
}

/// No ordering kept at all: scan for the heaviest, remove it, scan again. O(n)
/// per round against the sorted version's O(n log n) once \u{2014} worse overall, but
/// it makes clear that the only operation the problem needs is "give me the
/// largest", which is exactly the interface a heap provides.
fn smash(stones: List(Int)) -> Int {
  case take_max(stones) {
    Error(Nil) -> 0
    Ok(#(heaviest, rest)) ->
      case take_max(rest) {
        Error(Nil) -> heaviest
        Ok(#(next, remaining)) ->
          case heaviest - next {
            0 -> smash(remaining)
            remainder -> smash([remainder, ..remaining])
          }
      }
  }
}

fn take_max(stones: List(Int)) -> Result(#(Int, List(Int)), Nil) {
  case list.reduce(stones, int.max) {
    Error(Nil) -> Error(Nil)
    Ok(heaviest) -> Ok(#(heaviest, remove_first(stones, heaviest, [])))
  }
}

fn remove_first(stones: List(Int), wanted: Int, seen: List(Int)) -> List(Int) {
  case stones {
    [] -> list.reverse(seen)
    [first, ..rest] ->
      case first == wanted {
        True -> list.append(list.reverse(seen), rest)
        False -> remove_first(rest, wanted, [first, ..seen])
      }
  }
}
