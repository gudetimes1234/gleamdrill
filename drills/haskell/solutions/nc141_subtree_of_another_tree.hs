module Solution where

import Drill

-- At every node of the big tree, ask whether the small tree starts here.
isSubtree :: Tree -> Tree -> Bool
isSubtree _ Leaf = True
isSubtree Leaf _ = False
isSubtree root@(Node left _ right) subRoot = isSame root subRoot || isSubtree left subRoot || isSubtree right subRoot

isSame :: Tree -> Tree -> Bool
isSame Leaf Leaf = True
isSame (Node pl pv pr) (Node ql qv qr) = pv == qv && isSame pl ql && isSame pr qr
isSame _ _ = False
