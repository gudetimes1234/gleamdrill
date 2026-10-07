module Solution where

import Drill

-- A node's depth is one more than its deeper child's.
maxDepth :: Tree -> Int
maxDepth Leaf = 0
maxDepth (Node left _ right) = 1 + max (maxDepth left) (maxDepth right)
