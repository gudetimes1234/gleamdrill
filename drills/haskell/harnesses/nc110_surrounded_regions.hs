module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "solve (the 4x4 example)" ["XXXX", "XXXX", "XXXX", "XOXX"] (solve ["XXXX", "XOOX", "XXOX", "XOXX"])
       , tc "solve [\"X\"]" ["X"] (solve ["X"])
       , tc "solve (an O on the border survives)" ["OX", "XX"] (solve ["OX", "XX"])
       , tc "solve (a region linked to the border survives)" ["OOX", "XOX", "XXX"] (solve ["OOX", "XOX", "XXX"])
       ])
