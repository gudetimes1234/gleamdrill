module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "canJump [2,3,1,1,4]" True (canJump [2, 3, 1, 1, 4])
       , tc "canJump [3,2,1,0,4]" False (canJump [3, 2, 1, 0, 4])
       , tc "canJump [0]" True (canJump [0])
       , tc "canJump [0, 1]" False (canJump [0, 1])
       ])
