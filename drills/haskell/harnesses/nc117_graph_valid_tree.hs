module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "validTree 5 [[0,1],[0,2],[0,3],[1,4]]" True (validTree 5 [[0, 1], [0, 2], [0, 3], [1, 4]])
       , tc "validTree 5 [[0,1],[1,2],[2,3],[1,3],[1,4]]" False (validTree 5 [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]])
       , tc "validTree 1 []" True (validTree 1 [])
       , tc "validTree 0 []" True (validTree 0 [])
       , tc "validTree 2 [] -- disconnected" False (validTree 2 [])
       , tc "validTree 4 [[0,1],[2,3]] -- two trees" False (validTree 4 [[0, 1], [2, 3]])
       ])
