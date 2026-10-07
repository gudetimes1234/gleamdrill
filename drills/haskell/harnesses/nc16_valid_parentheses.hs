module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isValid \"()\"" True (isValid "()")
       , tc "isValid \"()[]{}\"" True (isValid "()[]{}")
       , tc "isValid \"(]\"" False (isValid "(]")
       , tc "isValid \"([)]\"" False (isValid "([)]")
       , tc "isValid \"{[]}\"" True (isValid "{[]}")
       , tc "isValid \"(\"" False (isValid "(")
       , tc "isValid \")\"" False (isValid ")")
       ])
