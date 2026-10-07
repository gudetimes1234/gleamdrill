module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "minWindow \"ADOBECODEBANC\" \"ABC\"" "BANC" (minWindow "ADOBECODEBANC" "ABC")
       , tc "minWindow \"a\" \"a\"" "a" (minWindow "a" "a")
       , tc "minWindow \"a\" \"aa\"" "" (minWindow "a" "aa")
       , tc "minWindow \"ab\" \"b\"" "b" (minWindow "ab" "b")
       ])
