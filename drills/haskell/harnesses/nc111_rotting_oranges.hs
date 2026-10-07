module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "orangesRotting [[2,1,1],[1,1,0],[0,1,1]]" 4 (orangesRotting [[2, 1, 1], [1, 1, 0], [0, 1, 1]])
       , tc "orangesRotting [[2,1,1],[0,1,1],[1,0,1]] -- one is unreachable" (-1) (orangesRotting [[2, 1, 1], [0, 1, 1], [1, 0, 1]])
       , tc "orangesRotting [[0,2]]" 0 (orangesRotting [[0, 2]])
       , tc "orangesRotting [[1]] -- nothing rotten to begin with" (-1) (orangesRotting [[1]])
       , tc "orangesRotting [[2,2],[1,1],[0,0],[2,0]]" 1 (orangesRotting [[2, 2], [1, 1], [0, 0], [2, 0]])
       ])
