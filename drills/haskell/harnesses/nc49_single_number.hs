module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "singleNumber [2,2,1]" 1 (singleNumber [2, 2, 1])
       , tc "singleNumber [4,1,2,1,2]" 4 (singleNumber [4, 1, 2, 1, 2])
       , tc "singleNumber [1]" 1 (singleNumber [1])
       , tc "singleNumber [-1,-1,-7]" (-7) (singleNumber [-1, -1, -7])
       ])
