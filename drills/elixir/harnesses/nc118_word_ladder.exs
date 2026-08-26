[
  {"ladder_length(hit, cog, full list)", inspect(5),
   inspect(Solution.ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]))},
  {"ladder_length(hit, cog, without cog)", inspect(0),
   inspect(Solution.ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"]))},
  {"ladder_length(a, c, [a, b, c])", inspect(2),
   inspect(Solution.ladder_length("a", "c", ["a", "b", "c"]))},
  {"ladder_length(hit, hit, [hit])", inspect(1),
   inspect(Solution.ladder_length("hit", "hit", ["hit"]))},
  {"ladder_length(hot, dog, [hot, dog]) -- no bridge", inspect(0),
   inspect(Solution.ladder_length("hot", "dog", ["hot", "dog"]))}
]
