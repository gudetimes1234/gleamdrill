module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "numDistinct \"rabbbit\" \"rabbit\"" 3 (numDistinct "rabbbit" "rabbit")
       , tc "numDistinct \"babgbag\" \"bag\"" 5 (numDistinct "babgbag" "bag")
       , tc "numDistinct \"\" \"a\"" 0 (numDistinct "" "a")
       , tc "numDistinct \"a\" \"\"" 1 (numDistinct "a" "")
       , tc "numDistinct \"abc\" \"abc\"" 1 (numDistinct "abc" "abc")
       , tc "numDistinct \"aaa\" \"aa\"" 3 (numDistinct "aaa" "aa")
       ])
