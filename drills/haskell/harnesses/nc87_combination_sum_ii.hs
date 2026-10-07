module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "combinationSum2 [10,1,2,7,6,1,5] 8" [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] (sortRows (combinationSum2 [10, 1, 2, 7, 6, 1, 5] 8))
       , tc "combinationSum2 [2,5,2,1,2] 5" [[1, 2, 2], [5]] (sortRows (combinationSum2 [2, 5, 2, 1, 2] 5))
       , tc "combinationSum2 [3] 1" [] (sortRows (combinationSum2 [3] 1))
       ])
