module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isHappy 19" True (isHappy 19)
       , tc "isHappy 2" False (isHappy 2)
       , tc "isHappy 1" True (isHappy 1)
       , tc "isHappy 7" True (isHappy 7)
       , tc "isHappy 4" False (isHappy 4)
       ])
