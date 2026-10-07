module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findTargetSumWays [1,1,1,1,1] 3" 5 (findTargetSumWays [1, 1, 1, 1, 1] 3)
       , tc "findTargetSumWays [1] 1" 1 (findTargetSumWays [1] 1)
       , tc "findTargetSumWays [1] 2" 0 (findTargetSumWays [1] 2)
       , tc "findTargetSumWays [0,0,0,0,0] 0" 32 (findTargetSumWays [0, 0, 0, 0, 0] 0)
       , tc "findTargetSumWays [] 0" 1 (findTargetSumWays [] 0)
       , tc "findTargetSumWays [1,2,3,4,5] 3" 3 (findTargetSumWays [1, 2, 3, 4, 5] 3)
       ])
