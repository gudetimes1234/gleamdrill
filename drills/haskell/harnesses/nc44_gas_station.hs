module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "canCompleteCircuit [1,2,3,4,5] [3,4,5,1,2]" 3 (canCompleteCircuit [1, 2, 3, 4, 5] [3, 4, 5, 1, 2])
       , tc "canCompleteCircuit [2,3,4] [3,4,3]" (-1) (canCompleteCircuit [2, 3, 4] [3, 4, 3])
       , tc "canCompleteCircuit [5] [4]" 0 (canCompleteCircuit [5] [4])
       , tc "canCompleteCircuit [1,2] [2,1]" 1 (canCompleteCircuit [1, 2] [2, 1])
       ])
