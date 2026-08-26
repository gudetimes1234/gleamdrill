board = Enum.map(["oaan", "etae", "ihkr", "iflv"], &String.graphemes/1)
sorted = fn b, words -> b |> Solution.find_words(words) |> Enum.sort() end

[
  {~S{find_words(board, ["oath","pea","eat","rain"])}, inspect(["eat", "oath"]),
   inspect(sorted.(board, ["oath", "pea", "eat", "rain"]))},
  {~S{find_words([["a","b"],["c","d"]], ["abcb"])}, inspect([]),
   inspect(sorted.([["a", "b"], ["c", "d"]], ["abcb"]))},
  {~S{find_words([["a"]], ["a"])}, inspect(["a"]), inspect(sorted.([["a"]], ["a"]))},
  {~S{find_words(board, [])}, inspect([]), inspect(sorted.(board, []))},
  {~S{find_words([], ["a"])}, inspect([]), inspect(sorted.([], ["a"]))}
]
