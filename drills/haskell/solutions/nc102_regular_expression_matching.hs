module Solution where

import Data.Array

-- table (i, j): does s[i:] match p[j:]? A star (p[j+1]) means either skip
-- the pair, or consume one matching character and stay on the pair.
isMatch :: String -> String -> Bool
isMatch s p = table ! (0, 0)
  where
    m = length s
    n = length p
    a = listArray (0, m - 1) s
    b = listArray (0, n - 1) p
    table = array ((0, 0), (m, n)) [((i, j), cell i j) | i <- [0 .. m], j <- [0 .. n]]
    cell i j
      | j == n = i == m
      | j + 1 < n && b ! (j + 1) == '*' = table ! (i, j + 2) || (first && table ! (i + 1, j))
      | otherwise = first && table ! (i + 1, j + 1)
      where
        first = i < m && (b ! j == '.' || b ! j == a ! i)
