module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

bst :: Tree
bst = tree [Just 6, Just 2, Just 8, Just 0, Just 4, Just 7, Just 9, x, x, Just 3, Just 5]

main :: IO ()
main =
  runCases
    (pure
       [ tc "lowestCommonAncestor bst 2 8" 6 (lowestCommonAncestor bst 2 8)
       , tc "lowestCommonAncestor bst 2 4 -- an ancestor counts" 2 (lowestCommonAncestor bst 2 4)
       , tc "lowestCommonAncestor bst 3 5" 4 (lowestCommonAncestor bst 3 5)
       , tc "lowestCommonAncestor bst 7 9" 8 (lowestCommonAncestor bst 7 9)
       , tc "lowestCommonAncestor (tree [1]) 1 1" 1 (lowestCommonAncestor (tree [Just 1]) 1 1)
       ])
