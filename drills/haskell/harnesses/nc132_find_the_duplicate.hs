module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findDuplicate [1,3,4,2,2]" 2 (findDuplicate [1, 3, 4, 2, 2])
       , tc "findDuplicate [3,1,3,4,2]" 3 (findDuplicate [3, 1, 3, 4, 2])
       , tc "findDuplicate [1,1]" 1 (findDuplicate [1, 1])
       , tc "findDuplicate [2,2,2,2,2] -- repeated more than twice" 2 (findDuplicate [2, 2, 2, 2, 2])
       , tc "findDuplicate [1,4,4,2,4]" 4 (findDuplicate [1, 4, 4, 2, 4])
       ])
