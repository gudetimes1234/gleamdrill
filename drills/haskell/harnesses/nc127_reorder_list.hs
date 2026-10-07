module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "reorderList [1,2,3,4]" [1, 4, 2, 3] (reorderList [1, 2, 3, 4])
       , tc "reorderList [1,2,3,4,5] -- the middle stays last" [1, 5, 2, 4, 3] (reorderList [1, 2, 3, 4, 5])
       , tc "reorderList [1,2]" [1, 2] (reorderList [1, 2])
       , tc "reorderList [1]" [1] (reorderList [1])
       , tc "reorderList []" [] (reorderList [])
       ])
