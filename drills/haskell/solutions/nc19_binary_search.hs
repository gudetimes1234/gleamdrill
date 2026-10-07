module Solution where

import Data.Array

search :: [Int] -> Int -> Int
search nums target = go 0 (length nums - 1)
  where
    arr = listArray (0, length nums - 1) nums
    go low high
      | low > high = -1
      | arr ! mid == target = mid
      | arr ! mid < target = go (mid + 1) high
      | otherwise = go low (mid - 1)
      where
        mid = low + (high - low) `div` 2
