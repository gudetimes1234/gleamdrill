module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "missingNumber [3,0,1]" 2 (missingNumber [3, 0, 1])
       , tc "missingNumber [0,1]" 2 (missingNumber [0, 1])
       , tc "missingNumber [9,6,4,2,3,5,7,0,1]" 8 (missingNumber [9, 6, 4, 2, 3, 5, 7, 0, 1])
       , tc "missingNumber [0]" 1 (missingNumber [0])
       , tc "missingNumber [1]" 0 (missingNumber [1])
       ])
