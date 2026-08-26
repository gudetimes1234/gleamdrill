import gleam/list

pub fn permute(nums: List(Int)) -> List(List(Int)) {
  // Build up instead of choosing: every permutation of n elements is a
  // permutation of n\u{2212}1 with the new element wedged into one of its n
  // positions. No recursion into a shrinking remainder, and it explains the
  // factorial directly \u{2014} one more choice of position at every step.
  list.fold(nums, [[]], fn(permutations, value) {
    list.flat_map(permutations, fn(permutation) {
      positions(list.length(permutation))
      |> list.map(fn(at) {
        list.flatten([
          list.take(permutation, at),
          [value],
          list.drop(permutation, at),
        ])
      })
    })
  })
}

fn positions(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n + 1), fn(_, i) { i })
}
