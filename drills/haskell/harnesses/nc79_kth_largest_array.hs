module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findKthLargest [3,2,1,5,6,4] 2" 5 (findKthLargest [3, 2, 1, 5, 6, 4] 2)
       , tc "findKthLargest [3,2,3,1,2,4,5,5,6] 4" 4 (findKthLargest [3, 2, 3, 1, 2, 4, 5, 5, 6] 4)
       , tc "findKthLargest [1] 1" 1 (findKthLargest [1] 1)
       , tc "findKthLargest [2,1] 2" 1 (findKthLargest [2, 1] 2)
       ])
