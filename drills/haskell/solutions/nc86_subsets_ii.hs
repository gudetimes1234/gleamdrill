module Solution where

import Data.List (sort)

-- Sorted, so equal values are adjacent: offering each distinct value
-- once per depth avoids building the same subset twice.
subsetsWithDup :: [Int] -> [[Int]]
subsetsWithDup nums = build (sort nums)
  where
    build pool = [] : concat [ map (n :) (build later) | (n : later) <- distinctStarts pool ]
    distinctStarts [] = []
    distinctStarts list@(n : _) = list : distinctStarts (dropWhile (== n) (drop 1 list))
