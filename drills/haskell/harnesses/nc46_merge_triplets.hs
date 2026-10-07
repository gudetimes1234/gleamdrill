module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "mergeTriplets [[2,5,3],[1,8,4],[1,7,5]] [2,7,5]" True (mergeTriplets [[2, 5, 3], [1, 8, 4], [1, 7, 5]] [2, 7, 5])
       , tc "mergeTriplets [[3,4,5],[4,5,6]] [3,2,5]" False (mergeTriplets [[3, 4, 5], [4, 5, 6]] [3, 2, 5])
       , tc "mergeTriplets [[2,5,3],[2,3,4],[1,2,5],[5,2,3]] [5,5,5]" True (mergeTriplets [[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]] [5, 5, 5])
       , tc "mergeTriplets [] [1,1,1]" False (mergeTriplets [] [1, 1, 1])
       , tc "mergeTriplets [[1,2,3]] [3,2,1]" False (mergeTriplets [[1, 2, 3]] [3, 2, 1])
       ])
