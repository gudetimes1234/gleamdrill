module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxSlidingWindow [1, 3, -1, -3, 5, 3, 6, 7] 3" [3, 3, 5, 5, 6, 7] (maxSlidingWindow [1, 3, -1, -3, 5, 3, 6, 7] 3)
       , tc "maxSlidingWindow [1] 1" [1] (maxSlidingWindow [1] 1)
       , tc "maxSlidingWindow [9, 8, 7] 2" [9, 8] (maxSlidingWindow [9, 8, 7] 2)
       , tc "maxSlidingWindow [1, 1, 1] 2" [1, 1] (maxSlidingWindow [1, 1, 1] 2)
       ])
