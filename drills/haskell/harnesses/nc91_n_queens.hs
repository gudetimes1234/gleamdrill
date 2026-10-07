module Main where

import Data.List (intercalate)
import Drill
import Solution

boards :: Int -> [String]
boards n = sortStrings (map (intercalate "|") (solveNQueens n))

main :: IO ()
main =
  runCases
    (pure
       [ tc "solveNQueens 4" ["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."] (boards 4)
       , tc "solveNQueens 1" ["Q"] (boards 1)
       , tc "solveNQueens 2" [] (boards 2)
       , tc "solveNQueens 3" [] (boards 3)
       , tc "length (solveNQueens 6)" 4 (length (solveNQueens 6))
       ])
