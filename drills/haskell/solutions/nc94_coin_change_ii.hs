module Solution where

import Data.Array

-- ways a: combinations making a. Taking the coins in the outer fold means
-- each combination is counted in one coin order only; within a coin the
-- array refers to itself at smaller amounts, the in-place update.
change :: Int -> [Int] -> Int
change amount coins = foldl addCoin start coins ! amount
  where
    start = listArray (0, amount) (1 : repeat 0)
    addCoin ways coin = ways'
      where
        ways' = listArray (0, amount) [ways ! a + (if a >= coin then ways' ! (a - coin) else 0) | a <- [0 .. amount]]
