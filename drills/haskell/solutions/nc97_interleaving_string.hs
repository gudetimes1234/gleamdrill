module Solution where

import Data.Array

-- table (i, j): can s1[:i] and s2[:j] interleave into s3[:i+j]? The last
-- character of that prefix came from one of them.
isInterleave :: String -> String -> String -> Bool
isInterleave s1 s2 s3
  | m + n /= length s3 = False
  | otherwise = table ! (m, n)
  where
    m = length s1
    n = length s2
    a = listArray (1, m) s1
    b = listArray (1, n) s2
    c = listArray (1, m + n) s3
    table = array ((0, 0), (m, n)) [((i, j), cell i j) | i <- [0 .. m], j <- [0 .. n]]
    cell 0 0 = True
    cell i j = fromFirst || fromSecond
      where
        fromFirst = i > 0 && table ! (i - 1, j) && a ! i == c ! (i + j)
        fromSecond = j > 0 && table ! (i, j - 1) && b ! j == c ! (i + j)
