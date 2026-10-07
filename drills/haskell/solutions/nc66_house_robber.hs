module Solution where

-- Best haul up to each house: rob it (plus the best two back) or skip
-- it (the best one back).
rob :: [Int] -> Int
rob nums = snd (foldl step (0, 0) nums)
  where
    step (twoBack, oneBack) n = (oneBack, max oneBack (twoBack + n))
