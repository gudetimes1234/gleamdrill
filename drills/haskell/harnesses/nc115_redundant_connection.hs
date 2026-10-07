module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findRedundantConnection [[1,2],[1,3],[2,3]]" [2, 3] (findRedundantConnection [[1, 2], [1, 3], [2, 3]])
       , tc "findRedundantConnection [[1,2],[2,3],[3,4],[1,4],[1,5]]" [1, 4] (findRedundantConnection [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])
       , tc "findRedundantConnection [[1,2],[2,1]]" [2, 1] (findRedundantConnection [[1, 2], [2, 1]])
       ])
