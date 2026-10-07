module Solution where

import qualified Data.Set as Set

longestConsecutive :: [Int] -> Int
longestConsecutive nums = maximum (0 : map runLength starts)
  where
    everything = Set.fromList nums
    -- Only count from the start of a run, so each run is walked once.
    starts = [n | n <- Set.toList everything, not (Set.member (n - 1) everything)]
    runLength n = go 1
      where
        go len
          | Set.member (n + len) everything = go (len + 1)
          | otherwise = len
