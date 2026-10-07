module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxArea [1, 8, 6, 2, 5, 4, 8, 3, 7]" 49 (maxArea [1, 8, 6, 2, 5, 4, 8, 3, 7])
       , tc "maxArea [1, 1]" 1 (maxArea [1, 1])
       ])
