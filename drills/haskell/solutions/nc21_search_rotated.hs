module Solution where

import Data.Array

search :: [Int] -> Int -> Int
search nums target = go 0 (length nums - 1)
  where
    arr = listArray (0, length nums - 1) nums
    -- One half is always sorted; check whether the target lies in it.
    go low high
      | low > high = -1
      | arr ! mid == target = mid
      | arr ! low <= arr ! mid =
          if arr ! low <= target && target < arr ! mid
            then go low (mid - 1)
            else go (mid + 1) high
      | otherwise =
          if arr ! mid < target && target <= arr ! high
            then go (mid + 1) high
            else go low (mid - 1)
      where
        mid = low + (high - low) `div` 2
