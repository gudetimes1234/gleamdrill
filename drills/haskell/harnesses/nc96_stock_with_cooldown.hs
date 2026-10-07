module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxProfit [1,2,3,0,2]" 3 (maxProfit [1, 2, 3, 0, 2])
       , tc "maxProfit [1]" 0 (maxProfit [1])
       , tc "maxProfit [2,1]" 0 (maxProfit [2, 1])
       , tc "maxProfit [1,2,4]" 3 (maxProfit [1, 2, 4])
       , tc "maxProfit [6,1,3,2,4,7]" 6 (maxProfit [6, 1, 3, 2, 4, 7])
       ])
