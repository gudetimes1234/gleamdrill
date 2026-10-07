module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "rob [1,2,3,1]" 4 (rob [1, 2, 3, 1])
       , tc "rob [2,7,9,3,1]" 12 (rob [2, 7, 9, 3, 1])
       , tc "rob [5]" 5 (rob [5])
       , tc "rob []" 0 (rob [])
       , tc "rob [2,1,1,2]" 4 (rob [2, 1, 1, 2])
       ])
