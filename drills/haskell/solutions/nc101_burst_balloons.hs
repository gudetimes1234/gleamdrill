module Solution where

import Data.Array

-- Pad with 1s; best (l, r) is the most from bursting everything strictly
-- between l and r, deciding which balloon is burst LAST in that range
-- (its neighbours are then l and r themselves).
maxCoins :: [Int] -> Int
maxCoins nums = best ! (0, n - 1)
  where
    n = length nums + 2
    padded = listArray (0, n - 1) (1 : nums ++ [1])
    best = array ((0, 0), (n - 1, n - 1)) [((l, r), cell l r) | l <- [0 .. n - 1], r <- [0 .. n - 1]]
    cell l r
      | r - l < 2 = 0
      | otherwise = maximum [best ! (l, k) + padded ! l * padded ! k * padded ! r + best ! (k, r) | k <- [l + 1 .. r - 1]]
