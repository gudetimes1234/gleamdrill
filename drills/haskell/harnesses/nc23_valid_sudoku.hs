module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "a valid board" True (isValidSudoku valid)
       , tc "a 5 twice in the first row" False (isValidSudoku rowRepeat)
       , tc "an 8 twice in the top-left box" False (isValidSudoku boxRepeat)
       ])
  where
    valid =
      [ "53..7....", "6..195...", ".98....6."
      , "8...6...3", "4..8.3..1", "7...2...6"
      , ".6....28.", "...419..5", "....8..79"
      ]
    rowRepeat =
      [ "53..7...5", "6..195...", ".98....6."
      , "8...6...3", "4..8.3..1", "7...2...6"
      , ".6....28.", "...419..5", "....8..79"
      ]
    boxRepeat =
      [ "83..7....", "6..195...", ".98....6."
      , "8...6...3", "4..8.3..1", "7...2...6"
      , ".6....28.", "...419..5", "....8..79"
      ]
