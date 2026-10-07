module Main where

import Drill
import Solution

far :: Int
far = 2147483647

main :: IO ()
main =
  runCases
    (pure
       [ tc "wallsAndGates (the classic 4x4)" [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]] (wallsAndGates [[far, -1, 0, far], [far, far, far, -1], [far, -1, far, -1], [0, -1, far, far]])
       , tc "wallsAndGates [[0]]" [[0]] (wallsAndGates [[0]])
       , tc "wallsAndGates [[-1]]" [[-1]] (wallsAndGates [[-1]])
       , tc "wallsAndGates []" [] (wallsAndGates [])
       , tc "wallsAndGates (no gate at all)" [[far, far]] (wallsAndGates [[far, far]])
       ])
