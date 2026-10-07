module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "minEatingSpeed [3,6,7,11] 8" 4 (minEatingSpeed [3, 6, 7, 11] 8)
       , tc "minEatingSpeed [30,11,23,4,20] 5" 30 (minEatingSpeed [30, 11, 23, 4, 20] 5)
       , tc "minEatingSpeed [30,11,23,4,20] 6" 23 (minEatingSpeed [30, 11, 23, 4, 20] 6)
       , tc "minEatingSpeed [1] 1" 1 (minEatingSpeed [1] 1)
       ])
