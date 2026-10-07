module Solution where

-- Cheapest way to stand on step i, having paid for it, comes from the
-- cheaper of the two steps below. The top is one past the last step.
minCostClimbingStairs :: [Int] -> Int
minCostClimbingStairs (first : second : rest) = go first second rest
  where
    go twoBack oneBack [] = min twoBack oneBack
    go twoBack oneBack (c : more) = go oneBack (c + min twoBack oneBack) more
minCostClimbingStairs _ = 0
