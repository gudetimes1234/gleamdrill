module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "countComponents 5 [[0,1],[1,2],[3,4]]" 2 (countComponents 5 [[0, 1], [1, 2], [3, 4]])
       , tc "countComponents 5 [[0,1],[1,2],[2,3],[3,4]]" 1 (countComponents 5 [[0, 1], [1, 2], [2, 3], [3, 4]])
       , tc "countComponents 3 []" 3 (countComponents 3 [])
       , tc "countComponents 0 []" 0 (countComponents 0 [])
       , tc "countComponents 4 [[0,1],[1,0]]" 3 (countComponents 4 [[0, 1], [1, 0]])
       ])
