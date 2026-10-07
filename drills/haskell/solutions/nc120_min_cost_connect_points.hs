module Solution where

import Data.Array
import Data.List (minimumBy)
import qualified Data.Map.Strict as Map
import Data.Ord (comparing)

-- Prim's algorithm on the complete graph: keep the cheapest known
-- distance from the tree to each point, add the nearest point, update.
-- O(n^2), no heap, which suits a dense graph.
minCostConnectPoints :: [[Int]] -> Int
minCostConnectPoints points
  | n < 2 = 0
  | otherwise = grow 0 (Map.fromList ((0, 0) : [(i, 1073741824) | i <- [1 .. n - 1]]))
  where
    n = length points
    coords = listArray (0, n - 1) [(x, y) | [x, y] <- points]
    manhattan (ax, ay) (bx, by) = abs (ax - bx) + abs (ay - by)
    grow total distance
      | Map.null distance = total
      | otherwise = grow (total + d) updated
      where
        (nearest, d) = minimumBy (comparing snd) (Map.toAscList distance)
        rest = Map.delete nearest distance
        updated = Map.mapWithKey (\i cost -> min cost (manhattan (coords ! nearest) (coords ! i))) rest
