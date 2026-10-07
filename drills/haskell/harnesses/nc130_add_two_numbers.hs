module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "addTwoNumbers [2,4,3] [5,6,4] -- 342 + 465" [7, 0, 8] (addTwoNumbers [2, 4, 3] [5, 6, 4])
       , tc "addTwoNumbers [0] [0]" [0] (addTwoNumbers [0] [0])
       , tc "addTwoNumbers [9,9,9,9,9,9,9] [9,9,9,9]" [8, 9, 9, 9, 0, 0, 0, 1] (addTwoNumbers [9, 9, 9, 9, 9, 9, 9] [9, 9, 9, 9])
       , tc "addTwoNumbers [5] [5] -- a carry makes a new digit" [0, 1] (addTwoNumbers [5] [5])
       ])
