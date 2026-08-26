import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "insert([#(1, 3), #(6, 9)], #(2, 5))",
      string.inspect([#(1, 5), #(6, 9)]),
      string.inspect(solution.insert([#(1, 3), #(6, 9)], #(2, 5))),
    ),
    #(
      "insert([#(1, 2), #(3, 5), #(6, 7), #(8, 10), #(12, 16)], #(4, 8))",
      string.inspect([#(1, 2), #(3, 10), #(12, 16)]),
      string.inspect(
        solution.insert([#(1, 2), #(3, 5), #(6, 7), #(8, 10), #(12, 16)], #(
          4,
          8,
        )),
      ),
    ),
    #(
      "insert([], #(5, 7))",
      string.inspect([#(5, 7)]),
      string.inspect(solution.insert([], #(5, 7))),
    ),
    #(
      "insert([#(1, 5)], #(2, 3))",
      string.inspect([#(1, 5)]),
      string.inspect(solution.insert([#(1, 5)], #(2, 3))),
    ),
    #(
      "insert([#(1, 5)], #(6, 8))",
      string.inspect([#(1, 5), #(6, 8)]),
      string.inspect(solution.insert([#(1, 5)], #(6, 8))),
    ),
    #(
      "insert([#(3, 5)], #(1, 2))",
      string.inspect([#(1, 2), #(3, 5)]),
      string.inspect(solution.insert([#(3, 5)], #(1, 2))),
    ),
  ]
}
