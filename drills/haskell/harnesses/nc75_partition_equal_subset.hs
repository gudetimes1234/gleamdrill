module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "canPartition [1,5,11,5]" True (canPartition [1, 5, 11, 5])
       , tc "canPartition [1,2,3,5]" False (canPartition [1, 2, 3, 5])
       , tc "canPartition [2,2]" True (canPartition [2, 2])
       , tc "canPartition [1]" False (canPartition [1])
       , tc "canPartition [1,2,5]" False (canPartition [1, 2, 5])
       ])
