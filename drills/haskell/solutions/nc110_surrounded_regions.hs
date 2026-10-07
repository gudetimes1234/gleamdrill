module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Set as Set

-- An O survives only if it touches the border through other Os. Mark
-- every O reachable from the border, then flip the rest.
solve :: [String] -> [String]
solve board
  | null board = []
  | otherwise = [[rewrite (r, c) | c <- [0 .. cols - 1]] | r <- [0 .. rows - 1]]
  where
    rows = length board
    cols = length (head board)
    bnds = ((0, 0), (rows - 1, cols - 1))
    grid = listArray bnds (concat board)
    border = [(r, c) | (r, c) <- range bnds, r == 0 || r == rows - 1 || c == 0 || c == cols - 1]
    safe = foldl' (flip keep) Set.empty border
    keep pos@(r, c) seen
      | Set.member pos seen || grid ! pos /= 'O' = seen
      | otherwise = foldl' (flip keep) (Set.insert pos seen) [next | next <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)], inRange bnds next]
    rewrite pos
      | grid ! pos == 'O' && not (Set.member pos safe) = 'X'
      | otherwise = grid ! pos
