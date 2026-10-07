module Solution where

import Drill

-- The first pre-order value is the root; its position in the in-order
-- list splits both lists into the left and right subtrees.
buildTree :: [Int] -> [Int] -> Tree
buildTree [] _ = Leaf
buildTree (root : preorder) inorder =
  Node (buildTree (take split preorder) front) root (buildTree (drop split preorder) (drop 1 back))
  where
    (front, back) = break (== root) inorder
    split = length front
