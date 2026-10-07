module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

bst :: Tree
bst = tree [Just 5, Just 3, Just 6, Just 2, Just 4, x, x, Just 1]

main :: IO ()
main =
  runCases
    (pure
       [ tc "kthSmallest bst 1" 1 (kthSmallest bst 1)
       , tc "kthSmallest bst 2" 2 (kthSmallest bst 2)
       , tc "kthSmallest bst 3" 3 (kthSmallest bst 3)
       , tc "kthSmallest bst 4" 4 (kthSmallest bst 4)
       , tc "kthSmallest bst 6" 6 (kthSmallest bst 6)
       , tc "kthSmallest (tree [7]) 1" 7 (kthSmallest (tree [Just 7]) 1)
       ])
