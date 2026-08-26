pub fn add_two_numbers(first: List(Int), second: List(Int)) -> List(Int) {
  // Both numbers arrive least significant digit first, which is exactly the
  // order addition wants — no reversing, no length matching, just carry along.
  // The carry outliving both lists is the case worth writing down: 5 + 5 is two
  // digits from two one-digit numbers.
  add(first, second, 0)
}

fn add(first: List(Int), second: List(Int), carry: Int) -> List(Int) {
  case first, second, carry {
    [], [], 0 -> []
    [], [], _ -> [carry]
    _, _, _ -> {
      let #(a, a_rest) = split(first)
      let #(b, b_rest) = split(second)
      let total = a + b + carry
      [total % 10, ..add(a_rest, b_rest, total / 10)]
    }
  }
}

fn split(digits: List(Int)) -> #(Int, List(Int)) {
  case digits {
    [] -> #(0, [])
    [head, ..tail] -> #(head, tail)
  }
}
