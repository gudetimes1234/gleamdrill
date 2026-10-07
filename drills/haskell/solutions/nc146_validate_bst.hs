module Solution where

import Drill

-- Every node must lie strictly inside the bounds its ancestors set:
-- going left tightens the upper bound, going right the lower.
isValidBST :: Tree -> Bool
isValidBST root = valid root minBound maxBound
  where
    valid Leaf _ _ = True
    valid (Node left v right) low high =
      v > low && v < high && valid left low v && valid right v high
