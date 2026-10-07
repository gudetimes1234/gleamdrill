module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "letterCombinations \"23\"" ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] (sortStrings (letterCombinations "23"))
       , tc "letterCombinations \"\"" [] (letterCombinations "")
       , tc "letterCombinations \"2\"" ["a", "b", "c"] (sortStrings (letterCombinations "2"))
       , tc "length (letterCombinations \"79\")" 16 (length (letterCombinations "79"))
       ])
