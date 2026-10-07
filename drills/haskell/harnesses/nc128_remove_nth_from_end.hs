module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "removeNthFromEnd [1,2,3,4,5] 2" [1, 2, 3, 5] (removeNthFromEnd [1, 2, 3, 4, 5] 2)
       , tc "removeNthFromEnd [1] 1" [] (removeNthFromEnd [1] 1)
       , tc "removeNthFromEnd [1,2] 1" [1] (removeNthFromEnd [1, 2] 1)
       , tc "removeNthFromEnd [1,2] 2 -- the head goes" [2] (removeNthFromEnd [1, 2] 2)
       ])
