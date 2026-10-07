module Main where

import Drill
import Solution

main :: IO ()
main = runCases (pure cases)
  where
    dictionary = addWord "mad" (addWord "dad" (addWord "bad" emptyDictionary))
    cases =
      [ tc "search \"pad\"" False (search "pad" dictionary)
      , tc "search \"bad\"" True (search "bad" dictionary)
      , tc "search \".ad\"" True (search ".ad" dictionary)
      , tc "search \"b..\"" True (search "b.." dictionary)
      , tc "search \"...\"" True (search "..." dictionary)
      , tc "search \"b\" -- too short" False (search "b" dictionary)
      , tc "search \"....\" -- too long" False (search "...." dictionary)
      ]
