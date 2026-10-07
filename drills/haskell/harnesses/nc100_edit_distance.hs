module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "minDistance \"horse\" \"ros\"" 3 (minDistance "horse" "ros")
       , tc "minDistance \"intention\" \"execution\"" 5 (minDistance "intention" "execution")
       , tc "minDistance \"\" \"abc\"" 3 (minDistance "" "abc")
       , tc "minDistance \"abc\" \"\"" 3 (minDistance "abc" "")
       , tc "minDistance \"same\" \"same\"" 0 (minDistance "same" "same")
       ])
