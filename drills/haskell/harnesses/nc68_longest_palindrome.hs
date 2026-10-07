module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "longestPalindrome \"babad\"" "bab" (longestPalindrome "babad")
       , tc "longestPalindrome \"cbbd\"" "bb" (longestPalindrome "cbbd")
       , tc "longestPalindrome \"a\"" "a" (longestPalindrome "a")
       , tc "longestPalindrome \"forgeeksskeegfor\"" "geeksskeeg" (longestPalindrome "forgeeksskeegfor")
       , tc "length (longestPalindrome \"abcd\")" 1 (length (longestPalindrome "abcd"))
       ])
