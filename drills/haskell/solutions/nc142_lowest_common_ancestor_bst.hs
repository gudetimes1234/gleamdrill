module Solution where

import Drill

-- In a BST the split point is the first node between the two values:
-- both smaller means go left, both larger means go right, else here.
lowestCommonAncestor :: Tree -> Int -> Int -> Int
lowestCommonAncestor Leaf p _ = p
lowestCommonAncestor (Node left v right) p q
  | p < v && q < v = lowestCommonAncestor left p q
  | p > v && q > v = lowestCommonAncestor right p q
  | otherwise = v
