module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxSubArray [-2,1,-3,4,-1,2,1,-5,4]" 6 (maxSubArray [-2, 1, -3, 4, -1, 2, 1, -5, 4])
       , tc "maxSubArray [1]" 1 (maxSubArray [1])
       , tc "maxSubArray [5,4,-1,7,8]" 23 (maxSubArray [5, 4, -1, 7, 8])
       , tc "maxSubArray [-3,-1,-2]" (-1) (maxSubArray [-3, -1, -2])
       ])
