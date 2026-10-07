module Solution where

import Data.Array

-- ways s counts the sign assignments of the prefix summing to s, offset
-- by the total so negative sums index the array.
findTargetSumWays :: [Int] -> Int -> Int
findTargetSumWays nums target
  | target > total || target < -total = 0
  | otherwise = foldl step start nums ! (target + total)
  where
    total = sum nums
    start = accumArray (+) 0 (0, 2 * total) [(total, 1)]
    step ways n = accumArray (+) 0 (0, 2 * total) [(s + d, count) | (s, count) <- assocs ways, count /= 0, d <- [n, -n]]
