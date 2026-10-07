module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxProduct [2,3,-2,4]" 6 (maxProduct [2, 3, -2, 4])
       , tc "maxProduct [-2,0,-1]" 0 (maxProduct [-2, 0, -1])
       , tc "maxProduct [-2]" (-2) (maxProduct [-2])
       , tc "maxProduct [-2,3,-4]" 24 (maxProduct [-2, 3, -4])
       , tc "maxProduct [0,2]" 2 (maxProduct [0, 2])
       ])
