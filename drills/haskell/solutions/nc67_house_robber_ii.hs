module Solution where

-- The circle means the first and last house cannot both be robbed, so
-- the answer is the better of the two straight-line problems that
-- leave one of them out.
rob :: [Int] -> Int
rob [] = 0
rob [single] = single
rob nums = max (robLine (drop 1 nums)) (robLine (init nums))

robLine :: [Int] -> Int
robLine nums = snd (foldl step (0, 0) nums)
  where
    step (twoBack, oneBack) n = (oneBack, max oneBack (twoBack + n))
