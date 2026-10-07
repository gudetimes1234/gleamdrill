module Solution where

import Data.Array

-- table (i, j): ways s[i:] can produce t[j:]. Skip s[i] always; use it
-- too when it matches t[j].
numDistinct :: String -> String -> Int
numDistinct s t = table ! (0, 0)
  where
    m = length s
    n = length t
    a = listArray (0, m - 1) s
    b = listArray (0, n - 1) t
    table = array ((0, 0), (m, n)) [((i, j), cell i j) | i <- [0 .. m], j <- [0 .. n]]
    cell i j
      | j == n = 1
      | i == m = 0
      | otherwise = table ! (i + 1, j) + (if a ! i == b ! j then table ! (i + 1, j + 1) else 0)
