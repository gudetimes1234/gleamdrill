need :positions_of

tc 'positions_of(%w[b a n a n a], "a")', [1, 3, 5], positions_of(%w[b a n a n a], "a")
tc 'positions_of([], "a")', [], positions_of([], "a")
tc 'positions_of(%w[x y], "z") -- no matches', [], positions_of(%w[x y], "z")
uses(/with_index/, "each_with_index")
avoids(/\bwhile\b/, "while loop")
avoids(/\w\[i\]/, "indexing by position")
