module Solution where

import qualified Data.Map.Strict as Map

-- Union-find over the edges in order: the first edge whose endpoints
-- are already connected closes the cycle, and it is the last such edge
-- in the input among those on the cycle.
findRedundantConnection :: [[Int]] -> [Int]
findRedundantConnection edges = go (Map.fromList [(i, i) | i <- [1 .. length edges]]) edges
  where
    root parent i = let p = parent Map.! i in if p == i then i else root parent p
    go _ [] = []
    go parent ([a, b] : rest)
      | ra == rb = [a, b]
      | otherwise = go (Map.insert ra rb parent) rest
      where
        ra = root parent a
        rb = root parent b
    go parent (_ : rest) = go parent rest
