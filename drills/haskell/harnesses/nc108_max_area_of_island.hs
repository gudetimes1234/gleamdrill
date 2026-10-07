module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxAreaOfIsland (the 8x13 example)" 6 (maxAreaOfIsland
           [ [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
           , [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0]
           , [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
           , [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]
           , [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0]
           , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
           , [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0]
           , [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
           ])
       , tc "maxAreaOfIsland [[0,0,0,0,0,0,0,0]]" 0 (maxAreaOfIsland [[0, 0, 0, 0, 0, 0, 0, 0]])
       , tc "maxAreaOfIsland [[1]]" 1 (maxAreaOfIsland [[1]])
       , tc "maxAreaOfIsland [[1,1],[1,0]]" 3 (maxAreaOfIsland [[1, 1], [1, 0]])
       ])
