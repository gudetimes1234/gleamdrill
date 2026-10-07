module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "search [-1, 0, 3, 5, 9, 12] 9" 4 (search [-1, 0, 3, 5, 9, 12] 9)
       , tc "search [-1, 0, 3, 5, 9, 12] 2" (-1) (search [-1, 0, 3, 5, 9, 12] 2)
       , tc "search [5] 5" 0 (search [5] 5)
       , tc "search [] 1" (-1) (search [] 1)
       ])
