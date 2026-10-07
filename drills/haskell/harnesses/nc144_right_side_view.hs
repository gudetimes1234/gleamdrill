module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "rightSideView (tree [1,2,3,x,5,x,4])" [1, 3, 4] (rightSideView (tree [Just 1, Just 2, Just 3, x, Just 5, x, Just 4]))
       , tc "rightSideView (tree [1,x,3])" [1, 3] (rightSideView (tree [Just 1, x, Just 3]))
       , tc "rightSideView (tree [])" [] (rightSideView (tree []))
       , tc "rightSideView (tree [1,2,3,4]) -- a left node shows below" [1, 3, 4] (rightSideView (tree (map Just [1, 2, 3, 4])))
       ])
