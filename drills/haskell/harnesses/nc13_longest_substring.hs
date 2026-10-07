module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "lengthOfLongestSubstring \"abcabcbb\"" 3 (lengthOfLongestSubstring "abcabcbb")
       , tc "lengthOfLongestSubstring \"bbbbb\"" 1 (lengthOfLongestSubstring "bbbbb")
       , tc "lengthOfLongestSubstring \"pwwkew\"" 3 (lengthOfLongestSubstring "pwwkew")
       , tc "lengthOfLongestSubstring \"\"" 0 (lengthOfLongestSubstring "")
       , tc "lengthOfLongestSubstring \"abba\"" 2 (lengthOfLongestSubstring "abba")
       ])
