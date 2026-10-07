module Solution where

import Drill

-- Swap the children, then invert each of them. The swap and the
-- recursion are the same line, which is why this is the shortest tree
-- problem there is -- and why the order does not matter.
invertTree :: Tree -> Tree
invertTree Leaf = Leaf
invertTree (Node left v right) = Node (invertTree right) v (invertTree left)
