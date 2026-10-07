module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findMedianSortedArrays [1,3] [2]" 2.0 (findMedianSortedArrays [1, 3] [2])
       , tc "findMedianSortedArrays [1,2] [3,4]" 2.5 (findMedianSortedArrays [1, 2] [3, 4])
       , tc "findMedianSortedArrays [] [1]" 1.0 (findMedianSortedArrays [] [1])
       , tc "findMedianSortedArrays [1,2,3,4,5] [6,7,8,9,10]" 5.5 (findMedianSortedArrays [1, 2, 3, 4, 5] [6, 7, 8, 9, 10])
       ])
