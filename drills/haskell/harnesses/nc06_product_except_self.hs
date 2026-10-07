module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "productExceptSelf [1, 2, 3, 4]" [24, 12, 8, 6] (productExceptSelf [1, 2, 3, 4])
       , tc "productExceptSelf [-1, 1, 0, -3, 3]" [0, 0, 9, 0, 0] (productExceptSelf [-1, 1, 0, -3, 3])
       , tc "productExceptSelf [2, 3]" [3, 2] (productExceptSelf [2, 3])
       ])
