module Solution where

import Data.Array
import qualified Data.Map.Strict as Map

characterReplacement :: String -> Int -> Int
characterReplacement s k = best
  where
    arr = listArray (0, length s - 1) s
    (_, _, _, best) = foldl step (Map.empty, 0, 0, 0) (zip [0 ..] s)
    step (counts, start, mostFrequent, longest) (end, c) =
      -- The window is valid while its non-majority characters fit in k.
      -- mostFrequent is never lowered: a stale high can only keep the
      -- window at a length already achieved, never over-count.
      let counts' = Map.insertWith (+) c 1 counts
          most' = max mostFrequent (counts' Map.! c)
          (counts'', start') =
            if end - start + 1 - most' > k
              then (Map.adjust (subtract 1) (arr ! start) counts', start + 1)
              else (counts', start)
      in (counts'', start', most', max longest (end - start' + 1))
