module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findMin [3, 4, 5, 1, 2]" 1 (findMin [3, 4, 5, 1, 2])
       , tc "findMin [4, 5, 6, 7, 0, 1, 2]" 0 (findMin [4, 5, 6, 7, 0, 1, 2])
       , tc "findMin [11, 13, 15, 17]" 11 (findMin [11, 13, 15, 17])
       , tc "findMin [2, 1]" 1 (findMin [2, 1])
       ])
