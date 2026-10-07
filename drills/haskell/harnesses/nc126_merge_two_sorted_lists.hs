module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "mergeTwoLists [1,2,4] [1,3,4]" [1, 1, 2, 3, 4, 4] (mergeTwoLists [1, 2, 4] [1, 3, 4])
       , tc "mergeTwoLists [] []" [] (mergeTwoLists [] [])
       , tc "mergeTwoLists [] [0]" [0] (mergeTwoLists [] [0])
       , tc "mergeTwoLists [5] [1,2]" [1, 2, 5] (mergeTwoLists [5] [1, 2])
       ])
