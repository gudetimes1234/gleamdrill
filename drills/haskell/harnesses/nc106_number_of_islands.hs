module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "numIslands (one big island)" 1 (numIslands ["11110", "11010", "11000", "00000"])
       , tc "numIslands (three islands)" 3 (numIslands ["11000", "11000", "00100", "00011"])
       , tc "numIslands (all water)" 0 (numIslands ["000", "000"])
       , tc "numIslands [\"1\"]" 1 (numIslands ["1"])
       , tc "numIslands (diagonals do not connect)" 2 (numIslands ["10", "01"])
       ])
