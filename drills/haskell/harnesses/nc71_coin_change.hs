module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "coinChange [1,2,5] 11" 3 (coinChange [1, 2, 5] 11)
       , tc "coinChange [2] 3" (-1) (coinChange [2] 3)
       , tc "coinChange [1] 0" 0 (coinChange [1] 0)
       , tc "coinChange [186,419,83,408] 6249" 20 (coinChange [186, 419, 83, 408] 6249)
       ])
