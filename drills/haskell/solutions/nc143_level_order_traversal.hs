module Solution where

import Drill

-- The queue holds exactly one level at a time; drain it into a row
-- while collecting the next level.
levelOrder :: Tree -> [[Int]]
levelOrder Leaf = []
levelOrder root = go [root]
  where
    go [] = []
    go queue = [v | Node _ v _ <- queue] : go (concatMap children queue)
    children (Node left _ right) = [t | t <- [left, right], t /= Leaf]
    children Leaf = []
