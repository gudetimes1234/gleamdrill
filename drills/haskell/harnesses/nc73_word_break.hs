module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "wordBreak \"leetcode\" [\"leet\",\"code\"]" True (wordBreak "leetcode" ["leet", "code"])
       , tc "wordBreak \"applepenapple\" [\"apple\",\"pen\"]" True (wordBreak "applepenapple" ["apple", "pen"])
       , tc "wordBreak \"catsandog\" [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]" False (wordBreak "catsandog" ["cats", "dog", "sand", "and", "cat"])
       , tc "wordBreak \"\" [\"a\"]" True (wordBreak "" ["a"])
       , tc "wordBreak \"a\" []" False (wordBreak "a" [])
       , tc "wordBreak \"aaaaaaa\" [\"aaa\",\"aaaa\"]" True (wordBreak "aaaaaaa" ["aaa", "aaaa"])
       ])
