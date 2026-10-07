module Main where

import Drill
import Solution

matrix :: [[Int]]
matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

main :: IO ()
main =
  runCases
    (pure
       [ tc "searchMatrix matrix 3" True (searchMatrix matrix 3)
       , tc "searchMatrix matrix 13" False (searchMatrix matrix 13)
       , tc "searchMatrix matrix 60" True (searchMatrix matrix 60)
       , tc "searchMatrix [[1]] 2" False (searchMatrix [[1]] 2)
       ])
