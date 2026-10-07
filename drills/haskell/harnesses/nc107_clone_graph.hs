module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "cloneGraph (the 4-cycle)" [[2, 4], [1, 3], [2, 4], [1, 3]] (cloneGraph [[2, 4], [1, 3], [2, 4], [1, 3]])
       , tc "cloneGraph (two nodes)" [[2], [1]] (cloneGraph [[2], [1]])
       , tc "cloneGraph (one node)" [[]] (cloneGraph [[]])
       , tc "cloneGraph []" [] (cloneGraph [])
       ])
