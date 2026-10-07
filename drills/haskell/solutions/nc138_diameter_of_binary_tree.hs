module Solution where

import Drill

-- Each node's height is computed once; the longest path through a
-- node is its two children's heights added, carried up alongside the
-- height instead of mutated into a shared best.
diameterOfBinaryTree :: Tree -> Int
diameterOfBinaryTree root = snd (measure root)
  where
    measure Leaf = (0, 0)
    measure (Node left _ right) =
      let (lh, lbest) = measure left
          (rh, rbest) = measure right
      in (1 + max lh rh, maximum [lbest, rbest, lh + rh])
