module Solution where

-- Expand from each of the 2n-1 centres; every successful widening is
-- one more palindrome.
countSubstrings :: String -> Int
countSubstrings s = sum [ expandCount centre centre + expandCount centre (centre + 1) | centre <- [0 .. n - 1] ]
  where
    n = length s
    expandCount left right
      | left >= 0 && right < n && s !! left == s !! right = 1 + expandCount (left - 1) (right + 1)
      | otherwise = 0
