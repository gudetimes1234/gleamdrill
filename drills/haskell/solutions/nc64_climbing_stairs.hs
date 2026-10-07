module Solution where

-- Ways to reach step i = ways to reach i-1 + ways to reach i-2: the
-- Fibonacci recurrence, kept in two accumulators.
climbStairs :: Int -> Int
climbStairs n = go 1 1 2
  where
    go previous current i
      | i > n = current
      | otherwise = go current (previous + current) (i + 1)
