module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "longestConsecutive [100, 4, 200, 1, 3, 2]" 4 (longestConsecutive [100, 4, 200, 1, 3, 2])
       , tc "longestConsecutive [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]" 9 (longestConsecutive [0, 3, 7, 2, 5, 8, 4, 6, 0, 1])
       , tc "longestConsecutive []" 0 (longestConsecutive [])
       ])
