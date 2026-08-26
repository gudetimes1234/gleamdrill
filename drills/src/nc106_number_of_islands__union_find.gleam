import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set

pub fn num_islands(grid: List(List(String))) -> Int {
  let land =
    grid
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> list.filter(fn(cell: #(#(Int, Int), String)) { cell.1 == "1" })
    |> list.map(fn(cell: #(#(Int, Int), String)) { cell.0 })

  let known = set.from_list(land)

  // Union-find instead of flood fill: every square starts as its own island and
  // each adjacency merges two. Only right and down are needed \u{2014} every pair of
  // neighbours is reached once that way \u{2014} and the answer is how many roots
  // are left. This is the version that keeps working when the grid arrives one
  // square at a time and the count has to be reported after each.
  let parents =
    list.fold(
      land,
      dict.from_list(list.map(land, fn(at) { #(at, at) })),
      fn(parents, at) {
        let #(r, c) = at
        list.fold([#(r + 1, c), #(r, c + 1)], parents, fn(parents, next) {
          case set.contains(known, next) {
            True -> union(parents, at, next)
            False -> parents
          }
        })
      },
    )

  land
  |> list.map(fn(at) { find(parents, at) })
  |> set.from_list
  |> set.size
}

fn find(
  parents: Dict(#(Int, Int), #(Int, Int)),
  at: #(Int, Int),
) -> #(Int, Int) {
  let parent = result.unwrap(dict.get(parents, at), at)
  case parent == at {
    True -> at
    False -> find(parents, parent)
  }
}

fn union(
  parents: Dict(#(Int, Int), #(Int, Int)),
  a: #(Int, Int),
  b: #(Int, Int),
) -> Dict(#(Int, Int), #(Int, Int)) {
  let root_a = find(parents, a)
  let root_b = find(parents, b)
  case root_a == root_b {
    True -> parents
    False -> dict.insert(parents, root_a, root_b)
  }
}
