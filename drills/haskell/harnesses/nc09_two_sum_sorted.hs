module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "twoSum [2, 7, 11, 15] 9" [1, 2] (twoSum [2, 7, 11, 15] 9)
       , tc "twoSum [2, 3, 4] 6" [1, 3] (twoSum [2, 3, 4] 6)
       , tc "twoSum [-1, 0] (-1)" [1, 2] (twoSum [-1, 0] (-1))
       , tc "twoSum [1, 2, 3] 100" [] (twoSum [1, 2, 3] 100)
       ])
