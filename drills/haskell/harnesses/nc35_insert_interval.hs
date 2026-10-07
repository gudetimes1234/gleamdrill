module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "insert [[1,3],[6,9]] [2,5]" [[1, 5], [6, 9]] (insert [[1, 3], [6, 9]] [2, 5])
       , tc "insert [[1,2],[3,5],[6,7],[8,10],[12,16]] [4,8]" [[1, 2], [3, 10], [12, 16]] (insert [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]] [4, 8])
       , tc "insert [] [5,7]" [[5, 7]] (insert [] [5, 7])
       , tc "insert [[1,5]] [6,8]" [[1, 5], [6, 8]] (insert [[1, 5]] [6, 8])
       , tc "insert [[3,5]] [1,2]" [[1, 2], [3, 5]] (insert [[3, 5]] [1, 2])
       ])
