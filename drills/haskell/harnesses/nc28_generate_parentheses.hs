module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "generateParenthesis 3" ["((()))", "(()())", "(())()", "()(())", "()()()"] (sortStrings (generateParenthesis 3))
       , tc "generateParenthesis 1" ["()"] (generateParenthesis 1)
       , tc "length (generateParenthesis 4)" 14 (length (generateParenthesis 4))
       ])
