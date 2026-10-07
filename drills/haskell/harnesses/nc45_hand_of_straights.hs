module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "isNStraightHand [1,2,3,6,2,3,4,7,8] 3" True (isNStraightHand [1, 2, 3, 6, 2, 3, 4, 7, 8] 3)
       , tc "isNStraightHand [1,2,3,4,5] 4" False (isNStraightHand [1, 2, 3, 4, 5] 4)
       , tc "isNStraightHand [1,2,3,4,5,6] 2" True (isNStraightHand [1, 2, 3, 4, 5, 6] 2)
       , tc "isNStraightHand [] 1" True (isNStraightHand [] 1)
       , tc "isNStraightHand [1,1,2,2,3,3] 3" True (isNStraightHand [1, 1, 2, 2, 3, 3] 3)
       , tc "isNStraightHand [8,10,12] 3" False (isNStraightHand [8, 10, 12] 3)
       ])
