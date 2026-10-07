module Solution where

import qualified Data.IntMap.Strict as IntMap
import Data.List (sortOn)
import qualified Data.Set as Set

minInterval :: [[Int]] -> [Int] -> [Int]
minInterval intervals queries = IntMap.elems (go eligible Set.empty order IntMap.empty)
  where
    -- Answer the queries in increasing order: intervals become eligible by
    -- start, sit in an ordered set keyed by size, and are discarded from
    -- the front once their end is behind the current query.
    eligible = sortOn (\(interval, _) -> head interval) (zip intervals [0 :: Int ..])
    order = sortOn snd (zip [0 ..] queries)
    go _ _ [] answers = answers
    go pending heap ((qi, q) : rest) answers =
      let (ready, pending') = span (\(interval, _) -> head interval <= q) pending
          grown = foldl (\h ([s, e], i) -> Set.insert (e - s + 1, e, i) h) heap ready
          live = dropDead q grown
          answer = maybe (-1) (\(size, _, _) -> size) (Set.lookupMin live)
      in go pending' live rest (IntMap.insert qi answer answers)
    dropDead q heap = case Set.lookupMin heap of
      Just (_, e, _) | e < q -> dropDead q (Set.deleteMin heap)
      _ -> heap
