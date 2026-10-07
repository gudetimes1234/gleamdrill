module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "isSubtree (tree [3,4,5,1,2]) (tree [4,1,2])" True (isSubtree (tree (map Just [3, 4, 5, 1, 2])) (tree (map Just [4, 1, 2])))
       , tc "isSubtree (a near match with an extra node)" False (isSubtree (tree [Just 3, Just 4, Just 5, Just 1, Just 2, x, x, x, x, Just 0]) (tree (map Just [4, 1, 2])))
       , tc "isSubtree (tree [1]) (tree [1]) -- a tree is its own subtree" True (isSubtree (tree [Just 1]) (tree [Just 1]))
       , tc "isSubtree (tree []) (tree [1])" False (isSubtree (tree []) (tree [Just 1]))
       , tc "isSubtree (tree [1]) (tree []) -- the empty tree is in everything" True (isSubtree (tree [Just 1]) (tree []))
       , tc "isSubtree (tree [12]) (tree [2]) -- values are not digits" False (isSubtree (tree [Just 12]) (tree [Just 2]))
       ])
