module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Set as Set

-- A tree on n nodes has exactly n-1 edges and is connected. With the
-- edge count right, connectivity from node 0 is the only thing to check.
validTree :: Int -> [[Int]] -> Bool
validTree n edges
  | n == 0 = True
  | length edges /= n - 1 = False
  | otherwise = Set.size reached == n
  where
    adjacent = accumArray (flip (:)) [] (0, n - 1) (concat [[(a, b), (b, a)] | [a, b] <- edges])
    reached = explore (Set.singleton 0) [0]
    explore seen [] = seen
    explore seen (node : stack) = explore seen' (fresh ++ stack)
      where
        fresh = [next | next <- adjacent ! node, not (Set.member next seen)]
        seen' = foldl' (flip Set.insert) seen fresh
