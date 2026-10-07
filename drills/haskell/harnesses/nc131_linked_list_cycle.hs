module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "hasCycle [3,2,0,-4] (tail -> index 1)" True (hasCycle [3, 2, 0, -4] 1)
       , tc "hasCycle [1,2] (no cycle)" False (hasCycle [1, 2] (-1))
       , tc "hasCycle [1] (no cycle)" False (hasCycle [1] (-1))
       , tc "hasCycle [1] (tail -> index 0)" True (hasCycle [1] 0)
       , tc "hasCycle []" False (hasCycle [] (-1))
       , tc "hasCycle [1,2] (tail -> index 0)" True (hasCycle [1, 2] 0)
       ])
