module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

-- The Go harness's lopsided tree, padded to the level-order slots the
-- Drill builder indexes: 1(2(3, 4(5(_,6), _)), _).
lopsided :: Tree
lopsided = tree [Just 1, Just 2, x, Just 3, Just 4, x, x, x, x, Just 5, x, x, x, x, x, x, x, x, x, x, Just 6]

main :: IO ()
main =
  runCases
    (pure
       [ tc "diameterOfBinaryTree (tree [1,2,3,4,5])" 3 (diameterOfBinaryTree (tree (map Just [1, 2, 3, 4, 5])))
       , tc "diameterOfBinaryTree (tree [1,2])" 1 (diameterOfBinaryTree (tree (map Just [1, 2])))
       , tc "diameterOfBinaryTree (tree [1])" 0 (diameterOfBinaryTree (tree [Just 1]))
       , tc "diameterOfBinaryTree (tree [])" 0 (diameterOfBinaryTree (tree []))
       , tc "diameterOfBinaryTree (the path avoids the root)" 4 (diameterOfBinaryTree lopsided)
       ])
