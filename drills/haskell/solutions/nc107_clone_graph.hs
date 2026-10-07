module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Map.Strict as Map

-- One clone per original, made the first time the original is seen; the
-- map is also the visited set, so cycles terminate. The graph arrives as
-- adjacency lists for the labels 1..n, and the clone leaves the same way.
cloneGraph :: [[Int]] -> [[Int]]
cloneGraph adjacency
  | null adjacency = []
  | otherwise = Map.elems (clone 1 Map.empty)
  where
    neighbours = listArray (1, length adjacency) adjacency
    clone label clones
      | Map.member label clones = clones
      | otherwise = foldl' (flip clone) (Map.insert label (neighbours ! label) clones) (neighbours ! label)
