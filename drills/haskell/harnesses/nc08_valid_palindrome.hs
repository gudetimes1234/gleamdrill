module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isPalindrome \"A man, a plan, a canal: Panama\"" True (isPalindrome "A man, a plan, a canal: Panama")
       , tc "isPalindrome \"race a car\"" False (isPalindrome "race a car")
       , tc "isPalindrome \" \"" True (isPalindrome " ")
       , tc "isPalindrome \"0P\"" False (isPalindrome "0P")
       ])
