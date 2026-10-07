module Solution where

import Data.Array
import qualified Data.Set as Set

-- Dijkstra where a path's cost is its highest cell: always expand the
-- lowest reachable cell (a Set as the priority queue), and the answer
-- is the highest cell popped before the corner.
swimInWater :: [[Int]] -> Int
swimInWater grid = go (Set.singleton (height (0, 0), (0, 0))) (Set.singleton (0, 0)) 0
  where
    n = length grid
    cells = listArray ((0, 0), (n - 1, n - 1)) (concat grid)
    height cell = cells ! cell
    neighbours (r, c) =
      [ (r + dr, c + dc)
      | (dr, dc) <- [(1, 0), (-1, 0), (0, 1), (0, -1)]
      , r + dr >= 0, r + dr < n, c + dc >= 0, c + dc < n
      ]
    go frontier seen highest = case Set.minView frontier of
      Nothing -> highest
      Just ((h, cell), rest)
        | cell == (n - 1, n - 1) -> max highest h
        | otherwise ->
            let fresh = [q | q <- neighbours cell, not (Set.member q seen)]
            in go (foldr Set.insert rest [(height q, q) | q <- fresh])
                  (foldr Set.insert seen fresh)
                  (max highest h)
