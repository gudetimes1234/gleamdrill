module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "canFinish 2 [[1,0]]" True (canFinish 2 [[1, 0]])
       , tc "canFinish 2 [[1,0],[0,1]]" False (canFinish 2 [[1, 0], [0, 1]])
       , tc "canFinish 1 []" True (canFinish 1 [])
       , tc "canFinish 5 [[1,4],[2,4],[3,1],[3,2]]" True (canFinish 5 [[1, 4], [2, 4], [3, 1], [3, 2]])
       , tc "canFinish 3 [[0,1],[1,2],[2,0]]" False (canFinish 3 [[0, 1], [1, 2], [2, 0]])
       ])
