module Solution where

import qualified Data.IntMap.Strict as IntMap
import qualified Data.Map.Strict as Map

-- Bucket the values by frequency, then walk the buckets from the highest
-- count down until k values have been taken.
topKFrequent :: [Int] -> Int -> [Int]
topKFrequent nums k = take k (concatMap snd (IntMap.toDescList buckets))
  where
    counts = Map.fromListWith (+) [(n, 1 :: Int) | n <- nums]
    buckets = IntMap.fromListWith (++) [(c, [n]) | (n, c) <- Map.toList counts]
