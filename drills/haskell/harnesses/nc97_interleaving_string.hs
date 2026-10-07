module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isInterleave \"aabcc\" \"dbbca\" \"aadbbcbcac\"" True (isInterleave "aabcc" "dbbca" "aadbbcbcac")
       , tc "isInterleave \"aabcc\" \"dbbca\" \"aadbbbaccc\"" False (isInterleave "aabcc" "dbbca" "aadbbbaccc")
       , tc "isInterleave \"\" \"\" \"\"" True (isInterleave "" "" "")
       , tc "isInterleave \"a\" \"\" \"a\"" True (isInterleave "a" "" "a")
       , tc "isInterleave \"\" \"b\" \"b\"" True (isInterleave "" "b" "b")
       , tc "isInterleave \"abc\" \"def\" \"adbecf\"" True (isInterleave "abc" "def" "adbecf")
       ])
