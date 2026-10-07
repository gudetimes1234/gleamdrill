module Solution where

import Drill

-- Each node reports the best downward path starting at it (never
-- negative: a bad branch is simply not taken) alongside the best path
-- anywhere in its subtree, which joins both branches at the node.
maxPathSum :: Tree -> Int
maxPathSum root = snd (walk root)
  where
    walk Leaf = (0, minBound)
    walk (Node left v right) =
      let (ldown, lbest) = walk left
          (rdown, rbest) = walk right
          down = v + max ldown rdown
          here = v + ldown + rdown
      in (max 0 down, maximum [lbest, rbest, here])
