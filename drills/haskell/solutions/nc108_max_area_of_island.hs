module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Set as Set

-- Flood from each unvisited land cell, counting as the flood spreads;
-- the visited set keeps an island from being measured twice.
maxAreaOfIsland :: [[Int]] -> Int
maxAreaOfIsland grid = snd (foldl' visit (Set.empty, 0) (range bnds))
  where
    rows = length grid
    cols = length (head grid)
    bnds = ((0, 0), (rows - 1, cols - 1))
    cells = listArray bnds (concat grid)
    visit (seen, best) pos = let (size, seen') = area pos seen in (seen', max best size)
    area pos@(r, c) seen
      | not (inRange bnds pos) || cells ! pos /= 1 || Set.member pos seen = (0, seen)
      | otherwise = foldl' step (1, Set.insert pos seen) [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)]
      where
        step (size, s) next = let (more, s') = area next s in (size + more, s')
