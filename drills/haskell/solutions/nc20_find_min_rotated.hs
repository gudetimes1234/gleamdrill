module Solution where

import Data.Array

findMin :: [Int] -> Int
findMin nums = arr ! go 0 (length nums - 1)
  where
    arr = listArray (0, length nums - 1) nums
    -- The minimum is where the rotation broke the order: if mid is above
    -- the right end, the break is to the right; otherwise mid or left.
    go low high
      | low >= high = low
      | arr ! mid > arr ! high = go (mid + 1) high
      | otherwise = go low mid
      where
        mid = low + (high - low) `div` 2
