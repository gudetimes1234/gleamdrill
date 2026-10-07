module Solution where

import Drill

-- Equal roots and equal subtrees, with a mixed pair of Leaf and Node
-- failing the match.
isSameTree :: Tree -> Tree -> Bool
isSameTree Leaf Leaf = True
isSameTree (Node pl pv pr) (Node ql qv qr) = pv == qv && isSameTree pl ql && isSameTree pr qr
isSameTree _ _ = False
