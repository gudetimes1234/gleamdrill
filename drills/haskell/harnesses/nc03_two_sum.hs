module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "twoSum [2, 7, 11, 15] 9" [0, 1] (twoSum [2, 7, 11, 15] 9)
       , tc "twoSum [3, 2, 4] 6" [1, 2] (twoSum [3, 2, 4] 6)
       , tc "twoSum [3, 3] 6" [0, 1] (twoSum [3, 3] 6)
       , tc "twoSum [1, 2] 7" [] (twoSum [1, 2] 7)
       ])
