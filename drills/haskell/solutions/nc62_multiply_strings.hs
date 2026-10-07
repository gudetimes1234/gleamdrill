module Solution where

import Data.Array (accumArray, elems)
import Data.Char (digitToInt, intToDigit)

-- Digit i of num1 times digit j of num2 lands at position i+j of the
-- product, counted from the least significant end; a carry pass follows.
multiply :: String -> String -> String
multiply num1 num2
  | num1 == "0" || num2 == "0" = "0"
  | otherwise = map intToDigit (reverse (carry 0 sums))
  where
    r1 = map digitToInt (reverse num1)
    r2 = map digitToInt (reverse num2)
    top = length r1 + length r2 - 2
    sums = elems (accumArray (+) 0 (0, top) [ (i + j, a * b) | (i, a) <- zip [0 ..] r1, (j, b) <- zip [0 ..] r2 ])
    carry c [] = spill c
    carry c (d : rest) = let total = d + c in (total `mod` 10) : carry (total `div` 10) rest
    spill 0 = []
    spill c = (c `mod` 10) : spill (c `div` 10)
