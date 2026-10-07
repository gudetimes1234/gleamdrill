module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "reverseKGroup [1,2,3,4,5] 2" [2, 1, 4, 3, 5] (reverseKGroup [1, 2, 3, 4, 5] 2)
       , tc "reverseKGroup [1,2,3,4,5] 3 -- the last two are left alone" [3, 2, 1, 4, 5] (reverseKGroup [1, 2, 3, 4, 5] 3)
       , tc "reverseKGroup [1,2,3,4] 4" [4, 3, 2, 1] (reverseKGroup [1, 2, 3, 4] 4)
       , tc "reverseKGroup [1,2,3] 1 -- nothing changes" [1, 2, 3] (reverseKGroup [1, 2, 3] 1)
       , tc "reverseKGroup [1,2] 5 -- the group never fills" [1, 2] (reverseKGroup [1, 2] 5)
       , tc "reverseKGroup [] 2" [] (reverseKGroup [] 2)
       ])
