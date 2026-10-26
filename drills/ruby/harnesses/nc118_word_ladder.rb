need :ladder_length

tc 'ladder_length("hit", "cog", full list)', 5, ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
tc 'ladder_length("hit", "cog", without cog)', 0, ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"])
tc 'ladder_length("a", "c", ["a", "b", "c"])', 2, ladder_length("a", "c", ["a", "b", "c"])
tc 'ladder_length("hit", "hit", ["hit"])', 1, ladder_length("hit", "hit", ["hit"])
tc 'ladder_length("hot", "dog", ["hot", "dog"]) -- no bridge', 0, ladder_length("hot", "dog", ["hot", "dog"])
