module Solution where

import Data.List (sortOn)

merge :: [[Int]] -> [[Int]]
merge intervals = go (sortOn head intervals)
  where
    -- Sorted by start, an overlap can only be with the last merged
    -- interval, which here is the head of the walk.
    go ([s1, e1] : [s2, e2] : rest)
      | s2 <= e1 = go ([s1, max e1 e2] : rest)
      | otherwise = [s1, e1] : go ([s2, e2] : rest)
    go other = other
