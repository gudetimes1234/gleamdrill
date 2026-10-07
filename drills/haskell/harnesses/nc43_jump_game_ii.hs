module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "jump [2,3,1,1,4]" 2 (jump [2, 3, 1, 1, 4])
       , tc "jump [2,3,0,1,4]" 2 (jump [2, 3, 0, 1, 4])
       , tc "jump [0]" 0 (jump [0])
       , tc "jump [1,1,1,1]" 3 (jump [1, 1, 1, 1])
       ])
