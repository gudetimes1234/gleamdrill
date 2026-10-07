module Solution where

import Data.Array
import qualified Data.Set as Set

-- Multi-source breadth-first search from every rotten orange at once:
-- each level of the search is one minute.
orangesRotting :: [[Int]] -> Int
orangesRotting grid = go rotten fresh 0
  where
    rows = length grid
    cols = length (head grid)
    bnds = ((0, 0), (rows - 1, cols - 1))
    cells = listArray bnds (concat grid)
    rotten = [pos | pos <- range bnds, cells ! pos == 2]
    fresh = Set.fromList [pos | pos <- range bnds, cells ! pos == 1]
    go queue remaining minutes
      | Set.null remaining = minutes
      | null queue = -1
      | otherwise = go (Set.toList newly) (Set.difference remaining newly) (minutes + 1)
      where
        newly = Set.fromList [next | (r, c) <- queue, next <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)], Set.member next remaining]
