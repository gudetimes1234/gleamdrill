module Solution where

import Drill

-- The in-order walk of a BST is its values in ascending order; the
-- walk is lazy, so indexing stops it at the kth value rather than
-- collecting them all.
kthSmallest :: Tree -> Int -> Int
kthSmallest root k = inorder root !! (k - 1)

inorder :: Tree -> [Int]
inorder Leaf = []
inorder (Node left v right) = inorder left ++ [v] ++ inorder right
