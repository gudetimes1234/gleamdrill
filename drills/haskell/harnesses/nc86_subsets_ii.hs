module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "subsetsWithDup [1,2,2]" [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] (sortRows (subsetsWithDup [1, 2, 2]))
       , tc "subsetsWithDup [0]" [[], [0]] (sortRows (subsetsWithDup [0]))
       , tc "subsetsWithDup [4,4,4,1,4]" [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]] (sortRows (subsetsWithDup [4, 4, 4, 1, 4]))
       ])
