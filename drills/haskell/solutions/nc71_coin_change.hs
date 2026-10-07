module Solution where

import Data.Array (listArray, (!))

-- fewest ! a is the fewest coins making a; a sentinel above any real
-- answer stands for "not yet reachable". The array is lazy, so each
-- entry pulls on the smaller amounts it needs.
coinChange :: [Int] -> Int -> Int
coinChange coins amount
  | best == unreachable = -1
  | otherwise = best
  where
    unreachable = amount + 1
    fewest = listArray (0, amount) [ cheapest a | a <- [0 .. amount] ]
    cheapest 0 = 0
    cheapest a = minimum (unreachable : [ fewest ! (a - coin) + 1 | coin <- coins, coin <= a ])
    best = fewest ! amount
