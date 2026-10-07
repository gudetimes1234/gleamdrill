module Solution where

import qualified Data.Set as Set

-- The reachable subset sums: each number extends every sum reached so
-- far, and extending the pre-extension set uses a number only once.
canPartition :: [Int] -> Bool
canPartition nums
  | odd total = False
  | otherwise = Set.member target reachable
  where
    total = sum nums
    target = total `div` 2
    reachable = foldl extend (Set.singleton 0) nums
    extend sums n = Set.union sums (Set.filter (<= target) (Set.map (+ n) sums))
