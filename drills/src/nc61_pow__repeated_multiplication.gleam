import gleam/list

pub fn my_pow(x: Float, n: Int) -> Float {
  let magnitude =
    list.fold(list.repeat(Nil, int_abs(n)), 1.0, fn(acc, _) { acc *. x })

  case n < 0 {
    True -> 1.0 /. magnitude
    False -> magnitude
  }
}

fn int_abs(n: Int) -> Int {
  case n < 0 {
    True -> -n
    False -> n
  }
}
