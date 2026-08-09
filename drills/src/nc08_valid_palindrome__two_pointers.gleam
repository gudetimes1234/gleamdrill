import gleam/list
import gleam/string

pub fn is_palindrome(s: String) -> Bool {
  let cleaned =
    string.lowercase(s)
    |> string.to_graphemes
    |> list.filter(is_alphanumeric)
  converge(cleaned, list.reverse(cleaned), list.length(cleaned) / 2)
}

/// Walks the sequence and its reverse together — the closest a linked list
/// gets to converging index pointers.
fn converge(
  from_front: List(String),
  from_back: List(String),
  remaining: Int,
) -> Bool {
  case remaining <= 0 {
    True -> True
    False ->
      case from_front, from_back {
        [a, ..front], [b, ..back] ->
          a == b && converge(front, back, remaining - 1)
        _, _ -> True
      }
  }
}

fn is_alphanumeric(g: String) -> Bool {
  case string.to_utf_codepoints(g) {
    [c] -> {
      let n = string.utf_codepoint_to_int(c)
      is_digit(n) || is_lowercase_letter(n)
    }
    _ -> False
  }
}

fn is_digit(n: Int) -> Bool {
  n >= 48 && n <= 57
}

fn is_lowercase_letter(n: Int) -> Bool {
  n >= 97 && n <= 122
}
