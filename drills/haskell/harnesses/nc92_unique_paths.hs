module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "uniquePaths 3 7" 28 (uniquePaths 3 7)
       , tc "uniquePaths 3 2" 3 (uniquePaths 3 2)
       , tc "uniquePaths 1 1" 1 (uniquePaths 1 1)
       , tc "uniquePaths 10 10" 48620 (uniquePaths 10 10)
       ])
