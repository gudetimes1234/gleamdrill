module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "minCostClimbingStairs [10,15,20]" 15 (minCostClimbingStairs [10, 15, 20])
       , tc "minCostClimbingStairs [1,100,1,1,1,100,1,1,100,1]" 6 (minCostClimbingStairs [1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
       , tc "minCostClimbingStairs [0,0]" 0 (minCostClimbingStairs [0, 0])
       , tc "minCostClimbingStairs [5,1]" 1 (minCostClimbingStairs [5, 1])
       ])
