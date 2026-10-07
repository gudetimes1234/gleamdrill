module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "networkDelayTime [[2,1,1],[2,3,1],[3,4,1]] 4 2" 2 (networkDelayTime [[2, 1, 1], [2, 3, 1], [3, 4, 1]] 4 2)
       , tc "networkDelayTime [[1,2,1]] 2 1" 1 (networkDelayTime [[1, 2, 1]] 2 1)
       , tc "networkDelayTime [[1,2,1]] 2 2 -- node 1 is unreachable" (-1) (networkDelayTime [[1, 2, 1]] 2 2)
       , tc "networkDelayTime [] 1 1" 0 (networkDelayTime [] 1 1)
       , tc "networkDelayTime (the long way round is shorter) 3 1" 3 (networkDelayTime [[1, 2, 1], [2, 3, 2], [1, 3, 4]] 3 1)
       ])
