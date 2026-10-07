module Solution where

import Data.List (tails)

-- Every partial choice is itself a subset; record it, then try adding
-- each later element.
subsets :: [Int] -> [[Int]]
subsets nums = build nums
  where
    build pool = [] : concat [ map (n :) (build later) | (n : later) <- tails pool ]
