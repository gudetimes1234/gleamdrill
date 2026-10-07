module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Map.Strict as Map

inf :: Int
inf = 2147483647

-- Breadth-first from every gate at once: the first time a room is
-- reached is by its nearest gate, so each room is claimed once.
wallsAndGates :: [[Int]] -> [[Int]]
wallsAndGates rooms
  | null rooms = []
  | otherwise = [[Map.findWithDefault (grid ! (r, c)) (r, c) distances | c <- [0 .. cols - 1]] | r <- [0 .. rows - 1]]
  where
    rows = length rooms
    cols = length (head rooms)
    bnds = ((0, 0), (rows - 1, cols - 1))
    grid = listArray bnds (concat rooms)
    gates = [pos | pos <- range bnds, grid ! pos == 0]
    distances = go (Map.fromList [(gate, 0) | gate <- gates]) gates
    go dist [] = dist
    go dist (pos@(r, c) : queue) = go dist' (queue ++ claimed)
      where
        claimed = [next | next <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)], inRange bnds next, grid ! next == inf, not (Map.member next dist)]
        dist' = foldl' (\m next -> Map.insert next (dist Map.! pos + 1) m) dist claimed
