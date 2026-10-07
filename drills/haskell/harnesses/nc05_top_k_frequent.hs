module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "topKFrequent [1, 1, 1, 2, 2, 3] 2" [1, 2] (sortInts (topKFrequent [1, 1, 1, 2, 2, 3] 2))
       , tc "topKFrequent [1] 1" [1] (topKFrequent [1] 1)
       , tc "topKFrequent [5, 5, 4, 4, 4, 3] 1" [4] (topKFrequent [5, 5, 4, 4, 4, 3] 1)
       ])
