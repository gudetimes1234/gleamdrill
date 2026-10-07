module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "combinationSum [2,3,6,7] 7" [[2, 2, 3], [7]] (sortRows (combinationSum [2, 3, 6, 7] 7))
       , tc "combinationSum [2,3,5] 8" [[2, 2, 2, 2], [2, 3, 3], [3, 5]] (sortRows (combinationSum [2, 3, 5] 8))
       , tc "combinationSum [2] 1" [] (sortRows (combinationSum [2] 1))
       , tc "combinationSum [1] 2" [[1, 1]] (sortRows (combinationSum [1] 2))
       ])
