module Solution where

import Drill

-- Carry the largest value on the path so far; a node is good when it
-- is at least that, and it becomes the new maximum for its subtree.
goodNodes :: Tree -> Int
goodNodes Leaf = 0
goodNodes root@(Node _ v _) = count root v
  where
    count Leaf _ = 0
    count (Node left value right) largest =
      let good = if value >= largest then 1 else 0
          top = max largest value
      in good + count left top + count right top
