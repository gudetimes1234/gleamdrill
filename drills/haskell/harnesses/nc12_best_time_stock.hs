module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxProfit [7, 1, 5, 3, 6, 4]" 5 (maxProfit [7, 1, 5, 3, 6, 4])
       , tc "maxProfit [7, 6, 4, 3, 1]" 0 (maxProfit [7, 6, 4, 3, 1])
       , tc "maxProfit [2]" 0 (maxProfit [2])
       ])
