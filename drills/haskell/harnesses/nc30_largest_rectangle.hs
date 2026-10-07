module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "largestRectangleArea [2, 1, 5, 6, 2, 3]" 10 (largestRectangleArea [2, 1, 5, 6, 2, 3])
       , tc "largestRectangleArea [2, 4]" 4 (largestRectangleArea [2, 4])
       , tc "largestRectangleArea [1]" 1 (largestRectangleArea [1])
       , tc "largestRectangleArea [3, 3, 3]" 9 (largestRectangleArea [3, 3, 3])
       ])
