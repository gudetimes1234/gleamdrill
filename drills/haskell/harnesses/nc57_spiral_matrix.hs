module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "spiralOrder [[1,2,3],[4,5,6],[7,8,9]]" [1, 2, 3, 6, 9, 8, 7, 4, 5] (spiralOrder [[1, 2, 3], [4, 5, 6], [7, 8, 9]])
       , tc "spiralOrder [[1,2,3,4],[5,6,7,8],[9,10,11,12]]" [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] (spiralOrder [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
       , tc "spiralOrder [[1],[2],[3]]" [1, 2, 3] (spiralOrder [[1], [2], [3]])
       , tc "spiralOrder [[1,2,3]]" [1, 2, 3] (spiralOrder [[1, 2, 3]])
       ])
