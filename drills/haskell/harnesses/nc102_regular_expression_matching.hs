module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isMatch \"aa\" \"a\"" False (isMatch "aa" "a")
       , tc "isMatch \"aa\" \"a*\"" True (isMatch "aa" "a*")
       , tc "isMatch \"ab\" \".*\"" True (isMatch "ab" ".*")
       , tc "isMatch \"aab\" \"c*a*b\"" True (isMatch "aab" "c*a*b")
       , tc "isMatch \"mississippi\" \"mis*is*p*.\"" False (isMatch "mississippi" "mis*is*p*.")
       , tc "isMatch \"\" \".*\"" True (isMatch "" ".*")
       , tc "isMatch \"\" \"\"" True (isMatch "" "")
       , tc "isMatch \"abc\" \"abc\"" True (isMatch "abc" "abc")
       ])
