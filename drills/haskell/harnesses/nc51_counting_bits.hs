module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "countBits 2" [0, 1, 1] (countBits 2)
       , tc "countBits 5" [0, 1, 1, 2, 1, 2] (countBits 5)
       , tc "countBits 0" [0] (countBits 0)
       , tc "countBits 8" [0, 1, 1, 2, 1, 2, 2, 3, 1] (countBits 8)
       ])
