module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "climbStairs 2" 2 (climbStairs 2)
       , tc "climbStairs 3" 3 (climbStairs 3)
       , tc "climbStairs 1" 1 (climbStairs 1)
       , tc "climbStairs 10" 89 (climbStairs 10)
       , tc "climbStairs 45" 1836311903 (climbStairs 45)
       ])
