module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "checkInclusion \"ab\" \"eidbaooo\"" True (checkInclusion "ab" "eidbaooo")
       , tc "checkInclusion \"ab\" \"eidboaoo\"" False (checkInclusion "ab" "eidboaoo")
       , tc "checkInclusion \"abc\" \"ab\"" False (checkInclusion "abc" "ab")
       , tc "checkInclusion \"a\" \"a\"" True (checkInclusion "a" "a")
       ])
