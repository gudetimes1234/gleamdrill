module Solution where

import Data.Array

-- table (i, j): LCS of the suffixes text1[i:] and text2[j:], memoised in
-- a lazy array. Matching characters extend the diagonal; otherwise take
-- the better of dropping one.
longestCommonSubsequence :: String -> String -> Int
longestCommonSubsequence text1 text2 = table ! (0, 0)
  where
    m = length text1
    n = length text2
    a = listArray (0, m - 1) text1
    b = listArray (0, n - 1) text2
    table = array ((0, 0), (m, n)) [((i, j), cell i j) | i <- [0 .. m], j <- [0 .. n]]
    cell i j
      | i == m || j == n = 0
      | a ! i == b ! j = 1 + table ! (i + 1, j + 1)
      | otherwise = max (table ! (i + 1, j)) (table ! (i, j + 1))
