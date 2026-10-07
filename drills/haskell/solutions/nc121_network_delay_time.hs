module Solution where

import qualified Data.IntMap.Strict as IntMap
import qualified Data.Set as Set

-- Dijkstra from k, with a Set as the priority queue: the time the
-- signal reaches every node is the longest of the shortest paths, or
-- -1 if any node is never reached.
networkDelayTime :: [[Int]] -> Int -> Int -> Int
networkDelayTime times n k = finish (settle (Set.singleton (0, k)) IntMap.empty)
  where
    next = IntMap.fromListWith (++) [(from, [(to, cost)]) | [from, to, cost] <- times]
    edges node = IntMap.findWithDefault [] node next
    settle frontier best = case Set.minView frontier of
      Nothing -> best
      Just ((distance, node), rest)
        | IntMap.member node best -> settle rest best
        | otherwise ->
            settle
              (foldr Set.insert rest
                 [(distance + cost, to) | (to, cost) <- edges node, not (IntMap.member to best)])
              (IntMap.insert node distance best)
    finish best
      | IntMap.size best == n = maximum (IntMap.elems best)
      | otherwise = -1
