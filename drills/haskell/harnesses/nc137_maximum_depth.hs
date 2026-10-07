module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxDepth (tree [3,9,20,x,x,15,7])" 3 (maxDepth (tree [Just 3, Just 9, Just 20, x, x, Just 15, Just 7]))
       , tc "maxDepth (tree [1,x,2])" 2 (maxDepth (tree [Just 1, x, Just 2]))
       , tc "maxDepth (tree [])" 0 (maxDepth (tree []))
       , tc "maxDepth (tree [1])" 1 (maxDepth (tree [Just 1]))
       ])
