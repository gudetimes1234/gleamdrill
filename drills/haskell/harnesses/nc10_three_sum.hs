module Main where

import Drill
import Solution

-- Triples are compared as a set: only their contents are meaningful.
main :: IO ()
main =
  runCases
    (pure
       [ tc "threeSum [-1, 0, 1, 2, -1, -4]" [[-1, -1, 2], [-1, 0, 1]] (sortRows (threeSum [-1, 0, 1, 2, -1, -4]))
       , tc "threeSum [0, 1, 1]" [] (sortRows (threeSum [0, 1, 1]))
       , tc "threeSum [0, 0, 0]" [[0, 0, 0]] (sortRows (threeSum [0, 0, 0]))
       ])
