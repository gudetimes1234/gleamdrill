module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "search [4, 5, 6, 7, 0, 1, 2] 0" 4 (search [4, 5, 6, 7, 0, 1, 2] 0)
       , tc "search [4, 5, 6, 7, 0, 1, 2] 3" (-1) (search [4, 5, 6, 7, 0, 1, 2] 3)
       , tc "search [1] 0" (-1) (search [1] 0)
       , tc "search [1, 3] 3" 1 (search [1, 3] 3)
       , tc "search [3, 1] 1" 1 (search [3, 1] 1)
       ])
