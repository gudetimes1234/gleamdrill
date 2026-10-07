module Solution where

import Data.Array

-- table (i, j): edits to turn word1[:i] into word2[:j]. Equal last
-- characters cost nothing; otherwise one edit plus the best of replace,
-- delete or insert.
minDistance :: String -> String -> Int
minDistance word1 word2 = table ! (m, n)
  where
    m = length word1
    n = length word2
    a = listArray (1, m) word1
    b = listArray (1, n) word2
    table = array ((0, 0), (m, n)) [((i, j), cell i j) | i <- [0 .. m], j <- [0 .. n]]
    cell i 0 = i
    cell 0 j = j
    cell i j
      | a ! i == b ! j = table ! (i - 1, j - 1)
      | otherwise = 1 + minimum [table ! (i - 1, j - 1), table ! (i - 1, j), table ! (i, j - 1)]
