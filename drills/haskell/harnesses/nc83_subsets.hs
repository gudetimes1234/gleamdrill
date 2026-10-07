module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "subsets [1,2,3]" [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]] (sortRows (subsets [1, 2, 3]))
       , tc "subsets [0]" [[], [0]] (sortRows (subsets [0]))
       , tc "subsets []" [[]] (sortRows (subsets []))
       , tc "length (subsets [1,2,3,4,5])" 32 (length (subsets [1, 2, 3, 4, 5]))
       ])
