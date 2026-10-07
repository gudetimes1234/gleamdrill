module Main where

import Drill
import Solution

main :: IO ()
main = runCases (pure cases)
  where
    withApple = insert "apple" emptyTrie
    withApp = insert "app" withApple
    cases =
      [ tc "search \"apple\" after inserting it" True (search "apple" withApple)
      , tc "search \"app\" -- a prefix, not a word" False (search "app" withApple)
      , tc "startsWith \"app\"" True (startsWith "app" withApple)
      , tc "startsWith \"b\"" False (startsWith "b" withApple)
      , tc "search \"app\" after inserting it too" True (search "app" withApp)
      ]
