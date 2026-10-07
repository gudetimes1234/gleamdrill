module Solution where

import Data.Array

trap :: [Int] -> Int
trap height = go 0 (length height - 1) 0 0 0
  where
    arr = listArray (0, length height - 1) height
    -- The lower side is bounded by its own maximum: the other side is at
    -- least as high, so that water level is certain.
    go left right leftMax rightMax water
      | left >= right = water
      | arr ! left < arr ! right =
          let leftMax' = max leftMax (arr ! left)
          in go (left + 1) right leftMax' rightMax (water + leftMax' - arr ! left)
      | otherwise =
          let rightMax' = max rightMax (arr ! right)
          in go left (right - 1) leftMax rightMax' (water + rightMax' - arr ! right)
