import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "merge_triplets([#(2,5,3), #(1,8,4), #(1,7,5)], #(2,7,5))",
      string.inspect(True),
      string.inspect(
        solution.merge_triplets([#(2, 5, 3), #(1, 8, 4), #(1, 7, 5)], #(2, 7, 5)),
      ),
    ),
    #(
      "merge_triplets([#(3,4,5), #(4,5,6)], #(3,2,5))",
      string.inspect(False),
      string.inspect(
        solution.merge_triplets([#(3, 4, 5), #(4, 5, 6)], #(3, 2, 5)),
      ),
    ),
    #(
      "merge_triplets([#(2,5,3), #(2,3,4), #(1,2,5), #(5,2,3)], #(5,5,5))",
      string.inspect(True),
      string.inspect(
        solution.merge_triplets(
          [#(2, 5, 3), #(2, 3, 4), #(1, 2, 5), #(5, 2, 3)],
          #(5, 5, 5),
        ),
      ),
    ),
    #(
      "merge_triplets([#(1,1,1)], #(1,1,1))",
      string.inspect(True),
      string.inspect(solution.merge_triplets([#(1, 1, 1)], #(1, 1, 1))),
    ),
    #(
      "merge_triplets([], #(1,1,1))",
      string.inspect(False),
      string.inspect(solution.merge_triplets([], #(1, 1, 1))),
    ),
    #(
      "merge_triplets([#(1,2,3)], #(3,2,1))",
      string.inspect(False),
      string.inspect(solution.merge_triplets([#(1, 2, 3)], #(3, 2, 1))),
    ),
  ]
}
