module Solution where

import Data.Array

maxArea :: [Int] -> Int
maxArea height = go 0 (length height - 1) 0
  where
    arr = listArray (0, length height - 1) height
    go left right best
      | left >= right = best
      -- Moving the taller line in can never help: the shorter one caps the area.
      | arr ! left < arr ! right = go (left + 1) right best'
      | otherwise = go left (right - 1) best'
      where
        best' = max best ((right - left) * min (arr ! left) (arr ! right))
