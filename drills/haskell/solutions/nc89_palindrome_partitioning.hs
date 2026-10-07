module Solution where

-- Cut off every palindromic prefix of what remains and recurse.
partition :: String -> [[String]]
partition s = build s
  where
    build [] = [[]]
    build remaining = [ prefix : rest | n <- [1 .. length remaining], let (prefix, suffix) = splitAt n remaining, isPalindrome prefix, rest <- build suffix ]

isPalindrome :: String -> Bool
isPalindrome str = str == reverse str
