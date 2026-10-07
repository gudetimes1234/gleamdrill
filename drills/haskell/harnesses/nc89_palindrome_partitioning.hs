module Main where

import Data.List (intercalate)
import Drill
import Solution

joined :: String -> [String]
joined s = sortStrings [ intercalate "," pieces | pieces <- partition s ]

main :: IO ()
main =
  runCases
    (pure
       [ tc "partition \"aab\"" ["a,a,b", "aa,b"] (joined "aab")
       , tc "partition \"a\"" ["a"] (joined "a")
       , tc "partition \"\"" [""] (joined "")
       , tc "partition \"aba\"" ["a,b,a", "aba"] (joined "aba")
       , tc "partition \"abc\"" ["a,b,c"] (joined "abc")
       ])
