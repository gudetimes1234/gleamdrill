module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "minInterval [[1,4],[2,4],[3,6],[4,4]] [2,3,4,5]" [3, 3, 1, 4] (minInterval [[1, 4], [2, 4], [3, 6], [4, 4]] [2, 3, 4, 5])
       , tc "minInterval [[2,3],[2,5],[1,8],[20,25]] [2,19,5,22]" [2, -1, 4, 6] (minInterval [[2, 3], [2, 5], [1, 8], [20, 25]] [2, 19, 5, 22])
       , tc "minInterval [] [1,2]" [-1, -1] (minInterval [] [1, 2])
       , tc "minInterval [[1,10]] []" [] (minInterval [[1, 10]] [])
       , tc "minInterval [[1,3]] [0,4]" [-1, -1] (minInterval [[1, 3]] [0, 4])
       ])
