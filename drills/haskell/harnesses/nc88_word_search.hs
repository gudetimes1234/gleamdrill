module Main where

import Drill
import Solution

board :: [String]
board = ["ABCE", "SFCS", "ADEE"]

main :: IO ()
main =
  runCases
    (pure
       [ tc "exist board \"ABCCED\"" True (exist board "ABCCED")
       , tc "exist board \"SEE\"" True (exist board "SEE")
       , tc "exist board \"ABCB\" -- a cell may not be reused" False (exist board "ABCB")
       , tc "exist [\"a\"] \"a\"" True (exist ["a"] "a")
       , tc "exist [\"a\"] \"b\"" False (exist ["a"] "b")
       ])
