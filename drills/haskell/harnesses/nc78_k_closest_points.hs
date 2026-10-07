module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "kClosest [[1,3],[-2,2]] 1" [[-2, 2]] (sortRows (kClosest [[1, 3], [-2, 2]] 1))
       , tc "kClosest [[3,3],[5,-1],[-2,4]] 2" [[-2, 4], [3, 3]] (sortRows (kClosest [[3, 3], [5, -1], [-2, 4]] 2))
       , tc "kClosest [] 0" [] (sortRows (kClosest [] 0))
       , tc "kClosest [[1,1],[2,2],[3,3]] 2" [[1, 1], [2, 2]] (sortRows (kClosest [[1, 1], [2, 2], [3, 3]] 2))
       ])
