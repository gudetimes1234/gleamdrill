module Solution where

import Data.Char (isAlphaNum, toLower)

isPalindrome :: String -> Bool
isPalindrome s = cleaned == reverse cleaned
  where
    cleaned = map toLower (filter isAlphaNum s)
