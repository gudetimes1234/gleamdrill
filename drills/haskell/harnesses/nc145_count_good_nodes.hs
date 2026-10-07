module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "goodNodes (tree [3,1,4,3,x,1,5])" 4 (goodNodes (tree [Just 3, Just 1, Just 4, Just 3, x, Just 1, Just 5]))
       , tc "goodNodes (tree [])" 0 (goodNodes (tree []))
       , tc "goodNodes (tree [1])" 1 (goodNodes (tree [Just 1]))
       , tc "goodNodes (tree [2,2]) -- equal counts as good" 2 (goodNodes (tree (map Just [2, 2])))
       , tc "goodNodes (tree [3,3,x,4,2])" 3 (goodNodes (tree [Just 3, Just 3, x, Just 4, Just 2]))
       ])
