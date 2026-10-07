module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "plusOne [1,2,3]" [1, 2, 4] (plusOne [1, 2, 3])
       , tc "plusOne [4,3,2,1]" [4, 3, 2, 2] (plusOne [4, 3, 2, 1])
       , tc "plusOne [9]" [1, 0] (plusOne [9])
       , tc "plusOne [9,9,9]" [1, 0, 0, 0] (plusOne [9, 9, 9])
       , tc "plusOne [0]" [1] (plusOne [0])
       ])
