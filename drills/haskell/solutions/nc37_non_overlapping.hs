module Solution where

import Data.List (sortOn)

eraseOverlapIntervals :: [[Int]] -> Int
eraseOverlapIntervals intervals = case sortOn (!! 1) intervals of
  [] -> 0
  (first : rest) -> go rest (first !! 1) 0
  where
    -- Sort by end: keeping the interval that ends earliest leaves the most
    -- room for the rest, so everything overlapping it is what goes.
    go [] _ removed = removed
    go (interval : more) lastEnd removed
      | head interval < lastEnd = go more lastEnd (removed + 1)
      | otherwise = go more (interval !! 1) removed
