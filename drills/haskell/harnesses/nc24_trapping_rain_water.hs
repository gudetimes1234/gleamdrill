module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "trap [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]" 6 (trap [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
       , tc "trap [4, 2, 0, 3, 2, 5]" 9 (trap [4, 2, 0, 3, 2, 5])
       , tc "trap []" 0 (trap [])
       , tc "trap [3, 2, 1]" 0 (trap [3, 2, 1])
       ])
