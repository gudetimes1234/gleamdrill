module Solution where

import Drill

-- Level by level; the last node of each level is the one seen.
rightSideView :: Tree -> [Int]
rightSideView Leaf = []
rightSideView root = go [root]
  where
    go [] = []
    go queue = last [v | Node _ v _ <- queue] : go (concatMap children queue)
    children (Node left _ right) = [t | t <- [left, right], t /= Leaf]
    children Leaf = []
