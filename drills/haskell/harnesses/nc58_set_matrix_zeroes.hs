module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "setZeroes [[1,1,1],[1,0,1],[1,1,1]]" [[1, 0, 1], [0, 0, 0], [1, 0, 1]] (setZeroes [[1, 1, 1], [1, 0, 1], [1, 1, 1]])
       , tc "setZeroes [[0,1,2,0],[3,4,5,2],[1,3,1,5]]" [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] (setZeroes [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])
       , tc "setZeroes [[1,2],[3,4]]" [[1, 2], [3, 4]] (setZeroes [[1, 2], [3, 4]])
       , tc "setZeroes [[1,0]]" [[0, 0]] (setZeroes [[1, 0]])
       ])
