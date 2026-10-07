module Solution where

-- Candidates may repeat, so taking one recurses on the same pool; the
-- pool only ever shrinks forward, keeping each combination unique.
combinationSum :: [Int] -> Int -> [[Int]]
combinationSum candidates target = build candidates target
  where
    build _ 0 = [[]]
    build [] _ = []
    build pool@(c : later) remaining
      | c <= remaining = map (c :) (build pool (remaining - c)) ++ build later remaining
      | otherwise = build later remaining
