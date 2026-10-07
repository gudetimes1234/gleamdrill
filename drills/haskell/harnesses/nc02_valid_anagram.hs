module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isAnagram \"anagram\" \"nagaram\"" True (isAnagram "anagram" "nagaram")
       , tc "isAnagram \"rat\" \"car\"" False (isAnagram "rat" "car")
       , tc "isAnagram \"\" \"\"" True (isAnagram "" "")
       , tc "isAnagram \"a\" \"ab\"" False (isAnagram "a" "ab")
       ])
