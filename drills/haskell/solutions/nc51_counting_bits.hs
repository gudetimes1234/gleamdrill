module Solution where

import Data.Array (elems, listArray, (!))

countBits :: Int -> [Int]
countBits n = elems table
  where
    -- i >> 1 drops the lowest bit, whose count is already known; add it
    -- back. The array is lazy, so each cell reads the earlier one.
    table = listArray (0, n) (0 : [table ! (i `div` 2) + i `mod` 2 | i <- [1 .. n]])
