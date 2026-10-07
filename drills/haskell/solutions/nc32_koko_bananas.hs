module Solution where

minEatingSpeed :: [Int] -> Int -> Int
minEatingSpeed piles h = go 1 (maximum piles)
  where
    hoursAt speed = sum [(pile + speed - 1) `div` speed | pile <- piles]
    -- Feasibility is monotone in the speed, so binary search the smallest
    -- speed that finishes in time.
    go low high
      | low >= high = low
      | hoursAt mid <= h = go low mid
      | otherwise = go (mid + 1) high
      where
        mid = low + (high - low) `div` 2
