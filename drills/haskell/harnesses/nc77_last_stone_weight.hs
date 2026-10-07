module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "lastStoneWeight [2,7,4,1,8,1]" 1 (lastStoneWeight [2, 7, 4, 1, 8, 1])
       , tc "lastStoneWeight [1]" 1 (lastStoneWeight [1])
       , tc "lastStoneWeight [2,2]" 0 (lastStoneWeight [2, 2])
       , tc "lastStoneWeight []" 0 (lastStoneWeight [])
       , tc "lastStoneWeight [10,4,2,10]" 2 (lastStoneWeight [10, 4, 2, 10])
       ])
