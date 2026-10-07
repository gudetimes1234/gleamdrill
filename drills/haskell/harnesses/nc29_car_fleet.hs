module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "carFleet 12 [10, 8, 0, 5, 3] [2, 4, 1, 1, 3]" 3 (carFleet 12 [10, 8, 0, 5, 3] [2, 4, 1, 1, 3])
       , tc "carFleet 10 [3] [3]" 1 (carFleet 10 [3] [3])
       , tc "carFleet 100 [0, 2, 4] [4, 2, 1]" 1 (carFleet 100 [0, 2, 4] [4, 2, 1])
       , tc "carFleet 10 [6, 8] [3, 2]" 2 (carFleet 10 [6, 8] [3, 2])
       ])
