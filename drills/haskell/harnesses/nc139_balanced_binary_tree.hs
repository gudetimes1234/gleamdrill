module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

-- The Go harness's last tree, padded to the level-order slots the
-- Drill builder indexes: 1(2(3(4,_),_), 2(_,3(_,4))).
offRoot :: Tree
offRoot = tree [Just 1, Just 2, Just 2, Just 3, x, x, Just 3, Just 4, x, x, x, x, x, x, Just 4]

main :: IO ()
main =
  runCases
    (pure
       [ tc "isBalanced (tree [3,9,20,x,x,15,7])" True (isBalanced (tree [Just 3, Just 9, Just 20, x, x, Just 15, Just 7]))
       , tc "isBalanced (tree [1,2,2,3,3,x,x,4,4])" False (isBalanced (tree [Just 1, Just 2, Just 2, Just 3, Just 3, x, x, Just 4, Just 4]))
       , tc "isBalanced (tree [])" True (isBalanced (tree []))
       , tc "isBalanced (tree [1,2,x,3]) -- a chain of three" False (isBalanced (tree [Just 1, Just 2, x, Just 3]))
       , tc "isBalanced (balanced at every node but the root)" False (isBalanced offRoot)
       ])
