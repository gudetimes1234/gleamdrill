module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "lengthOfLIS [10,9,2,5,3,7,101,18]" 4 (lengthOfLIS [10, 9, 2, 5, 3, 7, 101, 18])
       , tc "lengthOfLIS [0,1,0,3,2,3]" 4 (lengthOfLIS [0, 1, 0, 3, 2, 3])
       , tc "lengthOfLIS [7,7,7,7]" 1 (lengthOfLIS [7, 7, 7, 7])
       , tc "lengthOfLIS []" 0 (lengthOfLIS [])
       , tc "lengthOfLIS [5,4,3,2,1]" 1 (lengthOfLIS [5, 4, 3, 2, 1])
       ])
