module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "longestCommonSubsequence \"abcde\" \"ace\"" 3 (longestCommonSubsequence "abcde" "ace")
       , tc "longestCommonSubsequence \"abc\" \"abc\"" 3 (longestCommonSubsequence "abc" "abc")
       , tc "longestCommonSubsequence \"abc\" \"def\"" 0 (longestCommonSubsequence "abc" "def")
       , tc "longestCommonSubsequence \"\" \"a\"" 0 (longestCommonSubsequence "" "a")
       , tc "longestCommonSubsequence \"bsbininm\" \"jmjkbkjkv\"" 1 (longestCommonSubsequence "bsbininm" "jmjkbkjkv")
       ])
