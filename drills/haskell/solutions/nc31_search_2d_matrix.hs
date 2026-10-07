module Solution where

import Data.Array (listArray, (!))

searchMatrix :: [[Int]] -> Int -> Bool
searchMatrix matrix target = go 0 (rows * cols - 1)
  where
    rows = length matrix
    cols = length (head matrix)
    -- Rows run on from each other, so the matrix is one sorted list of
    -- rows*cols cells; flatten it once and binary search by flat index.
    cells = listArray (0, rows * cols - 1) (concat matrix)
    go low high
      | low > high = False
      | value == target = True
      | value < target = go (mid + 1) high
      | otherwise = go low (mid - 1)
      where
        mid = low + (high - low) `div` 2
        value = cells ! mid
