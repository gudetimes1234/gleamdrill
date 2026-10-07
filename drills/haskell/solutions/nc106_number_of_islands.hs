module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Set as Set

-- Each unvisited land cell starts a new island; sink it whole so its
-- other cells are not counted again.
numIslands :: [String] -> Int
numIslands grid = snd (foldl' visit (Set.empty, 0) (range bnds))
  where
    rows = length grid
    cols = length (head grid)
    bnds = ((0, 0), (rows - 1, cols - 1))
    cells = listArray bnds (concat grid)
    visit (sunk, count) pos
      | cells ! pos == '1' && not (Set.member pos sunk) = (sink pos sunk, count + 1)
      | otherwise = (sunk, count)
    sink pos@(r, c) sunk
      | not (inRange bnds pos) || cells ! pos /= '1' || Set.member pos sunk = sunk
      | otherwise = foldl' (flip sink) (Set.insert pos sunk) [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)]
