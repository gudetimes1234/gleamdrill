module Solution where

-- Every palindrome has a centre: a character, or the gap between two.
-- Expand from each of the 2n-1 centres while the ends match.
longestPalindrome :: String -> String
longestPalindrome s = foldl better "" [ candidate | centre <- [0 .. n - 1], candidate <- [expand centre centre, expand centre (centre + 1)] ]
  where
    n = length s
    better best candidate = if length candidate > length best then candidate else best
    expand left right
      | left >= 0 && right < n && s !! left == s !! right = expand (left - 1) (right + 1)
      | otherwise = take (right - left - 1) (drop (left + 1) s)
