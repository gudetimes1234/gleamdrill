module Solution where

import Drill

-- One pass: a subtree reports its height, or Nothing the moment any
-- subtree inside it is unbalanced, and the failure propagates straight
-- up through the Maybe.
isBalanced :: Tree -> Bool
isBalanced root = check root /= Nothing
  where
    check Leaf = Just 0
    check (Node left _ right) = do
      lh <- check left
      rh <- check right
      if abs (lh - rh) > 1 then Nothing else Just (1 + max lh rh)
