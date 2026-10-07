module Solution where

maxSubArray :: [Int] -> Int
maxSubArray [] = 0
maxSubArray (first : rest) = snd (foldl step (first, first) rest)
  where
    -- Extend the run, unless it has gone negative: then start over here.
    step (current, best) n = let extended = max n (current + n) in (extended, max best extended)
