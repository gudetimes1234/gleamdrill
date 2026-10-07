module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "reverseList [1,2,3,4,5]" [5, 4, 3, 2, 1] (reverseList [1, 2, 3, 4, 5])
       , tc "reverseList [1,2]" [2, 1] (reverseList [1, 2])
       , tc "reverseList [1]" [1] (reverseList [1])
       , tc "reverseList []" [] (reverseList [])
       ])
