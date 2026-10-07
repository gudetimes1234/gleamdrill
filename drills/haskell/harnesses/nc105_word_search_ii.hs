module Main where

import Drill
import Solution

main :: IO ()
main = runCases (pure cases)
  where
    board = ["oaan", "etae", "ihkr", "iflv"]
    cases =
      [ tc "findWords board [\"oath\",\"pea\",\"eat\",\"rain\"]" ["eat", "oath"] (sortStrings (findWords board ["oath", "pea", "eat", "rain"]))
      , tc "findWords [\"ab\",\"cd\"] [\"abcb\"]" [] (sortStrings (findWords ["ab", "cd"] ["abcb"]))
      , tc "findWords [\"a\"] [\"a\"]" ["a"] (sortStrings (findWords ["a"] ["a"]))
      , tc "findWords board []" [] (sortStrings (findWords ["oaan", "etae"] []))
      , tc "findWords board [\"oa\", \"oa\"] -- once each" ["oa"] (sortStrings (findWords board ["oa", "oa"]))
      ]
