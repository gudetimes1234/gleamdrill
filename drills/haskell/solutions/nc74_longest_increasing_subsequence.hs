module Solution where

-- Length of the longest increasing subsequence ending at each element:
-- one more than the best among smaller earlier elements.
lengthOfLIS :: [Int] -> Int
lengthOfLIS [] = 0
lengthOfLIS nums = maximum (foldl step [] nums)
  where
    step earlier n = earlier ++ [1 + maximum (0 : [ l | (m, l) <- zip nums earlier, m < n ])]
