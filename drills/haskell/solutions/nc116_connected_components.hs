module Solution where

import qualified Data.Map.Strict as Map

-- Union-find: start with n components and lose one per union that joins
-- two different sets.
countComponents :: Int -> [[Int]] -> Int
countComponents n edges = go (Map.fromList [(i, i) | i <- [0 .. n - 1]]) n edges
  where
    root parent i = let p = parent Map.! i in if p == i then i else root parent p
    go _ components [] = components
    go parent components ([a, b] : rest)
      | ra == rb = go parent components rest
      | otherwise = go (Map.insert ra rb parent) (components - 1) rest
      where
        ra = root parent a
        rb = root parent b
    go parent components (_ : rest) = go parent components rest
