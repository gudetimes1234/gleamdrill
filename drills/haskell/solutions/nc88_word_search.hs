module Solution where

import qualified Data.Set as Set

-- Depth-first from every cell; a visited set stands in for the Go
-- version's in-place marking, and backtracking is free because each
-- branch carries its own copy.
exist :: [String] -> String -> Bool
exist board word = or [ search (r, c) word Set.empty | r <- [0 .. rows - 1], c <- [0 .. cols - 1] ]
  where
    rows = length board
    cols = length (head board)
    search _ [] _ = True
    search (r, c) (ch : rest) visited
      | r < 0 || r >= rows || c < 0 || c >= cols = False
      | Set.member (r, c) visited = False
      | board !! r !! c /= ch = False
      | otherwise = or [ search next rest (Set.insert (r, c) visited) | next <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)] ]
