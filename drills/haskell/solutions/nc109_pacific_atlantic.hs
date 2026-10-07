module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Set as Set

-- Flow uphill from each ocean's coast: the cells an ocean can reach
-- going up are exactly the cells that drain down into it.
pacificAtlantic :: [[Int]] -> [[Int]]
pacificAtlantic heights
  | null heights = []
  | otherwise = [[r, c] | (r, c) <- range bnds, Set.member (r, c) pacific, Set.member (r, c) atlantic]
  where
    rows = length heights
    cols = length (head heights)
    bnds = ((0, 0), (rows - 1, cols - 1))
    grid = listArray bnds (concat heights)
    pacific = reach ([(r, 0) | r <- [0 .. rows - 1]] ++ [(0, c) | c <- [0 .. cols - 1]])
    atlantic = reach ([(r, cols - 1) | r <- [0 .. rows - 1]] ++ [(rows - 1, c) | c <- [0 .. cols - 1]])
    reach coast = foldl' (flip climb) Set.empty coast
    climb pos@(r, c) seen
      | Set.member pos seen = seen
      | otherwise = foldl' (flip climb) (Set.insert pos seen) higher
      where
        higher = [next | next <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)], inRange bnds next, grid ! next >= grid ! pos]
