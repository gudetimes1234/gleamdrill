module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "levelOrder (tree [3,9,20,x,x,15,7])" [[3], [9, 20], [15, 7]] (levelOrder (tree [Just 3, Just 9, Just 20, x, x, Just 15, Just 7]))
       , tc "levelOrder (tree [1])" [[1]] (levelOrder (tree [Just 1]))
       , tc "levelOrder (tree [])" [] (levelOrder (tree []))
       , tc "levelOrder (tree [1,2,x,3]) -- a chain" [[1], [2], [3]] (levelOrder (tree [Just 1, Just 2, x, Just 3]))
       ])
