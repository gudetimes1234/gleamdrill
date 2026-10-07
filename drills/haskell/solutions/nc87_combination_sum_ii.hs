module Solution where

import Data.List (sort)

-- Sorted; each candidate is used once, and no value repeats at the
-- same depth. Candidates above the remainder cannot help.
combinationSum2 :: [Int] -> Int -> [[Int]]
combinationSum2 candidates target = build (sort candidates) target
  where
    build _ 0 = [[]]
    build pool remaining = concat [ map (c :) (build later (remaining - c)) | (c : later) <- distinctStarts pool, c <= remaining ]
    distinctStarts [] = []
    distinctStarts list@(c : _) = list : distinctStarts (dropWhile (== c) (drop 1 list))
