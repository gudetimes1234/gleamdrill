module Main where

import Drill
import Solution

main :: IO ()
main = runCases (pure cases)
  where
    example = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]
    cases =
      [ tc "pacificAtlantic (the 5x5 example)" [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (sortRows (pacificAtlantic example))
      , tc "pacificAtlantic [[1]]" [[0, 0]] (sortRows (pacificAtlantic [[1]]))
      , tc "pacificAtlantic []" [] (sortRows (pacificAtlantic []))
      , tc "pacificAtlantic [[1,1],[1,1]]" [[0, 0], [0, 1], [1, 0], [1, 1]] (sortRows (pacificAtlantic [[1, 1], [1, 1]]))
      ]
