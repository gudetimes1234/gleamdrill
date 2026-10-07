module Solution where

import Data.Array

-- longest (r, c): the longest increasing path starting here, memoised in
-- a lazy array. Increasing paths cannot cycle, so no visited set is
-- needed.
longestIncreasingPath :: [[Int]] -> Int
longestIncreasingPath matrix = maximum (elems longest)
  where
    rows = length matrix
    cols = length (head matrix)
    bnds = ((0, 0), (rows - 1, cols - 1))
    grid = listArray bnds (concat matrix)
    longest = array bnds [(pos, from pos) | pos <- range bnds]
    from (r, c) = 1 + maximum (0 : [longest ! next | next <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)], inRange bnds next, grid ! next > grid ! (r, c)])
