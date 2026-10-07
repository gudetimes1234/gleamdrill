module Solution where

import qualified Data.Map.Strict as Map

-- The most frequent task fixes a frame of (most-1) gaps of n slots;
-- every task tied for most frequent adds a slot to the last row. If
-- the frame has room for everything else, that is the answer;
-- otherwise there is no idling and the length is the task count.
leastInterval :: String -> Int -> Int
leastInterval tasks n = max (length tasks) ((most - 1) * (n + 1) + tiedForMost)
  where
    counts = Map.elems (Map.fromListWith (+) [ (t, 1) | t <- tasks ])
    most = maximum (0 : counts)
    tiedForMost = length (filter (== most) counts)
