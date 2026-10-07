module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "rob [2,3,2]" 3 (rob [2, 3, 2])
       , tc "rob [1,2,3,1]" 4 (rob [1, 2, 3, 1])
       , tc "rob [1,2,3]" 3 (rob [1, 2, 3])
       , tc "rob [1]" 1 (rob [1])
       , tc "rob [1,2]" 2 (rob [1, 2])
       ])
