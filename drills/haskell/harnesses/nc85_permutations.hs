module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "permute [1,2,3]" [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] (sortRows (permute [1, 2, 3]))
       , tc "permute [0,1]" [[0, 1], [1, 0]] (sortRows (permute [0, 1]))
       , tc "permute [1]" [[1]] (permute [1])
       , tc "length (permute [1,2,3,4])" 24 (length (permute [1, 2, 3, 4]))
       ])
