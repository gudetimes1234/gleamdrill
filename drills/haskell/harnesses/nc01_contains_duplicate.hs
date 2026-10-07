module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "containsDuplicate [1, 2, 3, 1]" True (containsDuplicate [1, 2, 3, 1])
       , tc "containsDuplicate [1, 2, 3, 4]" False (containsDuplicate [1, 2, 3, 4])
       , tc "containsDuplicate []" False (containsDuplicate [])
       , tc "containsDuplicate [7, 7]" True (containsDuplicate [7, 7])
       ])
