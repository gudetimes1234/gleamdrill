module Solution where

import Data.List (insertBy)

-- A farthest-first list of size k -- the Go max-heap by distance:
-- pushing a point and dropping the farthest keeps exactly the k
-- nearest.
kClosest :: [[Int]] -> Int -> [[Int]]
kClosest points k = foldl keep [] points
  where
    distance [x, y] = x * x + y * y
    distance _ = 0
    farther a b = compare (distance b) (distance a)
    keep heap p =
      let grown = insertBy farther p heap
      in if length grown > k then drop 1 grown else grown
